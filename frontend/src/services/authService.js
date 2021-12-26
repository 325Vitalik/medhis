import { postApi } from "./helpers/httpHelper";

const loginUser = async (email, password) => {
	const response = await postApi("/auth", { email, password });

	if (response.status !== 200) {
		return false;
	}

	const { token } = await response.json();
	localStorage.setItem("userToken", token);
	localStorage.setItem("userRole", parseJwt(token).role);

	return true;
};

const parseJwt = (token) => {
	const base64Url = token.split(".")[1];
	const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split("")
			.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
			.join("")
	);

	return JSON.parse(jsonPayload);
};

const logOutUser = () => {
	localStorage.removeItem("userToken");
	localStorage.removeItem("userRole");
};

const checkUserLoggedIn = () => {
	return Boolean(localStorage.getItem("userToken"));
};

export const authService = {
	loginUser,
	logOutUser,
	checkUserLoggedIn,
};
