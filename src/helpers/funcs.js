export function getLocalStorage(key) {
	return localStorage.getItem(key)
		? JSON.parse(localStorage.getItem(key))
		: null;
}

export function setLocalStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}
