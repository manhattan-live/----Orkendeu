/**
 * Функции для позиционирования модальных окон под кнопками
 * 
 * Эти функции помогают позиционировать модальные окна Bootstrap
 * прямо под кнопками, которые их вызывают, с выравниванием по центру.
 */

// Глобальный список модальных окон и их кнопок
const modalConfig = [
  { buttonId: 'Company', modalId: 'modal_Popup_Company' },
  { buttonId: 'Services', modalId: 'modal_Popup_Services' },
  { buttonId: 'Clients', modalId: 'modal_Popup_Clients' },
  { buttonId: 'Markets', modalId: 'modal_Popup_Markets' }
];

// Функция для добавления треугольника к модальному окну
function addTriangleToModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  
  const modalContent = modal.querySelector('.modal-content');
  if (!modalContent) return;
  
  // Проверяем, существует ли уже треугольник
  if (!modalContent.querySelector('.modal-triangle')) {
    const triangle = document.createElement('div');
    triangle.className = 'modal-triangle';
    modalContent.prepend(triangle);
  }
}

// Функция для позиционирования модального окна под кнопкой
function positionModalUnderButton(buttonId, modalId) {
  const button = document.getElementById(buttonId);
  const modal = document.getElementById(modalId);
  
  if (!button || !modal) return;
  
  const modalDialog = modal.querySelector('.modal-dialog');
  if (!modalDialog) return;
  
  // Получаем координаты кнопки
  const buttonRect = button.getBoundingClientRect();
  const buttonCenterX = buttonRect.left + (buttonRect.width / 2);
  const buttonBottom = buttonRect.bottom;
  
  // Получаем ширину модального окна
  const modalWidth = 437; // Фиксированная ширина из CSS
  
  // Вычисляем позицию модального окна
  let leftPosition = Math.max(10, buttonCenterX - (modalWidth / 2));
  
  // Проверяем, не выходит ли модальное окно за пределы экрана
  const viewportWidth = window.innerWidth;
  if (leftPosition + modalWidth > viewportWidth - 10) {
    leftPosition = viewportWidth - modalWidth - 10;
  }
  
  // Устанавливаем позицию
  modalDialog.style.left = `${leftPosition}px`;
  modalDialog.style.top = `${buttonBottom + 5}px`; // Добавляем 5px отступа сверху
}

// Функция для закрытия всех модальных окон
function closeAllModals() {
  modalConfig.forEach(({ modalId }) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      // Используем стандартный метод Bootstrap для закрытия
      const bsModal = bootstrap.Modal.getInstance(modal);
      if (bsModal) bsModal.hide();
      
      // Также установим класс, если Bootstrap не сработает
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  });
  
  // Удаляем потенциальные backdrops
  const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach(backdrop => backdrop.remove());
}

// Функция для открытия модального окна
function openModal(buttonId, modalId) {
  // Закрываем все открытые модальные окна
  closeAllModals();
  
  // Добавляем треугольник к модальному окну
  addTriangleToModal(modalId);
  
  // Позиционируем модальное окно
  positionModalUnderButton(buttonId, modalId);
  
  // Открываем модальное окно
  const modal = document.getElementById(modalId);
  if (!modal) return;
  
  // Показываем модальное окно
  modal.style.display = 'block';
  modal.classList.add('show');
  document.body.classList.add('modal-open');
  
  // Имитируем backdrop, если нужно
  if (!document.querySelector('.modal-backdrop')) {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    document.body.appendChild(backdrop);
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Для каждой кнопки меню и связанного модального окна
  modalConfig.forEach(({ buttonId, modalId }) => {
    // Получаем элементы
    const button = document.getElementById(buttonId);
    const modal = document.getElementById(modalId);
    
    if (!button || !modal) return;
    
    // Удаляем все существующие обработчики событий
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    
    // Добавляем новый обработчик событий
    newButton.addEventListener('click', function(event) {
      event.preventDefault();
      openModal(buttonId, modalId);
    });
    
    // Добавляем треугольник к модальному окну
    addTriangleToModal(modalId);
  });
  
  // Обработка клика вне модального окна для закрытия
  document.addEventListener('click', function(event) {
    const activeModal = document.querySelector('.modal.show');
    if (!activeModal) return;
    
    const modalDialog = activeModal.querySelector('.modal-dialog');
    if (!modalDialog) return;
    
    // Если клик вне модального окна, закрываем его
    if (!modalDialog.contains(event.target) && !modalConfig.some(({ buttonId }) => {
      const button = document.getElementById(buttonId);
      return button && button.contains(event.target);
    })) {
      closeAllModals();
    }
  });
  
  // Обработка изменения размера окна
  window.addEventListener('resize', function() {
    const activeModal = document.querySelector('.modal.show');
    if (!activeModal) return;
    
    // Находим идентификатор активного модального окна и соответствующей кнопки
    const config = modalConfig.find(({ modalId }) => modalId === activeModal.id);
    if (config) {
      positionModalUnderButton(config.buttonId, config.modalId);
    }
  });
});

// Экспортируем функции для использования в других скриптах
window.modalUtils = {
  openModal,
  closeAllModals,
  positionModalUnderButton
};
