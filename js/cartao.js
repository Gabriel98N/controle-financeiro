import Dom from "./dom.js";
import outsideEvent from "./outside-event.js";
import Data from "./data.js";

const dom = Dom();

export default function Cartao() {
  const cartao = dom.el(".header-cartao .cartao");
  const selectBanco = dom.el("#banco");
  const arrCartao = dom.getStorage("cartao");

  const btnAdicionar = dom.el(".btn-adicionar");
  const btnTransacao = dom.el(".adicionar-transacao");
  const active = "active";

  const arrTransacaoStorage = dom.getStorage("transacao");
  const arrTransacao = arrTransacaoStorage ? arrTransacaoStorage : [];

  const tabelaTransacao = dom.el(".tabela-transacao");
  const tipoTransacao = dom.el("#tipo-transacao");
  const nomeTransacao = dom.el("#nome-transacao");
  const valorTransacao = dom.el("#valor");
  const indexMesAtual = new Date().getMonth();

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
          { instituicao, nomeImp, bandeira, diaVenc, logoBandeira, limite },
          index
        ) => {
          if (idCartao == index) {
            const { corCartao } = arrCartao[index];
            const arrowSelectBanco = dom.el("[data-input='select-banco'] span");

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
            cartao ? (arrowSelectBanco.style.backgroundColor = corCartao) : "";
          }
        }
      );
    }
  }

  function abrirModal() {
    const btns = dom.els(".abrir-modal");
    const modal = dom.els("[data-card]");

    if (btns.length) {
      btns.forEach((btn, index) => {
        const earchModal = modal[index];
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          earchModal.classList.add(active);
          outsideEvent(
            earchModal,
            () => {
              earchModal.classList.remove(active);
            },
            ["click"]
          );
        });
      });
    }
  }

  function criarTransacao(
    transacao,
    nomeTransacao,
    data,
    sinalTransacao,
    valor
  ) {
    if (tabelaTransacao) {
      transacao.classList.add("transacao");
      transacao.innerHTML = `
        <span data-identificador="${sinalTransacao}"></span>
        <p class="nome-transacao">${nomeTransacao}</p>
        <p class="data-transacao">${data}</p>
        <p class="valor-transacao">${sinalTransacao}${dom.conversorMoeda(
        valor,
        "PT-BR",
        "BRL"
      )}</p>
      `;
      tabelaTransacao.prepend(transacao);
    }
  }

  function limiteCartao(totalDespesa) {
    const limiteDisponivel = dom.el(".limite-disponivel");
    const limiteUtilizado = dom.el(".limite-utilizado");
    const progresso = dom.el(".liquido");

    const somarLimite = (limite) => {
      return dom.conversorMoeda(limite, "PT-BR", "BRL");
    };

    if (cartao) {
      const idCartao = cartao.dataset.id;
      const { limite, corCartao } = arrCartao[idCartao];
      const diminuiLimite = limite - totalDespesa;
      const progressoLimite = (100 * totalDespesa) / limite;
      const porcLimite =
        progressoLimite === 100
          ? progressoLimite.toFixed(0)
          : progressoLimite.toFixed(2);

      const avisoLimite = dom.el(".aviso-limite p");

      progresso.style.backgroundColor = corCartao;
      progresso.animate([{ width: 0 }, { width: `${porcLimite}%` }], {
        duration: 1000,
        fill: "forwards",
      });

      if (avisoLimite) avisoLimite.innerText = `${porcLimite}%`;

      limiteDisponivel.innerText = somarLimite(diminuiLimite);
      limiteUtilizado.innerText = somarLimite(totalDespesa);
    }
  }

  function somarValores(valor, tipoTransacao) {
    valor = typeof valor === "number" ? valor : valor.replace(",", ".");
    arrValores[tipoTransacao].push(valor);

    const totalValores = arrValores[tipoTransacao].reduce((ac, num) => {
      return ac + Number(num);
    }, 0);

    const elementValor = dom.el(`[data-dados="${tipoTransacao}"] p`);
    if (elementValor)
      elementValor.innerText = dom.conversorMoeda(totalValores, "PT-BR", "BRL");
    return totalValores;
  }

  function fnTransacaoArr(idCartao) {
    const transacao = dom.create("div");
    const sinalTransacao = tipoTransacao.value === "despesa" ? "-" : "+";
    const { instituicao } = arrCartao[idCartao];

    arrTransacao.push({
      nomeTransacao: nomeTransacao.value,
      data: Data(),
      tipoTransacao: sinalTransacao,
      valor: valorTransacao.value,
      id: sinalTransacao === "-" ? idCartao : null,
    });

    criarTransacao(
      transacao,
      nomeTransacao,
      Data(),
      sinalTransacao,
      valorTransacao
    );

    dom.setStorage("transacao", arrTransacao);
    dom.reloadPage(
      `Adicionando transação para o cartão <b>${instituicao}</b>`,
      2000
    );
  }

  function adicionarTransacao() {
    if (btnTransacao && cartao) {
      btnTransacao.addEventListener("click", (e) => {
        e.preventDefault();
        const idCartao = cartao.dataset.id;
        if (tipoTransacao.value === "despesa") {
          const { limite } = arrCartao[idCartao];
          const totalDespesa = somarValores(
            valorTransacao.value,
            tipoTransacao.value
          );

          if (totalDespesa > limite) {
            alert(
              "Não foi possível realizar está operação, você está tentando adicionar uma conta maior que o limite disponível"
            );
            dom.reloadPage("Cancelando operação", 2000);
          } else {
            fnTransacaoArr(idCartao);
          }
        } else {
          fnTransacaoArr(idCartao);
        }
      });
    }
  }

  function salvarTransacao() {
    arrTransacao.forEach(
      ({ nomeTransacao, id, tipoTransacao, data, valor }) => {
        const transacao = dom.create("div");
        criarTransacao(transacao, nomeTransacao, data, tipoTransacao, valor);
        if (id && cartao) {
          transacao.setAttribute("data-id-transacao", id);
          const idCartao = cartao.dataset.id;
          if (idCartao === id) {
            transacao.style.display = "flex";
            limiteCartao(somarValores(valor, "despesa"));
          } else {
            transacao.style.display = "none";
          }
        } else {
          somarValores(valor, "saldo");
        }
      }
    );

    if (selectBanco) {
      selectBanco.addEventListener("change", () =>
        dom.reloadPage(
          `Buscando dados do cartão <b>${selectBanco.value}</b>`,
          2000
        )
      );
    }
  }

  function visualizarFatura() {
    const mesesFatura = dom.els("[data-mes]");
    const navFaturas = dom.el(".nav-faturas");
    const avisoFatura = dom.el(".aviso-fatura");

    if (mesesFatura.length) {
      const mesAtual = mesesFatura[indexMesAtual];
      const distMes = mesAtual.getBoundingClientRect().left;
      navFaturas.scroll({
        top: 0,
        left: distMes - 180,
        behavior: "smooth",
      });

      mesAtual.classList.add(active);
      const arrFaturaValor = {
        jan: [],
        fev: [],
        mar: [],
        abr: [],
        mai: [],
        jun: [],
        jul: [],
        ago: [],
        set: [],
        out: [],
        nov: [],
        dez: [],
      };

      mesesFatura.forEach((item) => {
        const atr = item.dataset.mes;
        const valorFatura = item.querySelector("span");
        const idCartao = cartao.dataset.id;

        arrTransacao.forEach(({ id, valor, data }, index) => {
          const boxTransacao = dom.els(".transacao")[index];
          const idTransacao = boxTransacao.dataset.idTransacao;
          const dataTransacao = boxTransacao.querySelector(".data-transacao");
          const mesTransacao = dataTransacao.innerText
            .substring(3, 6)
            .toLowerCase();

          if (id) {
            avisoFatura.style.display = "none";
            if (id === idCartao) {
              const mesTransacao = data.substring(3, 6).toLowerCase();
              if (mesTransacao === atr) {
                arrFaturaValor[atr].push(valor);
                const totalFatura = arrFaturaValor[atr].reduce((ac, n) => {
                  n = typeof n === "number" ? n : n.replace(",", ".");
                  return ac + Number(n);
                }, 0);

                valorFatura.innerText = dom.conversorMoeda(
                  totalFatura,
                  "PT-BR",
                  "BRL"
                );
              }
            }
          }

          if (idTransacao === idCartao) {
            if (mesAtual.dataset.mes === mesTransacao) {
              boxTransacao.style.display = "flex";
            } else {
              boxTransacao.style.display = "none";
            }
          }

          item.addEventListener("click", (e) => {
            e.preventDefault();
            dom.removerSelecionado(mesesFatura, active);
            item.classList.add(active);
            if (idCartao === idTransacao) {
              if (atr === mesTransacao) {
                boxTransacao.style.display = "flex";
              } else {
                boxTransacao.style.display = "none";
              }
            }
          });
        });
      });
    }
  }

  function pagarDespesa() {
    const btnConfirmar = dom.el(".confirmar-pagamento");
    const inputPagamento = dom.el("#pagamento");
    const textPagamento = dom.el(".text-pagamento");

    if (cartao) {
      const idCartao = cartao.dataset.id;
      const saldo = dom.el('[data-dados="saldo"] p');

      btnConfirmar.addEventListener("click", (e) => {
        e.preventDefault();

        arrTransacao.forEach((transacao) => {
          console.log(transacao);
        });
      });

      inputPagamento.addEventListener("keyup", (e) => {
        const targetPagamento = e.target.value;
        textPagamento.innerText = dom.conversorMoeda(
          targetPagamento,
          "PT-BR",
          "BRL"
        );
      });
    }
  }

  function init() {
    selecionarBanco();
    cartaoAtivo();
    abrirModal();

    adicionarTransacao();
    salvarTransacao();

    visualizarFatura();
    pagarDespesa();
  }

  return { init };
}
