import { getApi, postApi } from "./helpers/httpHelper";

const getMedicalRecordsByPatient = async (patientId, take, skip) => {
	const response = await getApi("/medicalrecord", { patientId, take, skip });

	if (response.status !== 200) {
		return [];
	}

	return await response.json();
};

const getTotalMedicalRecordsByPatient = async (patientId) => {
	const response = await getApi("/medicalrecord/count", { patientId });

	if (response.status !== 200) {
		return 0;
	}

	return (await response.json()).total;
};

export const medicalRecordService = {
	getMedicalRecordsByPatient,
	getTotalMedicalRecordsByPatient,
};