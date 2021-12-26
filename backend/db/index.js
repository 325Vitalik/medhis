const couchbase = require("couchbase");
const requestUtils = require("./utils/requestUtils");

const initializeDbInstance = async () => {
	const cluster = await couchbase.connect(`couchbase://${process.env.DB_URL}`, {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
	});

	const bucket = cluster.bucket("medhis");
	const scope = bucket.scope("med");
	const users = scope.collection("users");
	const medicalRecords = scope.collection("medicalRecords");

	return { users, medicalRecords, bucket, cluster };
};

class UserDb {
	async initialize() {
		const { users, cluster } = await initializeDbInstance();

		this.users = users;
		this.cluster = cluster;

		return this;
	}

	get() {
		const byEmail = (email) => {
			const query = "SELECT * FROM medhis.med.users WHERE email = $email LIMIT 1";
			const options = { parameters: { email } };

			return requestUtils.getResponseRows(this.cluster.query(query, options), 'users', true);
		};

		return { byEmail };
	}
}

module.exports = {
	UserDb,
};
