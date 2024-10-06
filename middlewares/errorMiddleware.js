const errorMiddleware = (err, req, res) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor' });
};

export default errorMiddleware;