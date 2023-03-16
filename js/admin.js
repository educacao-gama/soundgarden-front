import { success } from './success.js';

const successMessage = async () => {
    const getURL = new URL(window.location);
    const show = getURL.searchParams.get('show');

    window.addEventListener('load', () => {
        if (show === 'success-remove') {
            const successDiv = document.querySelector('[data-success]');
            success.showSuccess('Evento excluído com sucesso!', successDiv);
        }

        if (show === 'success-create') {
            const successDiv = document.querySelector('[data-success]');
            success.showSuccess('Evento cadastrado com sucesso!', successDiv);
        }

        if (show === 'success-update') {
            const successDiv = document.querySelector('[data-success]');
            success.showSuccess('Evento atualizado com sucesso!', successDiv);
        }
    });
};

(async () => {
    await successMessage();
})();
