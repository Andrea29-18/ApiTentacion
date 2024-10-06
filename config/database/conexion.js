import mongoose from 'mongoose';
import process from 'process';


const conectorBD = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión a la BD exitosa');
    } catch (error) {
        console.error(`Error al conectar a la base de datos: ${error.message}`);
        throw error;  // Lanza el error para que pueda ser manejado por el middleware
    }
};

export default conectorBD;