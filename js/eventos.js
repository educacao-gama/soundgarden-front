const getEvent = document.querySelector("container d-flex justify-content-center align-items-center flex-wrap");

async function viewEvent() {
    try{
        const response = await fetch("https://xp41-soundgarden-api.herokuapp.com/events")
        
        const data = await response.json()

        data.forEach((element) => {
            const cardEv = `<article class="evento card p-5 m-3">
            <h2> ${element.name} - 05/03/2022
            </h2>
            <h4>Arctic Monkeys, The Kooks, Hiatus Kaiyote</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro aperiam sunt quo similique,
                dolorum consectetur inventore ipsam, officiis neque natus eius harum alias quidem. Possimus
                nobis in inventore tenetur asperiores.</p>
            <a href="#" class="btn btn-primary">reservar ingresso</a>
        </article>`

        getEvent.innerHTML += cardEv
            
        });


    } catch (error) {
        console.log("ta dando pau no eventos " + error)
    }

    
}
viewEvent() 