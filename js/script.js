import Cadastro from "./cadastro.js";
import Cartao from "./cartao.js";
import SliderFatura from "./slider-fatura.js";
import Validacao from "./validacao.js";

Validacao(".btn-confirmar", "[required]");
Validacao(".adicionar-transacao", "[data-card='transacao'] [required]");
Validacao(".confirmar-pagamento", "[data-card='pagamento'] [required]");

const cadastro = Cadastro();
cadastro.init();

const cartao = Cartao();
cartao.init();

const slideFatura = new SliderFatura(
  ".box-faturas",
  ".nav-faturas",
  "[data-mes]",
  ".voltar",
  ".proximo"
);
slideFatura.init();
