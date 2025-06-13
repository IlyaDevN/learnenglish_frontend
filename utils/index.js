// import { Cookies } from "react-cookie";

//Leave here for future use
// export function getCookie(name) {
// 	let cookieValue = null;
// 	if (document.cookie && document.cookie !== '') {
// 		const cookies = document.cookie.split(';');
// 		for (let i = 0; i < cookies.length; i++) {
// 			let cookie = cookies[i].trim();
// 			// Начинается ли cookie с нужной строки?
// 			if (cookie.startsWith(name + '=')) {
// 				cookieValue = cookie.substring(name.length + 1);
// 				break;
// 			}
// 		}
// 	}
// 	return cookieValue;
// }

export function getFilteredLessons({
    lessonsList,
    currentLevel,
    currentLesson,
    hasLevels,
}) {
    let filteredLessonsList = Array.isArray(lessonsList) ? lessonsList : [];

    if (hasLevels) {
        filteredLessonsList = lessonsList.filter(
            (item) => item.level === currentLevel?.value,
        );
    } else {
        filteredLessonsList = lessonsList;
    }

    let lessonToSet = null;
    if (filteredLessonsList.length > 0) {
        const isValid =
            currentLesson &&
            filteredLessonsList.some(
                (lesson) => lesson.address === currentLesson.address,
            );
        lessonToSet = isValid ? currentLesson : filteredLessonsList[0];
    } else {
        lessonToSet = {
            id: 1000000,
            name: "скоро",
            address: "https://",
        };
    }
    return { filteredLessonsList, lessonToSet };
}
