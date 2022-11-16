const container = document.getElementById('eventsContainer');

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

const eventsList = getEvents();
eventsList.then(events => {
  events.forEach((event, index) => {
    const date = new Date(event.scheduled);
    const formattedDate = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear(); 
    const rowEvent = `
    <article class="evento card p-5 m-3">
        <h2>${event.name} - ${formattedDate}</h2>
        <h4>${event.attractions}</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro aperiam sunt quo similique,
            dolorum consectetur inventore ipsam, officiis neque natus eius harum alias quidem. Possimus
            nobis in inventore tenetur asperiores.</p>
        <a href="#" class="btn btn-primary">reservar ingresso</a>
    </article>
    `;
    container.innerHTML += rowEvent;
  });
});
