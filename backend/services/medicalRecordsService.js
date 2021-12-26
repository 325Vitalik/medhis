const { MedicalRecordsDb } = require("../db");
const uuid = require("uuid");

const getMedicalRecordsOfPatient = async (patientId, take = 10, skip = 0) => {
	const medicalRecordsDb = await new MedicalRecordsDb().initialize();
	return await medicalRecordsDb.get().byPatientId(patientId, take, skip);
};

const getMedicalRecordsOfPatientCount = async (patientId) => {
	const medicalRecordsDb = await new MedicalRecordsDb().initialize();
	return await medicalRecordsDb.count().byPatientId(patientId);
};

const getMedicalRecordById = async (medicalRecordId) => {
	const medicalRecordsDb = await new MedicalRecordsDb().initialize();
	return await medicalRecordsDb.get().byId(medicalRecordId);
} 

const createMedicalRecord = async (medicalRecord, doctorId) => {
	const id = uuid.v4();
	const medicalRecordsDb = await new MedicalRecordsDb().initialize();
	return await medicalRecordsDb.create(id, {...medicalRecord, doctorId}) 
}

const medicalRecordsService = {
	getMedicalRecordsOfPatient,
	getMedicalRecordsOfPatientCount,
	getMedicalRecordById,
	createMedicalRecord
};

module.exports = medicalRecordsService;
