// import { BASE_URL } from "./script.js"; // Importa o BASE_URL do script.js
const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com';

const inputNome = document.querySelector("#nome");
const inputBanner = document.querySelector("#banner");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");

const form = document.querySelector("form"); 

form.onsubmit = async (evento) =>{
    evento.preventDefault();
   try {
       
    const novoEvento = {
       name: inputNome.value,
       poster: inputBanner.value,
       attractions: inputAtracoes.value.split(","),
       description: inputDescricao.value,
       scheduled: new Date(inputData.value).toISOString(),
       number_tickets: parseInt(inputLotacao.value) 
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(novoEvento),
        headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow"
    };

   const resposta = await fetch(`${BASE_URL}/events`, options);
   const conteudoResposta = await resposta.json();
   
   console.log(conteudoResposta)
    alert("Evento criado com sucesso!")
    window.location.href = ("admin.html")
} catch (error) {
    console.log(error)
       alert("Deu ruim")
}
}






