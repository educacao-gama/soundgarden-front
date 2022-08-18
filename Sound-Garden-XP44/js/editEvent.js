const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';
const paransUrl = new URLSearchParams(window.location.search);
const paransId = paransUrl.get('id');

const inputName = document.querySelector("#nome");
const inputBanner = document.querySelector("#poster");
const inputAttractions = document.querySelector("#atracoes");
const inputDescription = document.querySelector("#descricao");
const inputDate = document.querySelector("#data");
const inputCapacity = document.querySelector("#lotacao");

const form = document.querySelector("form");

let editName = document.querySelector("#nome");
let editBanner = document.querySelector("#poster");
let editAttractions = document.querySelector("#atracoes");
let editDescription = document.querySelector("#descricao");
let editDate = document.querySelector("#data");
let editCapacity = document.querySelector("#lotacao");

const displayEvent = async () => {
    const response = await fetch(`${BASE_URL}/events/${paransId}`, {method: 'GET'});
    const contentEventApi = await response.json();
    //console.log(contentEventApi);
    editName.value = contentEventApi.name;
    editAttractions.value = contentEventApi.attractions;
    editDescription.value = contentEventApi.description;
    editDate.value = contentEventApi.scheduled;
    editCapacity.value = contentEventApi.number_tickets;
}
displayEvent();

form.onsubmit = async (event) => {
    event.preventDefault();
    try {
        const editEvent = {
            name: inputName.value,
            poster: "link da imagem",
            attractions: inputAttractions.value.split(","),
            description: editDescription.value,
            scheduled: new Date(inputDate.value).toISOString(),
            number_tickets: parseInt(inputCapacity.value),
    }    
    const options = {
        method: 'PUT',
        body: JSON.stringify(editEvent),
        headers: {
            "Content-Type": "application/json",
            },
            redirect: "follow"
    };

    const responseTwo = await fetch(`${BASE_URL}/events/${paransId}`, options);
    const contentResponseApiTwo = await responseTwo.json();
    console.log(contentResponseApiTwo);
    alert("Evento editado com sucesso!")
    window.location.href = "admin.html";
} catch (error) {
    console.log(error)
    alert("O evento não pode ser editado!")
}
}