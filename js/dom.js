function Dom() {
  function el(el) {
    return document.querySelector(el);
  }

  function els(el) {
    return document.querySelectorAll(el);
  }

  function create(tag) {
    return document.createElement(tag);
  }

  function events(...event) {
    return [...event];
  }

  function transformLowerCase(string) {
    return string.toLowerCase();
  }

  function addClass(element, classe) {
    el(element).classList.add(classe);
    return element;
  }

  function removeClass(element, classe) {
    el(element).classList.remove(classe);
    return element;
  }

  function toggleClass(element, classe) {
    el(element).classList.toggle(classe);
    return element;
  }

  function conversorMoeda(numero, lang, type) {
    numero = typeof numero === "string" ? numero.replace(",", ".") : numero;
    return Number(numero).toLocaleString(lang, {
      style: "currency",
      currency: type,
    });
  }

  function firstLetter(text) {
    return `${text.charAt(0).toUpperCase()}${text.substr(1).toLowerCase()}`;
  }

  function eventListeners(el, evento, callback) {
    const element = document.querySelectorAll(el);
    element.forEach((item) => {
      item.addEventListener(evento, callback);
    });
    return element;
  }

  function setStorage(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
    return arr;
  }

  function getStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  function reloadPage(mensagem, tempo) {
    const loader = document.querySelector('[data-loader="geral"]');
    const textLoader = loader.querySelector("p");
    textLoader.innerHTML = mensagem;

    loader.classList.add("active");
    setTimeout(() => {
      location.reload();
    }, tempo);
  }

  return {
    el,
    els,
    create,
    events,
    transformLowerCase,
    addClass,
    removeClass,
    toggleClass,
    conversorMoeda,
    firstLetter,
    eventListeners,
    setStorage,
    getStorage,
    reloadPage,
  };
}

export default Dom;
