function* errorHandler(next) {
	try {
		yield next;
	} catch (error) {
		this.status = error.statusCode || 500;
		console.log(error.message);
		console.log(error.stack)
	}
}
module.exports = errorHandler;
