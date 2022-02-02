import Dom from "./dom.js";

const dom = Dom();

export default function Cartao() {
  const cartao = dom.el(".header-cartao .cartao");
  const selectBanco = dom.el("#banco");
  const arrCartao = dom.getStorage("cartao");

  function mostrarBancoSelecionado(
    nomeImp,
    diaVenc,
    logoBandeira,
    bandeira,
    corCartao,
    limite,
    id
  ) {
    const nome_imp = cartao.querySelector(".nome-impresso");
    const vencimento = cartao.querySelector(".vencimento p");
    const imgLogo = cartao.querySelector(".vencimento img");
    const limiteDisponivel = dom.el(".limite-disponivel");

    cartao.style.backgroundColor = corCartao;
    cartao.setAttribute("data-id", id);

    nome_imp.innerText = nomeImp;
    vencimento.innerText = diaVenc;

    imgLogo.src = logoBandeira;
    imgLogo.alt = bandeira;

    limiteDisponivel.innerText = dom.conversorMoeda(limite, "PT-BR", "BRL");
  }

  function selecionarBanco() {
    if (arrCartao && selectBanco) {
      selectBanco.disabled = false;
      arrCartao.forEach(({ instituicao, nomeImp }) => {
        const option = dom.create("option");
        option.innerText = `${instituicao} - ${nomeImp}`;
        option.value = instituicao;
        selectBanco.appendChild(option);
      });

      selectBanco.addEventListener("change", (e) => {
        arrCartao.forEach(
          (
            {
              instituicao,
              nomeImp,
              corCartao,
              bandeira,
              diaVenc,
              logoBandeira,
              limite,
            },
            index
          ) => {
            if (instituicao === e.target.value) {
              mostrarBancoSelecionado(
                nomeImp,
                diaVenc,
                logoBandeira,
                bandeira,
                corCartao,
                limite,
                index
              );
              dom.setStorage("idCartao", index);
            }
          }
        );
      });
    }
  }

  function cartaoAtivo() {
    const idCartao = dom.getStorage("idCartao");
    const optionBanco = dom.els("#banco option");

    arrCartao.forEach(
      (
        {
          instituicao,
          nomeImp,
          corCartao,
          bandeira,
          diaVenc,
          logoBandeira,
          limite,
        },
        index
      ) => {
        if (idCartao == index) {
          mostrarBancoSelecionado(
            nomeImp,
            diaVenc,
            logoBandeira,
            bandeira,
            corCartao,
            limite,
            index
          );
          optionBanco.forEach((option) => {
            if (instituicao === option.value)
              option.setAttribute("selected", "");
          });
        }
      }
    );
  }

  function init() {
    selecionarBanco();
    cartaoAtivo();
  }

  return { init };
}
