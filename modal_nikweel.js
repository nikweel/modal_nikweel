class NikweelModal {
    constructor(params = {}) {
        this.defaultParams = {
            modalOverlayClassList: [],
            modalOverlayColor: '#ffffff9c',
            modalOverlayZIndex: 999999,
            modalOverlayClickExit: false,
            modalWindowWrapperClassList: [],
            modalWindowWrapperDrag: false,
            modalWindowWrapperCloseButton: true,
            modalWindowWrapperCloseTime: false,
            modalLoadSpinner: false,
            modalWindowMaxWidth: '50%',
            modalWindowMaxHeight: '50%',
            init: () => {},
            destroy: () => {}
        };

        this.params = { ...this.defaultParams, ...params };
        this.nameModalModule = 'nikweel_modal';
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.initialX = 0;
        this.initialY = 0;

        this.init();
    }

    init() {
        this.createStyles();
        this.createModal();
        this.bindEvents();
        this.loadContent();
    }

    createStyles() {
        if (document.getElementById(`${this.nameModalModule}_style`)) return;

        const css = `
            .${this.nameModalModule} {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: ${this.params.modalOverlayZIndex};
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: ${this.params.modalOverlayColor};
                backdrop-filter: blur(2px);
                animation: fadeIn 0.3s ease;
            }

            .${this.nameModalModule}.closing {
                animation: fadeOut 0.3s ease forwards;
            }

            .${this.nameModalModule} .modal_window_wrapper {
                display: flex;
                flex-direction: column;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                min-width: 200px;
                min-height: 100px;
                max-width: ${this.params.modalWindowMaxWidth};
                max-height: ${this.params.modalWindowMaxHeight};
                border: 1px solid #d3d6d7;
                border-radius: 8px;
                background: #fff;
                position: relative; /* Изменено с absolute на relative */
                overflow: hidden;
                animation: scaleIn 0.3s ease;
                transform-origin: center;
                margin: auto; /* Центрирование по умолчанию */
            }

            .${this.nameModalModule}.closing .modal_window_wrapper {
                animation: scaleOut 0.3s ease forwards;
            }

            .${this.nameModalModule} .modal_window_wrapper.draggable {
                cursor: grab;
                user-select: none;
            }

            .${this.nameModalModule} .modal_window_wrapper.draggable:active {
                cursor: grabbing;
            }

            .${this.nameModalModule} .modal_window_header {
                padding: 15px 20px;
                background: #f8f9fa;
                border-bottom: 1px solid #e9ecef;
                cursor: move;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .${this.nameModalModule} .modal_window_content {
                flex: 1;
                padding: 20px;
                overflow: auto;
                max-height: calc(100% - 60px);
            }

            .${this.nameModalModule} .modal_close {
                width: 30px;
                height: 30px;
                border: none;
                background: transparent;
                cursor: pointer;
                position: relative;
                border-radius: 50%;
                transition: background-color 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .${this.nameModalModule} .modal_close:hover {
                background: #e9ecef;
            }

            .${this.nameModalModule} .modal_close::before,
            .${this.nameModalModule} .modal_close::after {
                content: '';
                position: absolute;
                width: 14px;
                height: 2px;
                background: #6c757d;
                border-radius: 1px;
            }

            .${this.nameModalModule} .modal_close::before {
                transform: rotate(45deg);
            }

            .${this.nameModalModule} .modal_close::after {
                transform: rotate(-45deg);
            }

            .${this.nameModalModule} .spinner_loader {
                width: 40px;
                height: 40px;
                border: 3px solid #f3f3f3;
                border-top: 3px solid #158fd2;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 20px auto;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }

            @keyframes scaleIn {
                from { 
                    opacity: 0;
                    transform: scale(0.8);
                }
                to { 
                    opacity: 1;
                    transform: scale(1);
                }
            }

            @keyframes scaleOut {
                from { 
                    opacity: 1;
                    transform: scale(1);
                }
                to { 
                    opacity: 0;
                    transform: scale(0.8);
                }
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            @media (max-width: 768px) {
                .${this.nameModalModule} .modal_window_wrapper {
                    max-width: 90%;
                    max-height: 80%;
                    margin: 20px;
                    position: relative !important; /* Принудительно relative на мобильных */
                    left: auto !important;
                    top: auto !important;
                }
                
                /* Отключаем перетаскивание на мобильных устройствах */
                .${this.nameModalModule} .modal_window_wrapper.draggable {
                    cursor: default;
                }
                
                .${this.nameModalModule} .modal_window_header {
                    cursor: default;
                }
            }
        `;

        const style = document.createElement('style');
        style.id = `${this.nameModalModule}_style`;
        style.textContent = css;
        document.head.appendChild(style);
    }

    createModal() {
        // Создание overlay
        this.modalOverlay = document.createElement('div');
        this.modalOverlay.className = this.nameModalModule;
        
        // Добавление кастомных классов
        this.params.modalOverlayClassList.forEach(className => {
            this.modalOverlay.classList.add(className);
        });

        // Создание окна
        this.modalWindow = document.createElement('div');
        this.modalWindow.className = 'modal_window_wrapper';
        
        if (this.params.modalWindowWrapperDrag) {
            this.modalWindow.classList.add('draggable');
        }

        // Добавление кастомных классов для окна
        this.params.modalWindowWrapperClassList.forEach(className => {
            this.modalWindow.classList.add(className);
        });

        // Создание контентной области
        this.modalContent = document.createElement('div');
        this.modalContent.className = 'modal_window_content';

        if (this.params.modalLoadSpinner) {
            this.modalContent.innerHTML = '<div class="spinner_loader"></div>';
        }

        // Сборка структуры
        if (this.params.modalWindowWrapperDrag || this.params.modalWindowWrapperCloseButton) {
            const header = document.createElement('div');
            header.className = 'modal_window_header';
            
            if (this.params.modalWindowWrapperCloseButton) {
                this.closeButton = document.createElement('button');
                this.closeButton.className = 'modal_close';
                this.closeButton.setAttribute('aria-label', 'Close modal');
                header.appendChild(this.closeButton);
            } else {
                // Заглушка для выравнивания
                const spacer = document.createElement('div');
                spacer.style.width = '30px';
                header.appendChild(spacer);
            }
            
            this.modalWindow.appendChild(header);
        }

        this.modalWindow.appendChild(this.modalContent);
        this.modalOverlay.appendChild(this.modalWindow);
        document.body.appendChild(this.modalOverlay);

        // Блокировка прокрутки body
        document.body.style.overflow = 'hidden';
    }

    bindEvents() {
        // Закрытие по клику на overlay
        if (this.params.modalOverlayClickExit) {
            this.modalOverlay.addEventListener('click', (e) => {
                if (e.target === this.modalOverlay) {
                    this.close();
                }
            });
        }

        // Закрытие по кнопке
        if (this.params.modalWindowWrapperCloseButton && this.closeButton) {
            this.closeButton.addEventListener('click', () => this.close());
        }

        // Закрытие по Escape
        this.escapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        };
        document.addEventListener('keydown', this.escapeHandler);

        // Перетаскивание
        if (this.params.modalWindowWrapperDrag) {
            this.setupDragAndDrop();
        }

        // Автозакрытие по таймеру
        if (this.params.modalWindowWrapperCloseTime) {
            this.closeTimeout = setTimeout(() => {
                this.close();
            }, this.params.modalWindowWrapperCloseTime * 1000);
        }
    }

    setupDragAndDrop() {
        const header = this.modalWindow.querySelector('.modal_window_header');
        
        header.addEventListener('mousedown', (e) => {
            if (e.target.closest('.modal_close')) return;
            
            this.isDragging = true;
            this.dragStartX = e.clientX;
            this.dragStartY = e.clientY;
            
            // Получаем текущие позиции окна
            const rect = this.modalWindow.getBoundingClientRect();
            this.initialX = rect.left;
            this.initialY = rect.top;
            
            // Сохраняем исходные стили позиционирования
            this.originalPosition = window.getComputedStyle(this.modalWindow).position;
            this.originalLeft = window.getComputedStyle(this.modalWindow).left;
            this.originalTop = window.getComputedStyle(this.modalWindow).top;
            this.originalTransform = window.getComputedStyle(this.modalWindow).transform;
            
            // Устанавливаем абсолютное позиционирование относительно окна просмотра
            this.modalWindow.style.position = 'fixed';
            this.modalWindow.style.left = `${this.initialX}px`;
            this.modalWindow.style.top = `${this.initialY}px`;
            this.modalWindow.style.margin = '0';
            this.modalWindow.style.transform = 'none';
            this.modalWindow.style.transition = 'none';
            
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        });
    }

    onMouseMove = (e) => {
        if (!this.isDragging) return;
        
        const deltaX = e.clientX - this.dragStartX;
        const deltaY = e.clientY - this.dragStartY;
        
        // Ограничиваем перемещение в пределах видимой области
        const newX = this.initialX + deltaX;
        const newY = this.initialY + deltaY;
        
        // Получаем размеры окна и viewport
        const modalRect = this.modalWindow.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Ограничиваем позиционирование, чтобы окно не выходило за пределы экрана
        const boundedX = Math.max(10, Math.min(newX, viewportWidth - modalRect.width - 10));
        const boundedY = Math.max(10, Math.min(newY, viewportHeight - modalRect.height - 10));
        
        this.modalWindow.style.left = `${boundedX}px`;
        this.modalWindow.style.top = `${boundedY}px`;
    }

    onMouseUp = () => {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.modalWindow.style.transition = '';
        
        // Восстанавливаем оригинальные стили, кроме позиции
        // Оставляем фиксированное позиционирование для сохранения позиции
        this.modalWindow.style.margin = '';
        this.modalWindow.style.transform = '';
        
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    async loadContent() {
        try {
            await this.params.init(this.modalContent);
        } catch (error) {
            console.error('Error loading modal content:', error);
            this.modalContent.innerHTML = '<div style="color: #dc3545; text-align: center; padding: 20px;">Error loading content</div>';
        }
    }

    close() {
        if (this.isClosing) return;
        this.isClosing = true;

        // Анимация закрытия
        this.modalOverlay.classList.add('closing');
        
        setTimeout(() => {
            this.destroy();
        }, 300);
    }

    destroy() {
        // Удаление обработчиков
        document.removeEventListener('keydown', this.escapeHandler);
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        
        if (this.closeTimeout) {
            clearTimeout(this.closeTimeout);
        }

        // Удаление элементов
        if (this.modalOverlay && this.modalOverlay.parentNode) {
            this.modalOverlay.parentNode.removeChild(this.modalOverlay);
        }

        // Восстановление прокрутки
        document.body.style.overflow = '';

        // Вызов пользовательского destroy
        this.params.destroy();
    }
}

// Альяс для обратной совместимости
class Nikweel_modal extends NikweelModal {}