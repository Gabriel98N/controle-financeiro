import Dom from "./dom.js";
import outsideEvent from "./outside-event.js";
import Data from "./data.js";

const dom = Dom();

export default function Cartao() {
  const cartao = dom.el(".header-cartao .cartao");
  const selectBanco = dom.el("#banco");
  const arrCartao = dom.getStorage("cartao");

  const formTransacao = dom.el(".form-transacao");
  const btnAdicionar = dom.el(".btn-adicionar");
  const btnTransacao = dom.el(".adicionar-transacao");
  const active = "active";

  const arrTransacaoStorage = dom.getStorage("transacao");
  const arrTransacao = arrTransacaoStorage ? arrTransacaoStorage : [];

  const nomeTransacao = dom.el("#nome-transacao");
  const valorTransacao = dom.el("#valor");
  const tipoTransacao = dom.el("#tipo-transacao");
  const tabelaTransacao = dom.el(".tabela-transacao");

  const arrValores = {
    despesa: [],
    saldo: [],
  };

  function mostrarBancoSelecionado(
    nomeImp,
    diaVenc,
    logoBandeira,
    bandeira,
    corCartao,
    limite,
    id
  ) {
    if (cartao) {
      const nome_imp = cartao.querySelector(".nome-impresso");
      const vencimento = cartao.querySelector(".vencimento p");
      const imgLogo = cartao.querySelector(".vencimento img");
      const limiteDisponivel = dom.el(".limite-disponivel");

      btnAdicionar.disabled = false;

      cartao.style.backgroundColor = corCartao;
      cartao.setAttribute("data-id", id);

      nome_imp.innerText = nomeImp;
      vencimento.innerText = diaVenc;

      imgLogo.src = logoBandeira;
      imgLogo.alt = bandeira;

      limiteDisponivel.innerText = dom.conversorMoeda(limite, "PT-BR", "BRL");
    }
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

    if (arrCartao) {
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
  }

  function criarTransacao(nomeTransacao, tipo_transacao, valor, data) {
    const transacao = dom.create("div");
    transacao.classList.add("transacao");

    if (tabelaTransacao) {
      valor = valor.replace(",", ".");
      const moedaBr = dom.conversorMoeda(valor, "PT-BR", "BRL");
      transacao.innerHTML = `
        <span data-identificador="${tipo_transacao}"></span>
        <p class="nome-transacao">${dom.firstLetter(nomeTransacao)}</p>
        <p class="data-transacao">${data}</p>
        <p class="valor-transacao">${tipo_transacao}${moedaBr}</p>
      `;
      tabelaTransacao.appendChild(transacao);
    }
  }

  function somarValores(valor, el, type) {
    valor = valor.replace(",", ".");
    type === "despesa"
      ? arrValores.despesa.push(valor)
      : arrValores.saldo.push(valor);

    const element = dom.el(el);
    const total = arrValores[type].reduce((ac, num) => ac + Number(num), 0);
    element.innerText = dom.conversorMoeda(total, "PT-BR", "BRL");
    return total;
  }

  function limiteCartao(idCartao, totalDespesa) {
    const { limite } = arrCartao[idCartao];
    const subLimite = Number(limite) - totalDespesa;
    const limiteDisponivel = dom.el(".limite-disponivel");
    limiteDisponivel.innerText = dom.conversorMoeda(subLimite, "PT-BR", "BRL");
  }

  function salvarTransacao() {
    arrTransacao.forEach(
      ({ nomeTransacao, tipo_transacao, valor, data, id }, index) => {
        criarTransacao(nomeTransacao, tipo_transacao, valor, data);

        if (id && cartao) {
          const transacao = dom.els(".transacao")[index];
          transacao.setAttribute("data-transacao", id);

          const idTransacao = transacao.dataset.transacao;
          const idCartao = cartao.dataset.id;

          if (idTransacao === idCartao) {
            transacao.style.display = "flex";
            const totalDespesa = somarValores(
              valor,
              "[data-dados='despesa'] p",
              "despesa"
            );
            limiteCartao(idCartao, totalDespesa);
          } else {
            transacao.style.display = "none";
          }
        } else {
          somarValores(valor, "[data-dados='saldo'] p", "saldo");
        }

        selectBanco.addEventListener("change", () => {
          dom.el("[data-loader]").classList.add(active);
          setTimeout(() => {
            location.reload();
          }, 2000);
        });
      }
    );
  }

  function handleClickAbrirForm(e) {
    e.preventDefault();
    formTransacao.classList.add(active);
    outsideEvent(
      formTransacao,
      () => {
        formTransacao.classList.remove(active);
      },
      ["click"]
    );
  }

  function handleClickTransacao(e) {
    e.preventDefault();
    if (cartao) {
      const verificarTipoTransacao =
        tipoTransacao.value === "despesa" ? "-" : "+";
      const data = Data();
      const idCartao = cartao.dataset.id;

      arrTransacao.push({
        nomeTransacao: nomeTransacao.value,
        valor: valorTransacao.value,
        tipo_transacao: verificarTipoTransacao,
        data: data,
        id: verificarTipoTransacao === "-" ? idCartao : null,
      });

      criarTransacao(
        nomeTransacao.value,
        verificarTipoTransacao,
        valorTransacao.value,
        data
      );
      nomeTransacao.focus();
      dom.setStorage("transacao", arrTransacao);
    }
  }

  function adicionarTransacao() {
    if (btnAdicionar) {
      btnAdicionar.addEventListener("click", handleClickAbrirForm);
      btnTransacao.addEventListener("click", handleClickTransacao);
    }
  }

  function init() {
    selecionarBanco();
    cartaoAtivo();
    adicionarTransacao();
    salvarTransacao();
  }

  return { init };
}
