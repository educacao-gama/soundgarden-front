const newEvent = document.querySelector("#nome")

async function cadEvent(){
    try{
        const response = await postMessage("https://xp41-soundgarden-api.herokuapp.com/events");

} catch (error){
    console.log("ta dando pau " + error)
}}