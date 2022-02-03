import Dom from "./dom.js";

const dom = Dom();

export default function Cadastro() {
  const instituicao = dom.el("#instituicao");
  const nomeImpr = dom.el("#nome-impresso");
  const diaVenc = dom.el("#vencimento");
  const limite = dom.el("#limite");
  const btnConfirmar = dom.el(".btn-confirmar");

  const arrStorageCartao = dom.getStorage("cartao");
  const arrCartao = arrStorageCartao ? arrStorageCartao : [];

  const listaCartao = dom.el(".lista-cartao-cadastrado");

  async function dadosJSON() {
    const response = await fetch("js/dados.json");
    const dados = await response.json();
    return dados;
  }

  async function criarSelectCartao() {
    const dados = await dadosJSON();
    if (instituicao) {
      dados.forEach(({ nome_inst }) => {
        const option = dom.create("option");
        option.innerText = nome_inst;
        option.value = nome_inst;
        instituicao.appendChild(option);
      });
    }
  }

  function fnCartao(nomeImp, diaVenc, imgBandeira, bandeira, corCartao) {
    const cartao = dom.create("li");
    cartao.classList.add("cartao");
    cartao.style.backgroundColor = corCartao;

    const venc = diaVenc < 10 ? `0${diaVenc}` : diaVenc;

    if (listaCartao) {
      cartao.innerHTML = `
      <p class="nome-impresso">${nomeImp}</p>
        <div class="vencimento">
          <div>
            <span>Venc</span>
            <p>${venc}</p>
          </div>
          <img src="${imgBandeira}" alt="${bandeira}">
        </div>
      `;
      listaCartao.appendChild(cartao);
    }
  }

  async function criarCartao() {
    const dados = await dadosJSON();
    if (btnConfirmar) {
      btnConfirmar.addEventListener("click", (e) => {
        e.preventDefault();
        dados.forEach(({ nome_inst, bandeira, logo_bandeira, cor_cartao }) => {
          if (nome_inst === instituicao.value) {
            arrCartao.push({
              instituicao: instituicao.value,
              nomeImp: nomeImpr.value.toUpperCase(),
              diaVenc: diaVenc.value,
              limite: limite.value,
              bandeira: bandeira,
              logoBandeira: logo_bandeira,
              corCartao: cor_cartao,
            });
            dom.setStorage("cartao", arrCartao);
            fnCartao(
              nomeImpr.value,
              diaVenc.value,
              logo_bandeira,
              bandeira,
              cor_cartao
            );
            dom.reloadPage(
              `Adicionando cartão <b>${nome_inst}</b> na sua lista`,
              2000
            );
          }
        });
      });
    }
  }

  function salvarCartao() {
    arrCartao.forEach(
      ({ nomeImp, diaVenc, logoBandeira, bandeira, corCartao }) => {
        fnCartao(nomeImp, diaVenc, logoBandeira, bandeira, corCartao);
      }
    );
  }

  function init() {
    criarSelectCartao();
    criarCartao();
    salvarCartao();
  }

  return { init };
}
