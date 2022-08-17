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

form.onsubmit = async (deletarEvento) => {
  deletarEvento.preventDefault();

  const metodoDeletar = requestOptions = {
    method: 'DELETE',
    headers: {
        "Content-Type": "application/json",
    }
  }

  fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${id}`, requestOptions)
        .then(response => response)
        .then(result => { window.location.href = './admin.html'})
        .catch(error => alert(`O evento ${nome} não foi excluido`));
}
