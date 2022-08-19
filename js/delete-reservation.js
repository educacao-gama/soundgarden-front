// Deletar reserva
const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';
const paransUrl = new URLSearchParams(window.location.search);
const paransId = paransUrl.get('id');

const form = document.querySelector("form");

let editName = document.querySelector("#nome");
let editEmail = document.querySelector("#email");
let editCapacity = document.querySelector("#lotacao");

const showReservations = async () => {
    const response = await fetch(`${BASE_URL}/bookings/${paransId}`, {method: 'GET'});
    const content = await response.json();
    //console.log(content);
    
    editName.value = content.owner_name;
    editEmail.value = content.owner_email;
    editCapacity.value = content.number_tickets;
}
showReservations();

form.onsubmit = async (event) => {
    event.preventDefault();
    await fetch(`${BASE_URL}/bookings/${paransId}`, {method: 'DELETE'});
    alert("Reserva deletada com sucesso!");
    window.location.href = ("reservas.html");
}
