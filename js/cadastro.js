import Dom from "./dom.js";

const dom = Dom();

export default function Cadastro() {
  const instituicao = dom.el("#instituicao");
  const nomeImp = dom.el("#nome-impresso");
  const vencimento = dom.el("#venc-cartao");

  const arrCartao = JSON.parse(localStorage.getItem("cartao"));
  const arrStorage = arrCartao ? arrCartao : [];

  async function dadosJSON() {
    const response = await fetch("js/dados.json");
    const dados = await response.json();
    return dados;
  }

  async function criarSelectBanco() {
    const dados = await dadosJSON();
    dados.forEach(({ nome_inst }) => {
      const option = dom.create("option");
      option.innerText = nome_inst;
      option.value = nome_inst;
      instituicao.appendChild(option);
    });
  }

  function criarCartao() {
    const cartao = dom.create("div");
    cartao.classList.add("box-cartao");
    dom.el(".content-cartao").appendChild(cartao);
  }

  async function mostrarCartao() {
    const dados = await dadosJSON();
    const btnAdicionar = dom.el(".adicionar-cartao");

    if (btnAdicionar) {
      btnAdicionar.addEventListener("click", (e) => {
        e.preventDefault();
        criarCartao();
        arrStorage.push({
          instituicao: instituicao.value,
          nome_imp: nomeImp.value,
          venc_cartao: vencimento.value,
        });
        dom.setStorage("cartao", arrStorage);
      });
    }
  }

  function init() {
    criarSelectBanco();
    mostrarCartao();
  }

  return { init };
}
