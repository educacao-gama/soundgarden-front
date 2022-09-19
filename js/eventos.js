const getEvent = document.querySelector(".container d-flex justify-content-center align-items-center flex-wrap");

async function viewEvent() {
    try{
        const response = await fetch("https://xp41-soundgarden-api.herokuapp.com/events")
        
        const data = await response.json()

        data.forEach((article) => {
            const cardEv = `<article class="evento card p-5 m-3">
            <h2> 
            ${article.name} + " - " + ${article.scheduled}
            </h2>
            <h4>
            ${article.attractions}
            </h4>
            <p>
            ${article.description}
            </p>
            <a href="#" class="btn btn-primary">reservar ingresso</a>
        </article>`

        getEvent.innerHTML += cardEv
            
        });


    } catch (error) {
        console.log("ta dando pau no eventos " + error)
    }

    
}
viewEvent() 