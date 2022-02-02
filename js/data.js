export default function Data() {
  var nomeMeses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const zeroAEsquerda = (num) => (num >= 10 ? num : `0${num}`);
  const objData = new Date();
  const dia = zeroAEsquerda(objData.getDate());
  const mes = nomeMeses[objData.getMonth()];
  const ano = objData.getFullYear();
  const hora = zeroAEsquerda(objData.getHours());
  const minutos = zeroAEsquerda(objData.getMinutes());

  return `${dia} ${mes.toUpperCase()}`;
}
