const bookingEvent = (name, email, eventId) => {
    return fetch(`https://soundgarden-api.vercel.app/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            owner_name: name,
            owner_email: email,
            number_tickets: 1,
            event_id: eventId,
        }),
    }).then((resposta) => {
        if (resposta.ok) {
            return resposta.body;
        }
        throw new Error('Não foi possível reservar ingresso');
    });
};

export const bookingsServices = {
    bookingEvent,
};
