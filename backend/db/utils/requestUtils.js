const getResponseRows = async (responsePromise, objectName, isFirstRow = false) => {
	const response = await responsePromise;

	if (isFirstRow) {
		return response.rows[0][objectName];
	}

	return response.rows.map((item) => item[objectName]);
};

const requestUtils = {
	getResponseRows,
};

module.exports = requestUtils;
