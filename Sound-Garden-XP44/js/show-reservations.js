// mostrar as reservas na pagina de reservas
const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';

const showReservations = async () => {
    const list = document.querySelector("tbody");
    const options = {
        method: 'GET',
        redirect: 'follow'
    };
    const response = await fetch(`${BASE_URL}/bookings`, options);
    const content = await response.json();
    //console.log(content);
    let admin = '';
    for(let i=0; i<content.length; i++){
        admin += `
        <tr>
        <th scope="row">${i}</th>
        <td>${content[i].owner_name}</td>
        <td>${content[i].owner_email}</td>
        <td>${content[i].number_tickets}</td>
        <td>
            <a href="excluir-reserva.html?id=${content[i]._id}" class="btn btn-danger">excluir</a>
        </td>
        </tr>
        `};
    list.innerHTML = admin;
    }

showReservations();