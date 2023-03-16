import { cards } from '../controller/eventsList-controller.js';

const popoverInit = async () => {
    let popoverTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
};

(async () => {
    await cards.renderCards(false);
    await popoverInit();
})();
