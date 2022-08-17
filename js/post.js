//definir as variáveis com os ID's do HTML
const nome = document.querySelector('#nome');
const atracao = document.querySelector('#atracoes');
const descricao = document.querySelector('#descricao');
const data = document.querySelector('#data');
const ingresso = document.querySelector('#lotacao');
const form = document.querySelector('form');



form.onsubmit = async (evento) => {
    evento.preventDefault();
    //transformar a data recebida no formato YYYY-MM-DDTHH:mm:ss.sTZD igual ao JSON da API
    const novaData = new Date(data.value).toISOString();
    console.log(novaData)

    const objeto = {
        name: nome.value,
        "poster": "link da imagem",
        attractions: atracao.value.split(','),
        description: descricao.value,
        scheduled: novaData,
        number_tickets: ingresso.value,
    }

    const metodoPost = {
        method: 'POST',
        body: JSON.stringify(objeto),
        redirect: 'follow',
        headers: {"Content-Type": "application/json"}
    };

    await fetch("https://xp41-soundgarden-api.herokuapp.com/events", metodoPost)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(err =>alert("Você escreveu alguma informação errada. =("));

//Zerar os valores depois de enviar os dados:
    nome.value = '';
    atracao.value = '';
    descricao.value = '';
    data.value = '';
    ingresso.value = '';
}
