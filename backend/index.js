require("dotenv").config();

const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const authRouter = require("./routes/auth.route");
const errorHandler = require("./middlewares/errorHandler.middleware");
const cors = require("@koa/cors");
const { bearerToken } = require("koa-bearer-token");
const userRouter = require("./routes/user.route");
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
	.listen(PORT, "0.0.0.0", () => console.log(`listening on http://localhost:${PORT}...`));
