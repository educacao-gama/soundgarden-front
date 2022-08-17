//Pegar parâmetros da url
const parametros = new URLSearchParams(window.location.search);
//pegando id da url
const id = parametros.get("id");


const listarReservas = async() => {
  const respostaAPI = await fetch(`https://xp41-soundgarden-api.herokuapp.com/bookings/event/${id}`)
  if (respostaAPI.status === 200) {
    const dado = await respostaAPI.json()
    console.log(respostaAPI)
    return dado
  }
}

const renderizarReservas = async(reservas) => {

  const dado = await listarReservas(reservas)

  dado.forEach((reserva, index) => {
    const tabela = document.querySelector('tbody');
    const novaLinha = document.createElement('tr');

    novaLinha.innerHTML = `<th scope="row">${index + 1}</th>
    <td>${reserva.owner_name}</td>
    <td>${reserva.owner_email}</td>
    <td>${reserva.number_tickets}</td>
        <td>

        </td >` //colocar as ações das reservas aqui

    tabela.appendChild(novaLinha)
  });


}
renderizarReservas()
