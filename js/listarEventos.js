const eventoListado = document.getElementsByClassName('.eventos')

const listarEventos = async() => {
  const respostaAPI = await fetch('https://xp41-soundgarden-api.herokuapp.com/events')
  if (respostaAPI.status === 200) {
    const dado = await respostaAPI.json()
    return dado
  }
}

const renderizarEventos = async(eventos) => {

  const dado = await listarEventos(eventos)

  dado.forEach((evento, index) => {
    const tabela = document.querySelector('tbody');
    const novaLinha = document.createElement('tr');

    novaLinha.innerHTML = `<th scope="row">${index + 1}</th>
    <td>${evento.scheduled}</td>
    <td>${evento.name}</td>
    <td>${evento.attractions}</td>
        <td>
        <a href="reservas.html?id=${evento._id}" class="btn btn-dark">ver reservas</a>
        <a href="editar-evento.html?id=${evento._id}&nome=${evento.name}&descricao=${evento.description}&data=${evento.scheduled}&ingressos=${evento.number_tickets}&atracoes=${evento.attractions}"" class="btn btn-secondary">editar</a>
        <a href="excluir-evento.html?id=${evento._id}&nome=${evento.name}&descricao=${evento.description}&data=${evento.scheduled}&ingressos=${evento.number_tickets}&atracoes=${evento.attractions}" class="btn btn-danger">Excluir</a>
        </td >`

    tabela.appendChild(novaLinha)
  });


}
renderizarEventos()
