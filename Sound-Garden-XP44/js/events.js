// Mostrar eventos

const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';
const paransUrl = new URLSearchParams(window.location.search);
const paransId = paransUrl.get('id');

const showEvent = async () => {
    const eventList = document.querySelector('#events');
    const requiredEvent = {
        method: 'GET',
        redirect: 'follow'
    };
    const response = await fetch(`${BASE_URL}/events`, requiredEvent);
    const contentEvent = await response.json();
    //console.log(contentEvent);

    const events = contentEvent.splice(0, 6);
    events.forEach(item => {
        eventList.innerHTML += `
        <article class="event card p-5 m-3 id="newEvent"">
        <h2 class="text-center">${item.name}${$item.scheduled}</h2>
        <h4 class="text-center">${item.attraction}</h4>
        <p class="text-center">${item.description}</p>
        <a href={${BASE_URL}/bookings/${item._id}} class="btn btn-primary" id="modalBtn">Reservar Ingresso</a>
        </article>
        `;
    });

    let modal = document.querySelector('#exibitionModal');
    let modalBtn = document.querySelectorAll('#modalBtn');
    let closeBtn = document.getElementsByClassName('close')[0];

    
    modalBtn.forEach((button) => {
        button.onclick = function (events) {
            modal.style.display = "block";
            events.preventDefault();
        }

        closeBtn.onclick = function () {
            modal.style.display = "none";
        }
    })

    window.onclick = function (events) {
        if (events.target == modal) {
            modal.style.display = "none";
        }
    }
}

showEvent();