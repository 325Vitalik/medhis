const Router = require("koa-router");
const authMiddleware = require("../middlewares/auth.middleware");
const medicalRecordsService = require("../services/medicalRecordsService");
const jwt = require("jsonwebtoken");

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

medicalRecordRouter.use(authMiddleware(["admin", "doctor"])).post("/medicalrecord", async (ctx) => {
	const parsedToken = jwt.decode(ctx.request.token);
	await medicalRecordsService.createMedicalRecord(ctx.request.body, parsedToken.userId);
	ctx.status = 201;
});

module.exports = medicalRecordRouter;
