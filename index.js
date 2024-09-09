const express = require('express');
const app = express();
const puerto = 3003;

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
} 
);