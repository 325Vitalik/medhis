const Router = require("koa-router");
const authMiddleware = require("../middlewares/auth.middleware");
const userService = require("../services/userService");
const multiparty = require("multiparty");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const encryptionService = require("../services/encriptionService");

const userRouter = new Router();

userRouter.use(authMiddleware(["admin", "doctor"])).get("/patients", async (ctx) => {
	const take = Number(ctx.query.take);
	const skip = Number(ctx.query.skip);

	ctx.body = await userService.getPatients(take, skip);
});

userRouter.use(authMiddleware(["admin", "doctor"])).get("/patients/count", async (ctx) => {
	ctx.body = await userService.getPatientsCount();
});

const saveFile = (file, path) => {
	return new Promise((resolve, reject) => {
		let render = fs.createReadStream(file);
		// Create a write stream
		let upStream = fs.createWriteStream(path);
		render.pipe(upStream);
		upStream.on("finish", () => {
			resolve(path);
		});
		upStream.on("error", (err) => {
			reject(err);
		});
	});
};

userRouter.use(authMiddleware(["admin", "doctor"])).post("/patient", async (ctx) => {
	const { fields, files } = await parseRequestWithFile(ctx.req);

	const { password, ...patientData } = JSON.parse(fields.payload[0]) || {};
	const file = files.file[0];

	let data = new FormData();
	data.append("image", fs.readFileSync(file.path), file.originalFilename);

	const config = {
		method: "post",
		url: "https://api.imgbb.com/1/upload?key=2c1a80defb65ebf9a0bf9f773adbeb61",
		headers: {
			...file.headers,
			...data.getHeaders(),
		},
		data: data,
	};

	const response = await axios(config);

	if (!response.data.success) {
		throw new Error("Image was not uploaded.");
	}

	const imageUrl = response.data.data.url;
	const passwordHash = await encryptionService.hashPassword(patientData.password || "");

	const patient = { ...patientData, imageUrl, passwordHash, roleName: "patient" };

	await userService.createPatient(patient);
	ctx.status = 201;
});

const parseRequestWithFile = (req) => {
	return new Promise((resolve, reject) => {
		const form = new multiparty.Form();

		form.parse(req, async (err, fields, files) => {
			if (err) {
				return reject(err);
			}

			resolve({ fields, files });
		});
	});
};

module.exports = userRouter;
