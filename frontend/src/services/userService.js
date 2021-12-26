import { getApi, postApi } from "./helpers/httpHelper";

const getPatients = async (take, skip) => {
	const response = await getApi("/patients", { take, skip });

	if (response.status !== 200) {
		return [];
	}

	return await response.json();
};

const getTotalPatients = async () => {
	const response = await getApi("/patients/count");

	if (response.status !== 200) {
		return 0;
	}

	return (await response.json()).total;
};

const addPatient = async (patientData, image) => {
	const { region, city, street, buildingNumber, flatNumber, zipCode, ...restPatient } = patientData;
	const patient = { ...restPatient, address: { region, city, street, buildingNumber, flatNumber, zipCode } };

	const response = await postApi("/patient", patient, image);

	return response.status === 201;
};

const getUserById = async (id) => {
	const response = await getApi(`/user/${id}`);

	if (response.status !== 200) {
		return null;
	}

	return await response.json();
};

export const userService = {
	getPatients,
	getTotalPatients,
	addPatient,
	getUserById
};
