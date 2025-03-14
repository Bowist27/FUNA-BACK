// Punto de entrada del servidor
// Configurar la app principal de express
// Aqui se definen middlewares globales, rutas y cualquier configuracion general del servidor
// Modulo que exporta la isntancia de express para ser reutilizada en mas archivos


const express = require("express");
const corsConfig = require("./config/corsConfig");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(corsConfig);
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/files", uploadRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor TILIN corriendo en http://0.0.0.0:${PORT}`);
});
