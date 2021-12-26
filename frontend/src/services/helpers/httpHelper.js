import config from "../../config";

export const postApi = async (route, data = {}, file) => {
	const token = localStorage.getItem("userToken");

	const headers = {
		...(token && { Authorization: `Bearer ${token}` }),
	};

	return await fetch(`${config.API_URL}${route}`, {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		body: getBody(data, file),
		headers,
	});
};

const getBody = (data, file) => {
	if (!file) {
		return JSON.stringify(data);
	}

	Object.getOwnPropertyNames(file);

	const formData = new FormData();
	formData.append("file", file, file.name);
	formData.append("payload", JSON.stringify(data));

	return formData;
};

export const getApi = async (route, params = {}) => {
	const url = new URL(`${config.API_URL}${route}`);
	Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

	const token = localStorage.getItem("userToken");

	const headers = {
		"Content-Type": "application/json",
		...(token && { Authorization: `Bearer ${token}` }),
	};

	return await fetch(url, {
		method: "GET",
		mode: "cors",
		cache: "no-cache",
		headers,
	});
};
