const form = document.getElementById('form');

async function postBooking(formData) {
  try {
    const response = await fetch(
      'https://xp41-soundgarden-api.herokuapp.com/bookings',
      {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    const event = await response.json();
    return event;
  } catch(error){
    console.log(error);
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const name = event.target.name.value;
  const email = event.target.email.value;

  const formData = {
    owner_name: name,
    owner_email: email,
    number_tickets: 3,
    event_id: "6377278185122eed62984aa9"
  };

  postBooking(formData).then(() => {
    window.location.href = './index.html';
  });
});
