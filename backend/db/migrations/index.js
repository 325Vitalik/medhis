(async function () {
	const version = process.env.VERSION;

	const { migrate } = require(`./${version}.js`);

	await migrate();

	process.exit(0);
})();
