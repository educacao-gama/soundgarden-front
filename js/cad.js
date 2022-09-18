

async function cadEvent(name){
    try{
        const response = await fetch("https://xp41-soundgarden-api.herokuapp.com/events", {
            method: "POST"
        });
        const data = await response.json();
       

        data.onsubmit = () => {
            const name = document.querySelector("#nome");
            cadEvent(name.value);
        }
        

} catch (error){
    console.log("ta dando pau " + error)
    }

}
cadEvent()