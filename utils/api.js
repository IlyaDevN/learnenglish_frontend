//api.js

const API_BASE_URL = "https://learnenglish.pp.ua/api/";

const saveAuthToken = (token) => {
    localStorage.setItem("authToken", token);
};

const getAuthToken = () => {
    return localStorage.getItem("authToken");
};

const removeAuthToken = () => {
    localStorage.removeItem("authToken");
};

const fetchWithAuth = async (url, options = {}) => {
    const authToken = getAuthToken();
    if (authToken) {
        options.headers = {
            ...options.headers,
            Authorization: `Token ${authToken}`,
        };
    }
    return fetch(url, options);
};

export async function sendLoginRequest(data) {
    try {
        const res = await fetch(`${API_BASE_URL}login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            const responseData = await res.json();
            const token = responseData.token;
            if (token) {
                saveAuthToken(token);
                return true;
            } else {
                throw new Error("Токен не получен при логине");
            }
        } else {
            const info = await res.json();
            throw new Error(info?.error || "Не удалось войти в систему");
        }
    } catch (error) {
        console.error("Ошибка входа:", error);
        throw error;
    }
}

export async function sendRegistrationRequest(data) {
    try {
        const response = await fetch(`${API_BASE_URL}register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();

        if (response.ok) {
            const token = result.token;
            if (token) {
                saveAuthToken(token);
            } else {
                throw new Error("Токен не получен при логине");
            }

            if (response.status === 201) {
                alert(`${result.username}, регистрация прошла успешно.`);
                return true;
            }
        } else if (result.error == "Username or email already exists.") {
            alert("Это имя или e-mail уже существует.");
            return false;
        } else {
            alert("Упс, что-то пошло не так.");
            return false;
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Ошибка при попытке связи с сервером.");
    }
}

export async function sendTranslationLog(data) {
    try {
        const response = await fetchWithAuth(
            `${API_BASE_URL}log_translation/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function checkAuth() {
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}check-auth/`); // Используем fetchWithAuth
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            removeAuthToken();
            return false;
        }
    } catch (error) {
        console.error("Error checking auth:", error);
        removeAuthToken();
        return false;
    }
}

export async function logout() {
    removeAuthToken();
}
