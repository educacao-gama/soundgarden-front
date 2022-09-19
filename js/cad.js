const nameForm = document.querySelector(".col-6");


async function cadEvent(body){
    try{
        const response = await fetch("https://xp41-soundgarden-api.herokuapp.com/events", {
            method: "POST",
            body: JSON.stringify(cadEvent),
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
