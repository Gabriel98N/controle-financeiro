import Cadastro from "./cadastro.js";
import Validacao from "./validacao.js";

Validacao(".adicionar-cartao", "[required]");

const cadastro = Cadastro();
cadastro.init();
