# modal_nikweel

[English](#english) | [Русский](#russians)

---

## <a name="english"></a>English

`modal_nikweel` — is a simple and flexible JavaScript plugin for creating modal windows with support for customization, dragging, animations, and other useful features.

## Installation

Include the script in your HTML file:

```html
<script src="modal_nikweel.js"></script>
```

## Usage Example

Add an element that will open the modal window:

```html
<div id="button">Click me!</div>
```

Initialize the modal window using JavaScript:

```javascript
let data = `<div>Hello modal</div>`;

document.getElementById('button').onclick = function () {
    new NikweelModal({
        modalOverlayClassList: ["MyBody"], // Classes for the overlay
        modalOverlayColor: 'rgba(0, 0, 0, 0.5)', // Overlay background color
        modalOverlayZIndex: 999999, // z-index for the overlay
        modalOverlayClickExit: true, // Close on overlay click
        modalWindowWrapperClassList: ["MyWindow"], // Classes for the window
        modalWindowWrapperDrag: true, // Enable window dragging
        modalWindowWrapperCloseButton: true, // Show close button
        modalWindowWrapperCloseTime: false, // Auto-close after a specified time (in seconds)
        modalLoadSpinner: true, // Show loading indicator
        modalWindowMaxWidth: '500px', // Maximum window width
        modalWindowMaxHeight: '400px', // Maximum window height
        init: async function ($modalBody) {
            // Initialize modal content
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
            $modalBody.innerHTML = data;
        },
        destroy: function () {
            console.log('Modal window closed');
        }
    });
};
```

## Параметры

Parameter	Type	Description
modalOverlayClassList	Array	List of classes for the overlay.
modalOverlayColor	String	Overlay background color (e.g., 'rgba(0, 0, 0, 0.5)').
modalOverlayZIndex	Number	z-index for the overlay.
modalOverlayClickExit	Boolean	Close the modal on overlay click.
modalWindowWrapperClassList	Array	List of classes for the modal window.
modalWindowWrapperDrag	Boolean	Enable window dragging.
modalWindowWrapperCloseButton	Boolean	Add a close button.
modalWindowWrapperCloseTime	Number	Auto-close after a specified time (in seconds).
modalLoadSpinner	Boolean	Show loading indicator.
modalWindowMaxWidth	String	Maximum window width (e.g., '500px').
modalWindowMaxHeight	String	Maximum window height (e.g., '400px').
init	Function	Function for initializing the modal content.
destroy	Function	Function called when the modal is closed.

| Parameter                       | Тип          | Description                                                               |
|---------------------------------|--------------|--------------------------------------------------------------------------|
| `modalOverlayClassList`         | `Array`      | List of classes for the overlay.                                         |
| `modalOverlayColor`             | `String`     | Overlay background color (e.g., 'rgba(0, 0, 0, 0.5)').                   |
| `modalOverlayZIndex`            | `Number`     | z-index for the overlay.                                                 |
| `modalOverlayClickExit`         | `Boolean`    | Close the modal on overlay click.                                        |
| `modalWindowWrapperClassList`   | `Array`      | List of classes for the modal window.                                    |
| `modalWindowWrapperDrag`        | `Boolean`    | Enable window dragging.                                                  |
| `modalWindowWrapperCloseButton` | `Boolean`    | Add a close button.                                                      |
| `modalWindowWrapperCloseTime`   | `Number`     | Auto-close after a specified time (in seconds).                          |
| `modalLoadSpinner`              | `Boolean`    | Show loading indicator.                                                  |
| `modalWindowMaxWidth`           | `String`     | Maximum window width (e.g., '500px').                                    |
| `modalWindowMaxHeight`          | `String`     | Maximum window height (e.g., '400px').                                   |
| `init`                          | `Function`   | Function for initializing the modal content.                             |
| `destroy`                       | `Function`   | Function called when the modal is closed.                                |

## Example with Nested Modals

You can open modal windows inside other modal windows:

## License

This project is licensed under the MIT License.

## <a name="russians"></a>Русский

`modal_nikweel` — это простой и гибкий JavaScript-плагин для создания модальных окон с поддержкой кастомизации, перетаскивания, анимаций и других полезных функций.

## Установка

Подключите скрипт в ваш HTML-файл:

```html
<script src="modal_nikweel.js"></script>
```

## Пример использования

Добавьте элемент, который будет открывать модальное окно:

```html
<div id="button">Click me!</div>
```

Инициализируйте модальное окно с помощью JavaScript:

```javascript
let data = `<div>Hello modal</div>`;

document.getElementById('button').onclick = function () {
    new NikweelModal({
        modalOverlayClassList: ["MyBody"], // Классы для overlay
        modalOverlayColor: 'rgba(0, 0, 0, 0.5)', // Цвет фона overlay
        modalOverlayZIndex: 999999, // z-index для overlay
        modalOverlayClickExit: true, // Закрытие при клике на overlay
        modalWindowWrapperClassList: ["MyWindow"], // Классы для окна
        modalWindowWrapperDrag: true, // Возможность перетаскивания окна
        modalWindowWrapperCloseButton: true, // Кнопка закрытия
        modalWindowWrapperCloseTime: false, // Автозакрытие через указанное время (в секундах)
        modalLoadSpinner: true, // Показать индикатор загрузки
        modalWindowMaxWidth: '500px', // Максимальная ширина окна
        modalWindowMaxHeight: '400px', // Максимальная высота окна
        init: async function ($modalBody) {
            // Инициализация контента модального окна
            await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация загрузки
            $modalBody.innerHTML = data;
        },
        destroy: function () {
            console.log('Модальное окно закрыто');
        }
    });
};
```

## Параметры

| Параметр                        | Тип          | Описание                                                                 |
|---------------------------------|--------------|--------------------------------------------------------------------------|
| `modalOverlayClassList`         | `Array`      | Список классов для overlay.                                              |
| `modalOverlayColor`             | `String`     | Цвет фона overlay (например, `'rgba(0, 0, 0, 0.5)'`).                    |
| `modalOverlayZIndex`            | `Number`     | z-index для overlay.                                                     |
| `modalOverlayClickExit`         | `Boolean`    | Закрытие модального окна при клике на overlay.                           |
| `modalWindowWrapperClassList`   | `Array`      | Список классов для модального окна.                                      |
| `modalWindowWrapperDrag`        | `Boolean`    | Включить возможность перетаскивания окна.                                |
| `modalWindowWrapperCloseButton` | `Boolean`    | Добавить кнопку закрытия.                                                |
| `modalWindowWrapperCloseTime`   | `Number`     | Автозакрытие через указанное время (в секундах).                         |
| `modalLoadSpinner`              | `Boolean`    | Показать индикатор загрузки.                                             |
| `modalWindowMaxWidth`           | `String`     | Максимальная ширина окна (например, `'500px'`).                          |
| `modalWindowMaxHeight`          | `String`     | Максимальная высота окна (например, `'400px'`).                          |
| `init`                          | `Function`   | Функция инициализации контента модального окна.                          |
| `destroy`                       | `Function`   | Функция, вызываемая при закрытии модального окна.                        |

## Вложенные модальные окна

Вы можете открывать модальные окна внутри других модальных окон:

## Лицензия

Этот проект распространяется под лицензией MIT.
