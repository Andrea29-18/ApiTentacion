const mongoose = require('mongoose');

const conectorBD = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('Conexión a la BD exitosa');
	} catch (error) {
		console.log(`Error: ${error.message}`);
		process.exit(1);
	}
};

module.exports = conectorBD;