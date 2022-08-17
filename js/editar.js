// atribuindo os ID's para as variáveis
const inputNome = document.querySelector('#nome');
const inputAtracoes = document.querySelector('#atracoes');
const inputDescricao = document.querySelector('#descricao');
const inputData = document.querySelector('#data');
const inputIngressos = document.querySelector('#lotacao');
const form = document.querySelector('form');

// pegando os params da url
const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");
const nome = parametros.get("nome");
const atracoes = parametros.get("atracoes");
const descricao = parametros.get("descricao");
const data = parametros.get("data");
const ingressos = parametros.get("ingressos");

// colocando os params nos values dos campos
inputNome.value = nome;
inputAtracoes.value = atracoes;
inputDescricao.value = descricao;
inputData.value = new Date(data).toISOString();
inputIngressos.value = ingressos;

form.onsubmit = async (editarEvento) => {
  editarEvento.preventDefault();


  const objeto = {
    name: inputNome.value,
    "poster": "link da imagem",
    attractions: inputAtracoes.value.split(','),
    description: inputDescricao.value,
    scheduled: new Date(inputData.value).toISOString(),
    number_tickets: inputIngressos.value,
  }

  const metodoEditar = {
      method: 'PUT',
      body: JSON.stringify(objeto),
      headers: {"Content-Type": "application/json"}
  }

        await fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${id}`, metodoEditar) //enviar para o id do evento modificado
        .then(response => response) // resposta da promessa
        .then(result => {window.location.href = './admin.html';}) //retornar para a página anterior
        .catch(error => alert(`O evento ${nome} não foi criado`));

}
