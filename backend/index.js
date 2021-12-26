require("dotenv").config();

const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const jwt = require("./middlewares/jwt.middleware");
const authRouter = require("./routes/auth.route");
const errorHandler = require("./middlewares/errorHandler.middleware");
const cors = require("@koa/cors");

const PORT = process.env.PORT || 8000;

const app = new Koa();

app.use(
	cors({
		origin: "*",
	})
)
	.use(logger())
	.use(bodyParser())
	// .use(jwt)
	.use(errorHandler)
	.use(authRouter.routes())
	.use(authRouter.allowedMethods())
	.listen(PORT, "0.0.0.0", () => console.log(`listening on http://localhost:${PORT}...`));
