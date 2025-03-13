// Обработчики для модальных окон
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем и закрываем любые открытые модальные окна при загрузке
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        if (modal.classList.contains('show')) {
            var bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            } else {
                modal.classList.remove('show');
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                var backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) {
                    backdrop.parentNode.removeChild(backdrop);
                }
            }
        }
    });

    // Устанавливаем обработчики для меню
    document.getElementById('Company').addEventListener('click', function() {
        var modal = document.getElementById('modal_Popup_Company');
        var bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    });

    document.getElementById('Services').addEventListener('click', function() {
        var modal = document.getElementById('modal_Popup_Services');
        var bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    });

    document.getElementById('Clients').addEventListener('click', function() {
        var modal = document.getElementById('modal_Popup_Clients');
        var bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    });

    document.getElementById('Markets').addEventListener('click', function() {
        var modal = document.getElementById('modal_Popup_Markets');
        var bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    });

    // Стилизуем курсоры для меню, чтобы показать что они кликабельны
    var menuItems = document.querySelectorAll('#Company, #Services, #Clients, #Markets');
    menuItems.forEach(function(item) {
        item.style.cursor = 'pointer';
    });
});
