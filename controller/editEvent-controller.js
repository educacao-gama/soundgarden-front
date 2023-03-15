import { eventsService } from '../service/events-services.js';
import editEventsServices from '../service/editEvents-services.js';
import { error } from '../js/error.js';

const url = new URLSearchParams(document.location.search);
const id = url.get('id');
let prevName = 0;
let prevBanner = 0;
let prevAttraction = 0;
let prevDescription = 0;
let prevDate = 0;
let prevTicket = 0;
let control = 0;

async function listEvent() {
  const butSubmit = document.querySelector('[data-editform] button');
  butSubmit.setAttribute('disabled', '');
  try {
    return await eventsService.eventsList();
  } catch {
    const erroredit = document.querySelector('[data-editerror]');
    error.showError('ops, ocorreu um erro, tente mais tarde', erroredit);
    erroredit.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  } finally {
    butSubmit.removeAttribute('disabled');
    const loader = document.querySelector('[data-loaderedit]');
    loader.style.display = 'none';
  }
}
listEvent().then((events) => {
  const form = document.querySelector('[data-editform]');

  events.forEach((evt, index) => {
    if (evt._id == id) {
      prevName = evt.name;
      form.elements[0].setAttribute('placeholder', prevName);
      prevBanner = evt.poster;
      form.elements[1].setAttribute('placeholder', prevBanner);
      prevAttraction = evt.attractions;
      form.elements[2].setAttribute('placeholder', prevAttraction);
      prevDescription = evt.description;
      form.elements[3].setAttribute('placeholder', prevDescription);
      prevDate = evt.scheduled;
      const newPrevDate = prevDate;
      const newInitialDate = newPrevDate
        .replace(/[-]/g, '/')
        .replace('T', ' ')
        .slice(0, 16)
        .split(' ');
      const newInitialDay = newInitialDate[0].split('/').reverse().join('/');
      const newInitialHour = newInitialDate[1];
      const newInitialDate2 = newInitialDay + ' ' + newInitialHour;
      form.elements[4].setAttribute('placeholder', newInitialDate2);
      prevTicket = evt.number_tickets;
      form.elements[5].setAttribute('placeholder', prevTicket);
      control = 1;
    }
  });

  if (control == 0) {
    console.log('evento não encontrado, verifique se este evento ainda existe');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formElements = this.elements;
    const editError = document.querySelector('[data-editerror]');
    editError.style.display = 'none';

    let valueName = formElements[0].value;
    valueName = valueName ? valueName : prevName;

    let valueBanner = formElements[1].value;
    valueBanner = valueBanner ? valueBanner : prevBanner;

    let valueAttraction = formElements[2].value;
    valueAttraction = valueAttraction
      ? valueAttraction.split(',')
      : prevAttraction;

    let valueDescription = formElements[3].value;
    valueDescription = valueDescription ? valueDescription : prevDescription;

    let valueDate = formElements[4].value;
    if (valueDate) {
      const valueArray = valueDate.split(' ');
      const day = valueArray[0].split('/').reverse().join('-');
      const hour = valueArray[1] + ':00.000Z';
      valueDate = day + 'T' + hour;
    } else {
      valueDate = prevDate;
    }

    let valueTicket = formElements[5].value;
    valueTicket = valueTicket ? valueTicket : prevTicket;

    const bodyEdit = JSON.stringify({
      name: valueName,
      poster: valueBanner,
      attractions: valueAttraction,
      description: valueDescription,
      scheduled: valueDate,
      number_tickets: valueTicket,
    });

    const options = {
      method: 'PUT',
      body: bodyEdit,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    editEventsServices(id, options);
  }

  form.addEventListener('submit', handleSubmit);
});
