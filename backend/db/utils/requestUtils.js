const getResponseRows = async (responsePromise, objectName, isFirstRow = false) => {
	const response = await responsePromise;

	if (isFirstRow) {
		const firstItem = response.rows[0] || {};
		return firstItem[objectName];
	}

	return response.rows.map((item) => item[objectName]);
};

const requestUtils = {
	getResponseRows,
};

module.exports = requestUtils;
