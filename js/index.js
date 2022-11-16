const container = document.getElementById('articleContainer');

async function getEvents() {
  try {
    const response = await fetch(
      'https://xp41-soundgarden-api.herokuapp.com/events'
    );
    const events = await response.json();
    return events;
  } catch(error){
    console.log(error);
  }

}

getEvents().then(events => {
  const threeEvents = events.slice(0, 3);

  threeEvents.forEach(event => {
    const date = new Date(event.scheduled);
    const formattedDate =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

      articleContainer.innerHTML += `
      <article class="evento card p-5 m-3">
        <h2>${event.name} - ${formattedDate}</h2>
        <h4>${event.attractions}</h4>
        <p>${event.description}</p>
        <a href="#" class="btn btn-primary">reservar ingresso</a>
      </article>
    `;
   });
});

