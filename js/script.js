import Cadastro from "./cadastro.js";
import Validacao from "./validacao.js";

Validacao(".btn-confirmar", "[required]");

const cadastro = Cadastro();
cadastro.init();
