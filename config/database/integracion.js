const Producto = require('../../models/productoModelo');
const Cliente = require('../../models/clienteModelo');
const Administrador = require('../../models/administradorModelo');

const insertarDatosIniciales = async () => {
    try {
        const cantidadProductos = await Producto.countDocuments();
        if (cantidadProductos === 0) {
            await Producto.insertMany([
                { nombre: 'Pastel de chocolate', precio: 150, fechaVencimiento: new Date(2024, 9, 20) },
                { nombre: 'Pastel de vainilla', precio: 130, fechaVencimiento: new Date(2024, 9, 25) },
                { nombre: 'Pastel de fresa', precio: 140, fechaVencimiento: new Date(2024, 10, 5) },
                { nombre: 'Pastel de tres leches', precio: 160, fechaVencimiento: new Date(2024, 10, 10) },
                { nombre: 'Pastel de zanahoria', precio: 155, fechaVencimiento: new Date(2024, 10, 15) }
            ]);
            console.log('Productos insertados');
        }

        const cantidadClientes = await Cliente.countDocuments();
        if (cantidadClientes === 0) {
            await Cliente.insertMany([
                { nombre: 'Juan', apellidos: 'Pérez', telefono: '2281234567', fechaNacimiento: new Date(1990, 5, 12), correo: 'juan.perez@gmail.com', contrasena: '123456' },
                { nombre: 'María', apellidos: 'López', telefono: '2282345678', fechaNacimiento: new Date(1985, 7, 22), correo: 'maria.lopez@gmail.com', contrasena: 'abcdef' },
                { nombre: 'Carlos', apellidos: 'Ramírez', telefono: '2283456789', fechaNacimiento: new Date(1992, 9, 14), correo: 'carlos.ramirez@gmail.com', contrasena: 'qwerty' },
                { nombre: 'Ana', apellidos: 'Martínez', telefono: '2284567890', fechaNacimiento: new Date(1995, 1, 5), correo: 'ana.martinez@gmail.com', contrasena: 'zxcvbn' },
                { nombre: 'Pedro', apellidos: 'García', telefono: '2285678901', fechaNacimiento: new Date(1998, 3, 9), correo: 'pedro.garcia@gmail.com', contrasena: 'asdfgh' }
            ]);
            console.log('Clientes insertados');
        }

        const cantidadAdministradores = await Administrador.countDocuments();
        if (cantidadAdministradores === 0) {
            await Administrador.insertMany([
                { nombre: 'Luis', apellidos: 'Mendoza', telefono: '2286789012', usuario: 'admin1', contrasena: 'admin123' },
                { nombre: 'Laura', apellidos: 'Hernández', telefono: '2287890123', usuario: 'admin2', contrasena: 'admin456' }
            ]);
            console.log('Administradores insertados');
        }
    } catch (error) {
        console.error(`Error al insertar datos: ${error.message}`);
    }
};

module.exports = insertarDatosIniciales;