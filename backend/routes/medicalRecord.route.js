const Router = require("koa-router");
const authMiddleware = require("../middlewares/auth.middleware");
const medicalRecordsService = require("../services/medicalRecordsService");

const medicalRecordRouter = new Router();

medicalRecordRouter.use(authMiddleware(["admin", "doctor"])).get("/medicalrecord/:medicalRecordId", async (ctx) => {
	ctx.body = await medicalRecordsService.getMedicalRecordById(ctx.params.medicalRecordId);
});


medicalRecordRouter.use(authMiddleware(["admin", "doctor"])).get("/medicalrecord", async (ctx) => {
	const take = Number(ctx.query.take);
	const skip = Number(ctx.query.skip);
	const patientId = ctx.query.patientId;

	ctx.body = await medicalRecordsService.getMedicalRecordsOfPatient(patientId, take, skip);
});

medicalRecordRouter.use(authMiddleware(["admin", "doctor"])).get("/medicalrecord/count", async (ctx) => {
	const patientId = ctx.query.patientId;

	ctx.body = await medicalRecordsService.getMedicalRecordsOfPatientCount(patientId);
});

module.exports = medicalRecordRouter;
