require("dotenv").config();
const couchbase = require("couchbase");

const initializeDbInstance = async () => {
	const cluster = await couchbase.connect(`couchbase://${process.env.DB_URL}`, {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
	});

	const bucket = cluster.bucket("medhis"); // bucket should be created
	const collectionManager = bucket.collections();

	await collectionManager.createScope("med");
	await collectionManager.createCollection({ name: "users", scopeName: "med" });
	await collectionManager.createCollection({ name: "medicalRecords", scopeName: "med" });
	await cluster.query("CREATE PRIMARY INDEX idx_default_primary_users ON medhis.med.users USING GSI;");
	await cluster.query(
		"CREATE PRIMARY INDEX idx_default_primary_medical_records ON medhis.med.medicalRecords USING GSI;"
	);
	await cluster.query("CREATE INDEX idx_user_email ON medhis.med.users(email);");
	await cluster.query("CREATE INDEX adv_roleName ON `default`:`medhis`.`med`.`users`(`roleName`);");
};

module.exports = {
	migrate: initializeDbInstance,
};
