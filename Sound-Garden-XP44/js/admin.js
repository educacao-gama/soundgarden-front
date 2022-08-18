const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';

const exibitionEvents = async () => {
    const listEvent = document.querySelector('tbody');
    const requiredEvent = {
        method: 'GET',
        redirect: 'follow'
    };
    const response = await fetch(`${BASE_URL}/events`, requiredEvent);
    const contentEvent = await response.json();
    //console.log(contentEvent);
    let admin = '';
    for(let i=0; i<contentEvent.length; i++){
        admin += `
        <tr>
        <th scope="row">${i}</th>
        <td class="displayOff">${contentEvent[i].scheduled}</td>
        <td>${contentEvent[i].name}</td>
        <td class="displayOff">${contentEvent[i].attractions}</td>
        <td class="buttonAdmin">
        <a href="reservas.html?id=${contentEvent[i]._id}" class="btn btn-dark">Ver Reservas</a>
        <a href="editar-evento.html?id=${contentEvent[i]._id}" class="btn btn-secondary">Editar</a>
        <a href="excluir-evento.html?id=${contentEvent[i]._id}" class="btn btn-danger">Excluir</a>
        </td>
        </tr>`

    }

    listEvent.innerHTML = admin;
}

exibitionEvents();
    
    /*contentEvent.forEach(item => {
        listEvent.innerHTML += `
        <tr>
        <td>${item.name}</td>
        <td>${item.scheduled}</td>
        <td>${item.attraction}</td>
        <td>${item.description}</td>
        <td>
        <a href={${BASE_URL}/bookings/${item._id}} class="btn btn-primary">Reservar Ingresso</a>
        </td>
        </tr>
        `;
    }
    );*/