const getResponseRows = async (responsePromise, isFirstRow = false) => {
	const response = await responsePromise;

	if (isFirstRow) {
		return response.rows[0]
	}

	return response.rows;
};

const requestUtils = {
	getResponseRows,
};

module.exports = requestUtils;
