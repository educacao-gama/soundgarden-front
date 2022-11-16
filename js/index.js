const eventDiv = document.querySelector("#event-list");

async function getEvent() {
  const response = await fetch(
    `https://xp41-soundgarden-api.herokuapp.com/events`);

  let events = await response.json();

  for (let i = 0; i < 3; i++) {
    let event = events[i];
    const date = new Date(event.scheduled);
    const formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    const cardEvento = `
    <article class="evento card p-5 m-3">
        <h2>${event.name} - ${formattedDate}</h2>
        <h4>${event.attractions}</h4>
        <p>${event.description}</p>
        <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#cadUsuarioModal">reservar ingresso</a>
    </article>            `;

    eventDiv.innerHTML += cardEvento;
  };
};

getEvent();


// TESTE
/*
Pseudocódigo:

getEvents();
1) no final de index.html, quando a página é carregada, a função getEvent() dentro de index.js é chamada
2) getEvent requisita à API informações que são então estocadas dentro da constante "events"
3) for loop de 3 iterações modifica o DOM, alterando o HTML
4) encerramento da 

Modal:
1) Ao se clicar no evento, surge um modal com um formulário
2) Requisição de nome e e-mail com validação no frontend ok
3) Pergunta: como chamar uma nova requisição de API com base no ID do evento? Onde ele poderia ficar estocado?


Código abaixo é cópia de postEvents.js
*/

const form = document.getElementById('form');

async function postEvent(formData) {
  try {
    const response = await fetch(
      'https://xp41-soundgarden-api.herokuapp.com/events',
      {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const event = await response.json();
    return event;
  } catch(error){
    console.log(error);
  }
 
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = event.target.name.value;
  const attractions = event.target.attractions.value;
  const description = event.target.description.value;
  const scheduled = event.target.scheduled.value;
  const tickets = event.target.tickets.value;

  const dataList = scheduled.split('/');
  const day = dataList[0];
  const month = dataList[1];
  const yearHour = dataList[2];
  const date = month + '/' + day + '/' + yearHour;

  const formData = {
    name,
    attractions: attractions.split(','),
    description,
    scheduled: new Date(date).toISOString(),
    number_tickets: parseInt(tickets),
    poster: '#'
  };

  postEvent(formData).then(event => {
    window.location.href = '/admin.html';
  });
});
