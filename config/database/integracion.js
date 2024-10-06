import Producto from '../../models/productoModelo';
import Cliente from '../../models/clienteModelo';
import Administrador from '../../models/administradorModelo';
import CategoriaProducto from '../../models/categoriaProductoModelo';
import Insumo from '../../models/insumoModelo';
import Pedido from '../../models/pedidosModelo';
import Sucursal from '../../models/sucursalModelo';
import Ubicacion from 'models/ubicacionModelo';

const insertarDatosIniciales = async () => {
    try {
        // Insertar insumos
        const cantidadInsumos = await Insumo.countDocuments();
        if (cantidadInsumos === 0) {
            await Insumo.insertMany([
                { nombre: 'Harina', cantidadNeta: 1000, precioNeto: 80 },
                { nombre: 'Azúcar', cantidadNeta: 500, precioNeto: 50 }
            ]);
            console.log('Insumos insertados');
        }

        // Insertar categorías de productos
        const cantidadCategorias = await CategoriaProducto.countDocuments();
        if (cantidadCategorias === 0) {
            await CategoriaProducto.insertMany([
                { nombreCategoria: 'Repostería', descripcionCategoria: 'Dulces y pasteles' },
                { nombreCategoria: 'Panadería', descripcionCategoria: 'Pan y otros productos de panadería' }
            ]);
            console.log('Categorías de productos insertadas');
        }

        // Insertar ubicaciones
        const cantidadUbicaciones = await Ubicacion.countDocuments();
        if (cantidadUbicaciones === 0) {
            await Ubicacion.insertMany([
                { descripcion: 'Sucursal Principal', longitud: -99.1332, latitud: 19.4326 },
                { descripcion: 'Sucursal Secundaria', longitud: -98.9815, latitud: 19.3967 }
            ]);
            console.log('Ubicaciones insertadas');
        }

        // Insertar productos
        const cantidadProductos = await Producto.countDocuments();
        if (cantidadProductos === 0) {
            // Primero, obtener los insumos y categorías para referenciarlos
            const insumos = await Insumo.find();
            const categorias = await CategoriaProducto.find();

            await Producto.insertMany([
                {
                    nombreProducto: 'Pastel de chocolate',
                    cantidadStock: 20,
                    precioFinal: 150,
                    fechaVencimiento: new Date(2024, 9, 20),
                    insumos: [insumos[0]._id, insumos[1]._id],
                    catalogoProducto: categorias[0]._id
                },
                {
                    nombreProducto: 'Pastel de vainilla',
                    cantidadStock: 15,
                    precioFinal: 130,
                    fechaVencimiento: new Date(2024, 9, 25),
                    insumos: [insumos[0]._id],
                    catalogoProducto: categorias[0]._id
                }
            ]);
            console.log('Productos insertados');
        }

        // Insertar pedidos
        const cantidadPedidos = await Pedido.countDocuments();
        if (cantidadPedidos === 0) {
            const productos = await Producto.find(); // Tomamos productos existentes
            await Pedido.insertMany([
                {
                    Productos: [productos[0]._id],
                    precioTotal: 150
                }
            ]);
            console.log('Pedidos insertados');
        }

        // Insertar sucursales
        const cantidadSucursales = await Sucursal.countDocuments();
        if (cantidadSucursales === 0) {
            const pedidos = await Pedido.find(); // Tomamos pedidos existentes
            const ubicaciones = await Ubicacion.find(); // Tomamos ubicaciones existentes
            await Sucursal.insertMany([
                {
                    pedidos: [pedidos[0]._id],
                    ubicacion: ubicaciones[0]._id
                }
            ]);
            console.log('Sucursales insertadas');
        }

        // Insertar clientes
        const cantidadClientes = await Cliente.countDocuments();
        if (cantidadClientes === 0) {
            await Cliente.insertMany([
                { nombre: 'Juan', apellidos: 'Pérez', telefono: '2281234567', fechaNacimiento: new Date(1990, 5, 12), correo: 'juan.perez@gmail.com', contrasena: '123456' },
                { nombre: 'María', apellidos: 'López', telefono: '2282345678', fechaNacimiento: new Date(1985, 7, 22), correo: 'maria.lopez@gmail.com', contrasena: 'abcdef' }
            ]);
            console.log('Clientes insertados');
        }

        // Insertar administradores
        const cantidadAdministradores = await Administrador.countDocuments();
        if (cantidadAdministradores === 0) {
            await Administrador.insertMany([
                { nombre: 'Luis', apellidos: 'Mendoza', telefono: '2286789012', usuario: 'admin1', contrasena: 'admin123' },
                { nombre: 'Laura', apellidos: 'Hernández', telefono: '2287890123', usuario: 'admin2', contrasena: 'admin456' }
            ]);
            console.log('Administradores insertados');
        }
        
        console.log('Datos iniciales insertados correctamente');
    } catch (error) {
        console.error(`Error al insertar datos: ${error.message}`);
    }
};

export default insertarDatosIniciales;
