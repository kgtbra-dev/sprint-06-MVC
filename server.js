import express from "express";
import { rotasEnvio, rotasConsulta } from "./routes/mensagemRoutes.js";
import sistemaRoutes from "./routes/sistemaRoutes.js";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(rotasEnvio);
app.use(express.static("views"));
app.use(sistemaRoutes);
app.use(rotasConsulta);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});
