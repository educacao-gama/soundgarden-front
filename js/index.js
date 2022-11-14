// <section> via ID
const eventoDiv = document.querySelector("#event-list");

async function getEvent() {
  const response = await fetch(
    `https://xp41-soundgarden-api.herokuapp.com/events`);
  // A resposta é então processada pelo método .json() que pega a response
  // e a transforma em um objeto em JS notices
  let eventos = await response.json();

  for (let i = 0; i < 3; i++){
    let evento = eventos[i];
    const cardEvento = `
    <article class="evento card p-5 m-3">
        <h2>${evento.name} + ${evento.scheduled.slice(0, 10).split('-').join('/')}</h2>
        <h4>${evento.attractions}</h4>
        <p>${evento.description}</p>
        <a href="#" class="btn btn-primary">reservar ingresso</a>
    </article>            `;
    // HTML de section += HTML anterior + HTML do loop atual
    // É um append
    eventoDiv.innerHTML += cardEvento;
    };
};

getEvent();
