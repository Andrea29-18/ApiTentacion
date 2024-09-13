# 🍰 API REST para la Pastelería D.Tentacion

Este proyecto es una API REST desarrollada en Node.js para la pastelería **Dtentacion**. La API permite gestionar clientes, administradores, productos disponibles junto con las sucursales, e incluye un sistema de puntos de recompensa para los clientes. 🎉

## ✨ Autores

- Andrea Alejandra Pucheta Vargas ([Andrea29-18](https://github.com/Andrea29-18))
- César González López ([DracoGilga](https://github.com/DracoGilga))
- Gerly Daniel Arteaga Bernal ([GerlyUwU](https://github.com/GerlyUwU))

## 👩‍💻👨‍💻 Contribuidores

<a href="https://github.com/Andrea29-18/ApiTentacion/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Andrea29-18/ApiTentacion" />
</a>

## 🛠️ Requisitos

- **Node.js** versión 22 o superior.
- **MongoDB** (se puede utilizar `mongodb-memory-server` para pruebas).

## 🚀 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Andrea29-18/ApiTentacion.git
   ```

2. Entra en el directorio del proyecto:

   ```bash
   cd ApiTentacion
   ```

3. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

## ⚠️ Variables de Entorno

**Es importante configurar las variables de entorno para que la API funcione correctamente.**

1. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

   ```bash
   MONGO_URI=mongodb://localhost:27017/nombreBaseDeDatos
   ```

   - `MONGO_URI` es la cadena de conexión para tu base de datos MongoDB. Asegúrate de configurarla correctamente para evitar errores de conexión cuando inicies el servidor.

## 🖥️ Uso

1. Inicia el servidor en modo producción:

   ```bash
   npm start
   ```

2. Si prefieres ejecutar el servidor en modo desarrollo con reinicio automático cuando hagas cambios en el código:

   ```bash
   npm run dev
   ```

3. La API estará disponible en `http://localhost:3000`.

## 🧪 Pruebas

El proyecto utiliza **Jest** para las pruebas, y las pruebas de base de datos están configuradas para utilizar **mongodb-memory-server**, lo que permite ejecutar las pruebas en memoria sin necesidad de una base de datos local activa.

Para ejecutar las pruebas:

```bash
npm test
```

## 🤝 Contribuciones

Las sugerencias y contribuciones son bienvenidas. Si deseas contribuir, sigue estos pasos:

1. Haz un **fork** del repositorio.
2. Crea una nueva rama para tu funcionalidad o corrección de error: `git checkout -b mi-nueva-funcionalidad`.
3. Realiza los cambios y haz un **commit**: `git commit -m 'Agrega nueva funcionalidad'`.
4. Sube los cambios a tu fork: `git push origin mi-nueva-funcionalidad`.
5. Abre un **pull request** en GitHub.

## 📜 Licencia

Este proyecto está licenciado bajo la MIT License - consulta el archivo LICENSE para más detalles.