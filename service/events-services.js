const eventsList = () => {
  return fetch(`https://soundgarden-api.vercel.app/events`).then((resposta) => {
    if (resposta.ok) {
      return resposta.json();
    }
    throw new Error('Não foi possível listar os eventos');
  });
};

export const eventsService = {
  eventsList,
};
