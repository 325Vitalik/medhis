const jwt = require("jsonwebtoken");

const auth = (allowedRoles) =>
	function(ctx, next) {
		try {
			const parsedToken = jwt.verify(ctx.request.token, process.env.JWT_SECRET);
			if (allowedRoles.includes(parsedToken.role)) {
				return next();
			}
			ctx.status = 401;
		} catch (error) {
			ctx.status = 401;
		}
	};

module.exports = auth;
