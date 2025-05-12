import { getCookie } from "./index";

export async function sendLoginRequest(data) {
    const csrfToken = getCookie("csrftoken");

    try {
        const res = await fetch("https://learnenglish.pp.ua/api/login/", {
            method: "post",
            headers: {
                "Content-type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            return true;
        } else {
            const info = await res.json();
            throw new Error(info?.error || "Не удалось войти в систему");
        }
    } catch (error) {
        console.error("Ошибка входа:", error);
        throw error;
    }
}

export async function sendTranslationLog(data) {
	const csrftoken = getCookie("csrftoken");

	fetch("https://learnenglish.pp.ua/api/log_translation/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-CSRFToken": csrftoken,
		},
		body: JSON.stringify(data),
	})
	.then((response) => {
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.json();
	})
	.then((responseData) => {
		console.log("Success:", responseData);
	})
	.catch((error) => {
		console.error("Error:", error);
	});
}