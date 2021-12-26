class NotFoundError extends Error {
	statusCode = 404;
}

module.exports = {
	NotFoundError,
};
