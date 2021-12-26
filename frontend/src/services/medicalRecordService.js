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

const getMedicalRecordById = async (recordId) => {
	const response = await getApi(`/medicalrecord/${recordId}`);

	if (response.status !== 200) {
		return [];
	}

	return await response.json();
};

const addMedicalRecord = async (medicalRecord, patientId) => {
	const data = {
		...medicalRecord,
		patientId,
		date: new Date().toString(),
		diagnoses: medicalRecord.diagnoses.split(",").map((item) => item.trim()),
		medicines: medicalRecord.medicines.split(",").map((item) => item.trim()),
	};

	const response = await postApi("/medicalrecord", data);

	return response.status === 201;
};

export const medicalRecordService = {
	getMedicalRecordsByPatient,
	getTotalMedicalRecordsByPatient,
	getMedicalRecordById,
	addMedicalRecord,
};
