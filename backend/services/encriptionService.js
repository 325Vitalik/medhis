const crypto = require("crypto");

const hashPassword = (password) => {
	return new Promise((resolve, reject) => {
		const salt = crypto.randomBytes(8).toString("hex");

		crypto.scrypt(password, salt, 64, (err, derivedKey) => {
			if (err) reject(err);
			resolve(salt + ":" + derivedKey.toString("hex"));
		});
	});
};

const verifyPassword = (password, hash) => {
	return new Promise((resolve, reject) => {
		const [salt, key] = hash.split(":");

		crypto.scrypt(password, salt, 64, (err, derivedKey) => {
			if (err) reject(err);
			resolve(key == derivedKey.toString("hex"));
		});
	});
};

const encryptionService = {
	hashPassword,
	verifyPassword,
};

module.exports = encryptionService;
