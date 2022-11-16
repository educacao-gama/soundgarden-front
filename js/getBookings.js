const container = document.getElementById('bookingsTable');

async function getBookings() {
  try {
    const response = await fetch(
      'https://xp41-soundgarden-api.herokuapp.com/bookings'
    );
    const bookings = await response.json();
    return bookings;
    
  } catch(error){
    console.log(error);
  }
}

const bookingsList = getBookings();
bookingsList.then(bookings => {
  

  bookings.forEach((booking, index) => {
    

    let scheduled;
    let eventName;
   
    if (booking.event !== null) {
      
      scheduled = new Date(booking.event.scheduled);
      scheduled = scheduled.getDate() + "/" + (scheduled.getMonth()+1) + "/" + scheduled.getFullYear(); 
      eventName = booking.event.name;
    
    } else {
      scheduled = 'nao cadastrado';
      eventName = 'nao cadastrado';
    }
    
    const rowEvent = `
    <tr>
      <td>${index + 1}</td>
      <td>${booking.owner_name}</td>
      <td>${booking.owner_email}</td>
      <td>${scheduled}</td>
      <td>${eventName}</td>
      <td class="center">${booking.number_tickets}</td>
    </tr>
  `;
    bookingsTable.innerHTML += rowEvent;
  });
});


 
