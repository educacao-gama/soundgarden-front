const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';
const paransUrl = new URLSearchParams(window.location.search);
const paransId = paransUrl.get('id');

let editName = document.querySelector("#nome");
let editBanner = document.querySelector("#poster");
let editAttractions = document.querySelector("#atracoes");
let editDescription = document.querySelector("#descricao");
let editDate = document.querySelector("#data");
let editCapacity = document.querySelector("#lotacao");

const form = document.querySelector("form");

const displayEvent = async () => {
    const response = await fetch(`${BASE_URL}/events/${paransId}`, {method: 'GET'});
    const contentEventApi = await response.json();
    //console.log(contentEventApi);
    editName.value = contentEventApi.name;
    editAttractions.value = contentEventApi.attractions;
    editDescription.value = contentEventApi.description;
    editDate.value = contentEventApi.scheduled;
    editCapacity.value = contentEventApi.number_tickets;
};
displayEvent();

form.onsubmit = async (event) => {
    event.preventDefault();
    await fetch(`${BASE_URL}/events/${paransId}`, {method: 'DELETE'});
    alert("Evento deletado com sucesso!");
    window.location.href = ("admin.html");
}