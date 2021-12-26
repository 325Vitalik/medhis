function* errorHandler(next) {
	try {
		yield next;
	} catch (error) {
		this.status = error.statusCode || 500;
		console.log(error.message)
	}
}
module.exports = errorHandler;
