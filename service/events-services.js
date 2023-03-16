const eventsList = () => {
    return fetch(`https://soundgarden-api.vercel.app/events`).then(
        (resposta) => {
            if (resposta.ok) {
                return resposta.json();
            }
            throw new Error('Não foi possível listar os eventos');
        }
    );
};

const newEvent = (titulo, banner, atra, desc, date, lotacao) => {
    return fetch(`https://soundgarden-api.vercel.app/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: titulo,
            poster: banner,
            attractions: atra,
            description: desc,
            scheduled: date,
            number_tickets: lotacao,
        }),
    }).then((resposta) => {
        if (resposta.ok) {
            return resposta.body;
        }
        throw new Error('Não foi possível criar evento');
    });
};

const updateEvent = (
    id,
    name,
    poster,
    attractions,
    description,
    scheduled,
    number_tickets
) => {
    return fetch(`https://soundgarden-api.vercel.app/events/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            redirect: 'follow',
        },
        body: JSON.stringify({
            name: name,
            poster: poster,
            attractions: attractions,
            description: description,
            scheduled: scheduled,
            number_tickets: number_tickets,
        }),
    }).then((resposta) => {
        if (resposta.ok) {
            return resposta.body;
        }
        throw new Error('Não foi possível atualizar o evento');
    });
};

const removeEvent = (id) => {
    return fetch(`https://soundgarden-api.vercel.app/events/${id}`, {
        method: 'DELETE',
        redirect: 'follow',
    }).then((resposta) => {
        if (!resposta.ok) {
            throw new Error('Não foi possível deletar o evento');
        }
    });
};

const eventDetail = (id) => {
    return fetch(`https://soundgarden-api.vercel.app/events/${id}`).then(
        (resposta) => {
            if (resposta.ok) {
                return resposta.json();
            }

            throw new Error('Não foi possível achar o evento');
        }
    );
};

export const eventsService = {
    eventsList,
    newEvent,
    updateEvent,
    removeEvent,
    eventDetail,
};
