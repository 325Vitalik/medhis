class UnauthorizedError extends Error {
	statusCode = 404;
}

module.exports = {
	UnauthorizedError,
};
