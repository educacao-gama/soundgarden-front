const bookingEvent = (name, email, tickets, eventId) => {
    return fetch(`https://soundgarden-api.vercel.app/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            owner_name: name,
            owner_email: email,
            number_tickets: tickets,
            event_id: eventId,
        }),
    }).then((resposta) => {
        if (resposta.ok) {
            return resposta.body;
        }
        throw new Error('Não foi possível reservar ingresso');
    });
};

const removeBooking = (id) => {
    return fetch(`https://soundgarden-api.vercel.app/bookings/${id}`, {
        method: 'DELETE',
        redirect: 'follow',
    }).then((resposta) => {
        if (!resposta.ok) {
            throw new Error('Não foi possível deletar a reserva');
        }
    });
};

export const bookingsServices = {
    bookingEvent,
    removeBooking,
};
