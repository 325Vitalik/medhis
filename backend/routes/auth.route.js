const Router = require("koa-router");
const authService = require("../services/authService");

const authRouter = new Router();

authRouter.post("/auth", async (ctx) => {
	ctx.body = await authService.login(ctx.request.body.email, ctx.request.body.password);
});

module.exports = authRouter;
