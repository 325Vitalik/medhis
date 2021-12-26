require("dotenv").config();
const couchbase = require("couchbase");

const medicalRecordsList = [
	{
		id: "e901eec8-b273-4b91-a5af-b11fa0573c63",
		date: "2011-06-14T04:12:36.123Z",
		diagnoses: ["Варикоз", "Гастрит"],
		analyzes: [
			{
				name: "Lorem",
				results: "Lorem",
				additionalInfo: "Lorem",
			},
		],
		medicines: ["Діазепам", "Дексаметазон"],
		doctorId: "8ba0b31a-44c1-45de-8d79-6725468aa4dd",
		patientId: "6f82e7dd-7dcf-4888-9ded-729984229974",
		title: "ВИявлено дві проблеми - варикоз і гастрит",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa tempor nec feugiat nisl pretium fusce id velit. Ut etiam sit amet nisl purus. Arcu non odio euismod lacinia at quis risus sed. Ornare massa eget egestas purus. Sem integer vitae justo eget magna. Aliquet lectus proin nibh nisl condimentum id venenatis. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Elit scelerisque mauris pellentesque pulvinar. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Integer feugiat scelerisque varius morbi enim nunc. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Turpis nunc eget lorem dolor sed. Faucibus purus in massa tempor nec feugiat nisl pretium. Interdum varius sit amet mattis vulputate enim nulla. Tempus egestas sed sed risus pretium quam vulputate dignissim suspendisse. Et ultrices neque ornare aenean euismod elementum nisi quis. Duis ut diam quam nulla. Sit amet porttitor eget dolor morbi. Elit ut aliquam purus sit amet luctus venenatis lectus magna. Magna sit amet purus gravida quis blandit. Nisl tincidunt eget nullam non. Urna duis convallis convallis tellus. Egestas diam in arcu cursus euismod quis viverra nibh. Nunc sed blandit libero volutpat sed.",
	},
	{
		id: "3ccc89f6-5980-477a-a71b-873e06970c4f",
		date: "2016-09-07T10:01:022Z",
		diagnoses: ["Сепсис"],
		analyzes: [
			{
				name: "Lorem",
				results: "Lorem",
				additionalInfo: "Lorem",
			},
		],
		medicines: ["Діазепам", "Дексаметазон"],
		doctorId: "8ba0b31a-44c1-45de-8d79-6725468aa4dd",
		patientId: "6f82e7dd-7dcf-4888-9ded-729984229974",
		title: "Після обстеження виявлено сепсис",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare lectus sit amet est placerat. Mi sit amet mauris commodo quis imperdiet massa. Tempor orci eu lobortis elementum nibh tellus. Eget velit aliquet sagittis id consectetur purus. In hac habitasse platea dictumst vestibulum rhoncus. Adipiscing tristique risus nec feugiat in fermentum posuere urna nec. Venenatis a condimentum vitae sapien pellentesque. Arcu odio ut sem nulla pharetra diam sit. Donec et odio pellentesque diam. Volutpat lacus laoreet non curabitur gravida. Elit sed vulputate mi sit. Pretium fusce id velit ut tortor pretium viverra. Leo integer malesuada nunc vel risus commodo. Morbi tincidunt augue interdum velit euismod in pellentesque massa placerat. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Tempor orci dapibus ultrices in iaculis nunc sed. Nunc pulvinar sapien et ligula. Orci ac auctor augue mauris augue neque gravida. In dictum non consectetur a. Pulvinar mattis nunc sed blandit libero volutpat sed. Nulla facilisi cras fermentum odio. Varius duis at consectetur lorem donec massa sapien. Et tortor at risus viverra adipiscing at. Ligula ullamcorper malesuada proin libero nunc.",
	},
	{
		id: "40708d89-4874-424e-a3cf-4947302fd0f4",
		date: "2020-11-10T05:49:131Z",
		diagnoses: ["Аденомиоз", "Гастрит"],
		analyzes: [
			{
				name: "Lorem",
				results: "Lorem",
				additionalInfo: "Lorem",
			},
		],
		medicines: ["Діазепам", "Дексаметазон"],
		doctorId: "8ba0b31a-44c1-45de-8d79-6725468aa4dd",
		patientId: "6f82e7dd-7dcf-4888-9ded-729984229974",
		title: "Плановий огляд",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis. Orci eu lobortis elementum nibh tellus molestie nunc. Suspendisse ultrices gravida dictum fusce ut. Scelerisque purus semper eget duis. Convallis posuere morbi leo urna molestie at elementum. Varius quam quisque id diam vel quam elementum. Mauris vitae ultricies leo integer malesuada nunc vel. Congue nisi vitae suscipit tellus mauris a diam. Aenean vel elit scelerisque mauris pellentesque. In cursus turpis massa tincidunt dui. Viverra tellus in hac habitasse platea. Odio morbi quis commodo odio aenean sed adipiscing. Imperdiet sed euismod nisi porta lorem mollis aliquam ut. Aliquam etiam erat velit scelerisque in dictum non. Posuere ac ut consequat semper viverra nam libero justo laoreet. Dui faucibus in ornare quam viverra. Arcu vitae elementum curabitur vitae nunc sed velit. Consequat semper viverra nam libero justo laoreet. At ultrices mi tempus imperdiet.",
	},
	{
		id: "303ac6c2-b2aa-499d-ad15-20b20abb79fe",
		date: "2016-02-09T11:11:5656Z",
		diagnoses: ["Дерматит", "Дефіцит магнію "],
		analyzes: [
			{
				name: "Lorem",
				results: "Lorem",
				additionalInfo: "Lorem",
			},
		],
		medicines: ["Діазепам", "Дексаметазон"],
		doctorId: "8ba0b31a-44c1-45de-8d79-6725468aa4dd",
		patientId: "6f82e7dd-7dcf-4888-9ded-729984229974",
		title: "Огляд у зв'язку з висипом",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In ante metus dictum at tempor commodo ullamcorper a lacus. Imperdiet dui accumsan sit amet nulla facilisi. Volutpat ac tincidunt vitae semper quis lectus nulla at volutpat. Id interdum velit laoreet id. Faucibus purus in massa tempor nec feugiat nisl. Nec ultrices dui sapien eget mi proin. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Arcu dictum varius duis at. Aliquet eget sit amet tellus cras adipiscing enim eu. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Massa tempor nec feugiat nisl pretium. Ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum. Tellus integer feugiat scelerisque varius morbi enim. Ipsum dolor sit amet consectetur. Ante metus dictum at tempor commodo ullamcorper a. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Sed turpis tincidunt id aliquet risus feugiat in ante. Nam aliquam sem et tortor consequat id porta. Purus ut faucibus pulvinar elementum integer enim. Elementum nisi quis eleifend quam adipiscing vitae proin. Nisl tincidunt eget nullam non. Molestie a iaculis at erat pellentesque adipiscing commodo.",
	},
];

const seed = async () => {
	const cluster = await couchbase.connect(`couchbase://${process.env.DB_URL}`, {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
	});

	const bucket = cluster.bucket("medhis"); // bucket should be created
	const scope = bucket.scope("med");
	const medicalRecords = scope.collection("medicalRecords");

	await medicalRecordsList.reduce(async (promise, medicalRecord) => {
		await promise;
		const { id, ...data } = medicalRecord;
		await medicalRecords.insert(id, data);
	}, Promise.resolve({}));
};

seed();
