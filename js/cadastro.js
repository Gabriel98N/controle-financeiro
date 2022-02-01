import Dom from "./dom.js";

const dom = Dom();

export default function Cadastro() {
  const selectCartao = dom.el("#instituicao");

  async function dadosJSON() {
    const response = await fetch("js/dados.json");
    const dados = await response.json();
    return dados;
  }

  async function criarSelectCartao() {
    const dados = await dadosJSON();
    dados.forEach(({ nome_inst }) => {
      const option = dom.create("option");
      option.innerText = nome_inst;
      option.value = nome_inst;
      selectCartao.appendChild(option);
    });
  }

  function init() {
    criarSelectCartao();
  }

  return { init };
}
