import Dom from "./dom.js";

const dom = Dom();

export default function Cadastro() {
  async function dadosJSON() {
    const response = await fetch("js/dados.json");
    const dados = await response.json();
    return dados;
  }

  async function criarSelectCartao() {
    const dados = await dadosJSON();
    console.log(dados);
  }

  function init() {
    criarSelectCartao();
  }

  return { init };
}
