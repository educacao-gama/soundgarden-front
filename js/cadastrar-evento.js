    const SOUND = 'https://xp41-soundgarden-api.herokuapp.com/events';

    const formCadastroEvento = document.querySelector('#cadastro-evento');

    formCadastroEvento.addEventListener('submit', async (event) => {
    // evita que a pagina seja recarregada
    event.preventDefault();

    const inputNome = document.getElementById("nome");
    const inputBanner = document.getElementById("banner");
    const inputAtracoes = document.getElementById("atracoes");
    const inputDescricao = document.getElementById("descricao");
    const inputData = document.getElementById("data");
    const inputLotacao =document.getElementById("lotacao");
//alert(inputNome.value);


    const fullDateTime = new Date(inputData.value);
// criando objeto com dados do evento

    const novoEventoObj = {
    "name": inputNome.value,
    "poster": inputBanner.value,
    "attractions": inputAtracoes.value.split(","),
    "description": inputDescricao.value,
    "scheduled": fullDateTime.toISOString(),     
    "number_tickets": inputLotacao.value,
};

// console.log(novoEventoObj);

// Convertendo Obj para JSON 
    const novoEventoJSON = JSON.stringify(novoEventoObj);

// Conexao com API para cadastrar novo evento 
// Salvando Resposta na Const
    const resposta = await fetch(SOUND,{
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: novoEventoJSON

    }).then((response) => { 
        return response.json();
    }).then((responseOBJ) => {
       console.log(responseOBJ);
    });

});



