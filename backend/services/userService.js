const { UserDb } = require("../db");
const uuid = require("uuid");

const getPatients = async (take = 10, skip = 0) => {
	const userDb = await new UserDb().initialize();
	const patients = await userDb.get().byRole("patient", take, skip);

	return patients.map(mapUser);
};

const mapUser = (user) => {
	const { passwordHash, roleName, ...data } = user;

	return { ...data, role: roleName };
};

const getPatientsCount = async () => {
	const userDb = await new UserDb().initialize();
	return await userDb.count().byRole("patient");
};

const createPatient = async (patient) => {
	const id = uuid.v4();
	const userDb = await new UserDb().initialize();

	await userDb.create(id, patient);
};

const getUserById = async (userId) => {
	const userDb = await new UserDb().initialize();

	return await userDb.get().byId(userId);
};

const userService = {
	getPatients,
	getPatientsCount,
	createPatient,
	getUserById,
};

module.exports = userService;
