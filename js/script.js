import Cadastro from "./cadastro.js";
import Cartao from "./cartao.js";
import Validacao from "./validacao.js";

Validacao(".btn-confirmar", "[required]");
Validacao(".btn-adicionar", "[required]");

const cadastro = Cadastro();
cadastro.init();

const cartao = Cartao();
cartao.init();
