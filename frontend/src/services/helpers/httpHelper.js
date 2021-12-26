import config from "../../config";

export const postApi = async (route, data = {}) => {
	return await fetch(`${config.API_URL}${route}`, {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};
