const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const evento = document.querySelector("#eventos");
const modal = document.querySelector("#modal");
const botaoX = document.querySelector("#btn-x");
const botaoClose = document.querySelector("#btn-fechar");
const tituloModal = document.querySelector("#titulo-modal");
const tickets = document.querySelector("#tickets");
const form = document.querySelector("#form");
const email = document.querySelector("#email");
const ingresso = document.querySelector("#ingresso");
const nome = document.querySelector("#name");
const inputId = document.querySelector("#inputId");

const dataCorreta = (date) => {
  let data = date.split("");
  let dataArrumada =
    data.slice(8, 10).join("") +
    "/" +
    data.slice(5, 7).join("") +
    "/" +
    data.slice(0, 4).join("");
  return dataArrumada;
};

async function abreModal(id) {
  // modal.style.display = "flex";
  modal.setAttribute("style", "display:flex");
  inputId.value = id;
  const resposta = await fetch(`${BASE_URL}/events/${id}`, {
    method: "GET",
    redirect: "follow",
    headers: { "Content-Type": "application/json" },
  });

  const conteudoResposta = await resposta.json();
  tituloModal.innerHTML = `Reserve seu ingresso para ${conteudoResposta.name}`;
  tickets.innerHTML = `Tickets disponíveis: (${conteudoResposta.number_tickets})`;
  ingresso.max = conteudoResposta.number_tickets;
}
function fechaModal() {
  modal.setAttribute("style", "display:none");
  nome.value = "";
  email.value = "";
  ingresso.value = "";
  inputId.value = "";
}

async function listarEventos() {
  const tabela = document.querySelector("tbody");
  const resposta = await fetch(`${BASE_URL}/events`, {
    method: "GET",
    redirect: "follow",
    headers: { "Content-Type": "application/json" },
  });
  console.log(resposta);

  const conteudoResposta = await resposta.json();
  const bandas = conteudoResposta.slice(0, 3);
  bandas.forEach((item) => {
    evento.innerHTML += ` <article class="evento card p-5 m-3">
    <h2>${item.name} - ${dataCorreta(item.scheduled)}</h2>
    <h4>${item.attractions}</h4>
    <p>${item.description}</p>
    <button class="btn btn-primary" onclick="abreModal('${
      item._id
    }')" >reservar ingresso</button>
    </article>`;
  });
}
listarEventos();

botaoClose.onclick = () => {
  fechaModal();
};
botaoX.onclick = () => {
  fechaModal();
};

form.onsubmit = async (evento) => {
  evento.preventDefault();

  const reservarTicket = {
    owner_name: nome.value,
    owner_email: email.value,
    number_tickets: parseInt(ingresso.value),
    event_id: inputId.value,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(reservarTicket),
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  const resposta = await fetch(`${BASE_URL}/bookings`, options);
  const conteudoResposta = await resposta.json();
  console.log(conteudoResposta);

  if (resposta.status == 201) {
    alert("Reserva realizada com sucesso");

    fechaModal();
  }
};