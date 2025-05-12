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

