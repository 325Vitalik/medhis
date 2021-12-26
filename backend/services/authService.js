const jwt = require('jsonwebtoken');
const { UserDb } = require("../db");
const { NotFoundError } = require("../errors/NotFoundError");
const { UnauthorizedError } = require("../errors/UnauthorizedError");
const encryptionService = require("./encriptionService");

const login = async (email, password) => {
	const userDb = await new UserDb().initialize();

	const user = await userDb.get().byEmail(email);

	if (!user) {
		throw new NotFoundError(`User with email ${email} not found`);
	}

	if (!await encryptionService.verifyPassword(password, user.passwordHash)) {
		throw new UnauthorizedError(`Email or password invalid`);
	}

	return {
		token: createJwtToken(user),
	};
};

const createJwtToken = (user) => {
	return jwt.sign({ role: user.roleName, email: user.email, userId: user.id }, process.env.JWT_SECRET);
};

const authService = {
	login,
};

module.exports = authService;
