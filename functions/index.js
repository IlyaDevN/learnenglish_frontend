// import { Cookies } from "react-cookie";

export function getCookie(name) {
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].trim();
			// Начинается ли cookie с нужной строки?
			if (cookie.startsWith(name + '=')) {
				cookieValue = cookie.substring(name.length + 1);
				break;
			}
		}
	}
	return cookieValue;
}

// export function getCookie(name) {
// 	const cookies = new Cookies();
//     const cookieValue = cookies.get(name);
	
// 	return cookieValue;
// }