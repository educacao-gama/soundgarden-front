import { error } from '../js/error.js';

const editError = document.querySelector('[data-editerror]');
export default function editEventsServices(id, options) {
  const _id = id;
  const _options = options;
  async function editEvents() {
    const url = 'https://soundgarden-api.vercel.app/events/' + _id;

    try {
      const responseEdit = await fetch(url, _options);
      return await responseEdit.json();
    } catch {
      console.log('falha na conexão');
    }
  }

  editEvents().then((editedEvent) => {
    if (!editedEvent) {
      editError.removeAttribute('style');
      error.showError('ops, ocorreu um erro, tente mais tarde', editError);
      editError.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else {
      document.location.assign(
        '/soundgarden-front/admin.html?show=success-update',
      );
    }
  });
}
