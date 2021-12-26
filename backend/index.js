require("dotenv").config();

const cluster = require("cluster");
const { cpus } = require("os");
const process = require("process");

const numCPUs = cpus().length;

if (cluster.isPrimary) {
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	const Koa = require("koa");
	const logger = require("koa-logger");
	const bodyParser = require("koa-bodyparser");
	const authRouter = require("./routes/auth.route");
	const errorHandler = require("./middlewares/errorHandler.middleware");
	const cors = require("@koa/cors");
	const { bearerToken } = require("koa-bearer-token");
	const userRouter = require("./routes/user.route");
	const medicalRecordRouter = require("./routes/medicalRecord.route");
	const PORT = process.env.PORT || 8000;

	const app = new Koa();

	app.use(cors({ origin: "*" }))
		.use(logger())
		.use(bodyParser())
		.use(bearerToken())
		.use(errorHandler)
		.use(authRouter.routes())
		.use(authRouter.allowedMethods())
		.use(userRouter.routes())
		.use(userRouter.allowedMethods())
		.use(medicalRecordRouter.routes())
		.use(medicalRecordRouter.allowedMethods())
		.listen(PORT, "0.0.0.0", () => console.log(`listening on http://localhost:${PORT}...`));
}
