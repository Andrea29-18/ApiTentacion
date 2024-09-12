const mongoose = require("mongoose");
const Cliente = require("../../models/clienteModelo");
const {
	cifrarContrasena,
	compararContrasena,
} = require("../../utils/autenticacion");
const { cifrarTexto, descifrarTexto } = require("../../utils/cifrado");

describe("Modelo Cliente sin conexión a DB", () => {
	it("debe crear un cliente correctamente", async () => {
		const cliente = new Cliente({
			nombre: "Juan",
			apellidos: "Pérez",
			telefono: cifrarTexto("2281234567"),
			fechaNacimiento: new Date("1990-01-01"),
			correo: cifrarTexto("juan.perez@example.com"),
			contrasena: await cifrarContrasena("miContrasena123"),
		});

		expect(cliente.nombre).toBe("Juan");
		expect(cliente.telefono).toBe(cifrarTexto("2281234567"));
		expect(cliente.correo).toBe(cifrarTexto("juan.perez@example.com"));
	});

	it("debe comparar contraseñas correctamente", async () => {
		const cliente = new Cliente({
			nombre: "Ana",
			apellidos: "García",
			telefono: cifrarTexto("2287654321"),
			fechaNacimiento: new Date("1992-05-15"),
			correo: cifrarTexto("ana.garcia@example.com"),
			contrasena: await cifrarContrasena("miContrasena456"),
		});

		const esCoincidente = await compararContrasena(
			"miContrasena456",
			cliente.contrasena
		);
		expect(esCoincidente).toBe(true);
	});
});

describe("Modelo Cliente con conexión a DB", () => {
	beforeAll(async () => {
		await mongoose.connect("mongodb://localhost:27017/test", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});

	it("debe crear un cliente correctamente en la base de datos", async () => {
		const cliente = new Cliente({
			nombre: "Laura",
			apellidos: "Sánchez",
			telefono: cifrarTexto("2283334444"),
			fechaNacimiento: new Date("1995-08-20"),
			correo: cifrarTexto("laura.sanchez@example.com"),
			contrasena: await cifrarContrasena("miContrasena789"),
		});

		const resultado = await cliente.save();
		expect(resultado).toHaveProperty("_id");
		expect(resultado.nombre).toBe("Laura");
		expect(resultado.telefono).toBe(cifrarTexto("2283334444"));
	});
});