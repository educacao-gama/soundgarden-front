const SOUND_URL = "https://xp41-soundgarden-api.herokuapp.com";

const inputNome = document.querySelector("#nome");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");
const inputBanner = document.querySelector("#banner");

// QueryString
// Tratamento de caracteres especiais

const preencherCampos =(dados) => {
    const{ name, poster, attractions, description, schedule, number_tickets} = dados

    inputNome.value = name;
    inputAtracoes.value = attractions; // implementar tratamento de virgula
    inputDescricao.value = description;
    inputData.value = schedule; // implementar tratamento da data
    inputLotacao.value = number_tickets;
    inputBanner.value = poster;
}

const getEventoPorId = (id) => {
    fetch(`${SOUND_URL}/events/${id}`)
    .then((response) => response.json())
    .then(preencherCampos);
}





