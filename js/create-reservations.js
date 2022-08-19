const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';
const paransUrl = new URLSearchParams(window.location.search);
const paransId = paransUrl.get('id');

const reservationName = document.getElementById('nome');
const reservationEmail = document.getElementById('email');
const reservationCapacity = document.getElementById('lotacao');

const form = document.querySelector('form');

async function createReservation(event) {
    event.preventDefault();
    try {
        const new_Reservation = await fetch(`${BASE_URL}/event/${paransId}`, {method: 'GET'});
        const contentReservation = await new_Reservation.json();
        //console.log(contentReservation);
        reservationName.innerHTML = contentReservation.name;
        reservationCapacity.innerHTML = contentReservation.number_tickets;
    } catch (error) {
        //console.log(error);
        alert("Preencha todos os campos");
    }
}
createReservation();

form.onsubmit = async (event) => {
    event.preventDefault();
    try {
        const newReservation = {
            name: reservationName.value,
            email: reservationEmail.value,
            capacity: parseInt(reservationCapacity.value)
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(newEvent),
            headers: {
                "Content-Type": "application/json",
              },
              redirect: "follow"
        };
        const responseTwo = await fetch(`${BASE_URL}/bookings`, options);
        const contentResponse = await responseTwo.json();
        console.log(contentResponse);
        alert("Reserva criada com sucesso!")
        window.location.href = ("index.html")
    } catch (error) {
        //console.log(error);
        alert("Preencha todos os campos");
    }
}

/*async function createReservation() {
    const reservation = {
        name: reservationName.value,
        email: reservationEmail.value,
        capacity: parseInt(reservationCapacity.value)
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(reservation),
        headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow"
    };

    const response = await fetch(`${BASE_URL}/events/${paransId}/bookings`, options);
    const content = await response.json();
    console.log(content);
    alert("Reserva criada com sucesso!")
    window.location.href = ("admin.html")
}*/