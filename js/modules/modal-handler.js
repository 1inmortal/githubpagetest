// ============================================================
// MODAL HANDLER
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const closeModals = document.querySelectorAll('.close-modal');

    // Open modal functionality
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetModal = document.getElementById(trigger.getAttribute('data-modal'));
            if (targetModal) {
                targetModal.classList.add('active');
                document.body.classList.add('modal-open');
                if (window.playSound) window.playSound('click');
            }
        });
    });

    // Close modal functionality
    closeModals.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
                if (window.playSound) window.playSound('click');
            }
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
                if (window.playSound) window.playSound('click');
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.classList.remove('modal-open');
                if (window.playSound) window.playSound('click');
            }
        }
    });
}); 