import { lerMensagens, criarMensagem, buscarMensagem, contarMensagens } from "../models/mensagemModel.js";
export const enviarMensagem = (req, res) => {
  const { usuario, texto } = req.body ?? {};
  if (typeof usuario !== "string" || !usuario.trim() || typeof texto !== "string" || !texto.trim()) {
    return res.status(400).json({ erro: "Informe usuário e mensagem." });
  }
  if (usuario.trim().length > 40 || texto.trim().length > 500) {
    return res.status(400).json({ erro: "Nome ou mensagem muito longos." });
  }
  const tarefa = criarMensagem(usuario, texto);
  tarefa.then(nova => res.status(201).json(nova)).catch(erro => {
    console.error(erro);
    res.status(500).json({ erro: "Não foi possível salvar a mensagem." });
  });
};
export const listarMensagens = async (req, res) => {
  try { res.json(await lerMensagens()); }
  catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Não foi possível ler as mensagens." });
  }
};
export const consultarMensagem = async (req, res) => {
  try {
    const mensagem = await buscarMensagem(req.params.id);
    if (!mensagem) return res.status(404).json({ erro: "Mensagem não encontrada." });
    res.json(mensagem);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Falha ao consultar mensagem." });
  }
};
export const totalMensagens = async (req, res) => {
  try { res.json({ total: await contarMensagens() }); }
  catch (erro) { res.status(500).json({ erro: "Falha na contagem." }); }
};
