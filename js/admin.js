const SOUND = 'https://xp41-soundgarden-api.herokuapp.com/events';

const listarEventos = async () =>{
    const resposta = await fetch(SOUND, {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" }
    }).then((resposta) =>{
        return resposta.json();
    });

    const tbody = document.querySelector('.lista-Eventos tbody');

    let htmleventos = "";

    eventos.forEach(evento => { htmleventos += `
        <tr><th scope="row">#</th>
        <td>${evento.scheduled}</td>
        <td>${evento.name}</td>
        <td>${evento.attractions.join(', ')}</td>
        <td>
          <a href="reservas.html?id=${evento._id}" class="btn btn-dark">ver reservas</a>
          <a href="editar-evento.html?id=${evento._id}" class="btn btn-secondary">editar</a>
          <a href="excluir-evento.html?id=${evento._id}" class="btn btn-danger">excluir</a>
        </td>
        </tr>
        `;
});
        


listarEventos()

document.onload = () => {

    const url = new URL (window.location.href);

    const acao = url.searchParams.get('acao');

    if (acao != null && acao == 'edit'){
        alert('Evento atualizado com sucesso!');
    }
}