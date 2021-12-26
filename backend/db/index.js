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
			const query =
				"SELECT META().id, roleName, firstName, secondName, phone, email, passwordHash, imageUrl, address FROM medhis.med.users WHERE email = $email LIMIT 1";
			const options = { parameters: { email } };

			return requestUtils.getResponseRows(this.cluster.query(query, options), true);
		};

		const byRole = (role, take, skip) => {
			const takeQuery = !take ? "" : ` LIMIT $take`;
			const skipQuery = !skip ? "" : ` OFFSET $skip`;
			const query =
				"SELECT META().id, roleName, firstName, secondName, phone, email, passwordHash, imageUrl, address FROM medhis.med.users WHERE roleName = $role" +
				takeQuery +
				skipQuery;
			const options = { parameters: { role, take, skip } };

			return requestUtils.getResponseRows(this.cluster.query(query, options));
		};

		const byId = (id) => this.users.get(id).then(item => item.content);

		return { byEmail, byRole, byId };
	}

	count() {
		const byRole = async (role) => {
			const query = "SELECT COUNT(*) AS total FROM medhis.med.users WHERE roleName = $role";
			const options = { parameters: { role } };

			return (await requestUtils.getResponseRows(this.cluster.query(query, options), true)).total;
		};

		return { byRole };
	}

	create(key, value) {
		return this.users.insert(key, value);
	}
}

module.exports = {
	UserDb,
};
