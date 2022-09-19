
async function cadEvent(){
    try{
        const newForm = document.querySelectorAll(".col-6");

        const newEvent = {
            name: "name",
            poster: "link da imagem",
            attractions: [
                "atracoes"
            ],
            description: "descricao",
            scheduled: "2022-09-18T22:00:00.000Z",
            number_tickets: 10
        }; console.log(newEvent)
           
        
        
        const response = await fetch("https://xp41-soundgarden-api.herokuapp.com/events", {
            method: "POST",
            body: JSON.stringify(newEvent),
            Headers: { 
                "Content-Type": "application/json; charset=UTF-8",
            },
            
            
        });
        console.log(response)

    
    }catch (error){
    console.log("ta dando pau no cadastro " + error)
    };
}
cadEvent();
