
import { mkdir, readFile, writeFile } from "node:fs/promises";
const PASTA = new URL("../data/", import.meta.url);
const ARQUIVO = new URL("../data/mensagens.json", import.meta.url);
export async function lerMensagens() {
  try {
    const conteudo = await readFile(ARQUIVO, "utf8");
    const dados = JSON.parse(conteudo);
    if (!Array.isArray(dados)) throw new Error("O JSON precisa conter um array.");
    return dados;
  } catch (erro) {
    if (erro.code === "ENOENT") return [];
    throw erro;
  }
}
export async function salvarMensagens(mensagens) {
  await mkdir(PASTA, { recursive: true });
  await writeFile(ARQUIVO, JSON.stringify(mensagens, null, 2), "utf8");
}
let fila = Promise.resolve();
export function criarMensagem(usuario, texto) {
  const tarefa = fila.then(async () => {
    const lista = await lerMensagens();
    const id = lista.reduce((maior, m) => Math.max(maior, Number(m.id) || 0), 0) + 1;
    const nova = { id, usuario: usuario.trim(), texto: texto.trim(), data: new Date().toISOString() };
    await salvarMensagens([...lista, nova]);
    return nova;
  });
  fila = tarefa.catch(() => {});
  return tarefa;
}
export async function buscarMensagem(id) {
  const lista = await lerMensagens();
  return lista.find(m => m.id === Number(id));
}
export async function contarMensagens() {
  return (await lerMensagens()).length;
}
