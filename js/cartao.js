import Dom from "./dom.js";

const dom = Dom();

export default function Cartao() {
  const selectBanco = dom.el("#banco");
  const arrCartao = dom.getStorage("cartao");

  function mostrarBancoSelecionado(
    nomeImp,
    diaVenc,
    logoBandeira,
    bandeira,
    corCartao,
    id
  ) {
    const cartao = dom.el(".header-cartao .cartao");
    const nome_imp = cartao.querySelector(".nome-impresso");
    const vencimento = cartao.querySelector(".vencimento p");
    const imgLogo = cartao.querySelector(".vencimento img");

    cartao.style.backgroundColor = corCartao;
    cartao.setAttribute("data-id", id);

    nome_imp.innerText = nomeImp;
    vencimento.innerText = diaVenc;

    imgLogo.src = logoBandeira;
    imgLogo.alt = bandeira;
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
          ({
            instituicao,
            nomeImp,
            corCartao,
            bandeira,
            diaVenc,
            logoBandeira,
            id,
          }) => {
            if (instituicao === e.target.value) {
              mostrarBancoSelecionado(
                nomeImp,
                diaVenc,
                logoBandeira,
                bandeira,
                corCartao,
                id
              );
              dom.setStorage("idCartao", id);
            }
          }
        );
      });
    }
  }

  function cartaoAtivo() {
    const idCartao = dom.getStorage("idCartao");
    const optionBanco = selectBanco.querySelectorAll("option");

    if (idCartao == 0 || idCartao > 0) {
      arrCartao.forEach(
        ({
          instituicao,
          nomeImp,
          corCartao,
          bandeira,
          diaVenc,
          logoBandeira,
          id,
        }) => {
          if (idCartao == id) {
            mostrarBancoSelecionado(
              nomeImp,
              diaVenc,
              logoBandeira,
              bandeira,
              corCartao,
              id
            );

            optionBanco.forEach((option) => {
              if (instituicao === option.value)
                option.setAttribute("selected", "");
            });
          }
        }
      );
    }
  }

  function init() {
    selecionarBanco();
    cartaoAtivo();
  }

  return { init };
}
