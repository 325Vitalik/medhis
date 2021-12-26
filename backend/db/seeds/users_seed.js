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
		imageUrl:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
		address: {
			region: "Lorem",
			city: "Lorem",
			street: "Lorem",
			buildingNumber: "Lorem",
			flatNumber: "Lorem",
			zipCode: "Lorem",
		},
	},
	{
		id: "8ba0b31a-44c1-45de-8d79-6725468aa4dd",
		roleName: "doctor",
		firstName: "Вікентій",
		secondName: "Блінов",
		phone: "518-877-8176",
		email: "sample2@email.com",
		passwordHash: "password",
		imageUrl:
			"https://www.iheartradio.ca/image/policy:1.12513060:1590534721/image-jpg-t-1590534666-size-Large.jpg?f=default&$p$f=77915bd",
		address: {
			region: "Lorem",
			city: "Lorem",
			street: "Lorem",
			buildingNumber: "Lorem",
			flatNumber: "Lorem",
			zipCode: "Lorem",
		},
	},
	{
		id: "6f82e7dd-7dcf-4888-9ded-729984229974",
		roleName: "patient",
		firstName: "Вікторія",
		secondName: "Супрун",
		phone: "518-877-8176",
		email: "sample3@email.com",
		passwordHash: "password",
		imageUrl: "https://cdn.youpic.com/huge/1416143_3ogqbsrvmm1khn4ehg9m5ucmtm_103510.jpg",
		address: {
			region: "Lorem",
			city: "Lorem",
			street: "Lorem",
			buildingNumber: "Lorem",
			flatNumber: "Lorem",
			zipCode: "Lorem",
		},
	},
	{
		id: "8cbf2981-a3d3-44db-844b-18306846070b",
		roleName: "patient",
		firstName: "Анна",
		secondName: "Скічко",
		phone: "518-877-8176",
		email: "sample4@email.com",
		passwordHash: "password",
		imageUrl: "https://live.staticflickr.com/5252/5403292396_0804de9bcf_b.jpg",
		address: {
			region: "Lorem",
			city: "Lorem",
			street: "Lorem",
			buildingNumber: "Lorem",
			flatNumber: "Lorem",
			zipCode: "Lorem",
		},
	},
	{
		id: "8cbf2981-a3d3-44db-844b-18306846070с",
		roleName: "patient",
		firstName: "Микола",
		secondName: "Гвоздик",
		phone: "518-877-8176",
		email: "sample5@email.com",
		passwordHash: "password",
		imageUrl: "https://s7g3.scene7.com/is/image/soloinvest/n00551A?$big_image_web$",
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
