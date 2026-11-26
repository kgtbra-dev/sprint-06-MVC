import { Router } from "express";
import { enviarMensagem, listarMensagens, consultarMensagem, totalMensagens } from "../controllers/mensagemController.js";
export const rotasEnvio = Router();
export const rotasConsulta = Router();
rotasEnvio.post("/mensagens", enviarMensagem);
rotasConsulta.get("/mensagens", listarMensagens);
rotasConsulta.get("/mensagens/:id", consultarMensagem);
rotasConsulta.get("/total-mensagens", totalMensagens);
