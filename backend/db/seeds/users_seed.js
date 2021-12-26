require("dotenv").config();
const couchbase = require("couchbase");
const encryptionService = require("../../services/encriptionService");

const usersList = [
	{
		id: "61bd1583-ab2b-4a33-aae2-970430a30ee7",
		roleName: "admin",
		firstName: "Vitalii",
		secondName: "Yarmus",
		phone: "518-877-8176",
		email: "sample@email.com",
		passwordHash: "password",
		address: {
			region: "Lorem",
			city: "Lorem",
			street: "Lorem",
			buildingNumber: "Lorem",
			flatNumber: "Lorem",
			zipCode: "Lorem",
		},
	},
];

const seed = async () => {
	const cluster = await couchbase.connect(`couchbase://${process.env.DB_URL}`, {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
	});

	const bucket = cluster.bucket("medhis"); // bucket should be created
	const scope = bucket.scope("med");
	const users = scope.collection("users");

	await usersList.reduce(async (promise, user) => {
		await promise;
		const { id, ...data } = user;
		const passwordHash = await encryptionService.hashPassword(data.passwordHash);
		await users.insert(id, { ...data, passwordHash });
	}, Promise.resolve({}));
};

seed();
