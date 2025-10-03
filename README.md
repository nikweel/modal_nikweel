# modal_nikweel

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

## Пример с вложенными модальными окнами

Вы можете открывать модальные окна внутри других модальных окон:

```javascript
function openSecondModal() {
    new NikweelModal({
        modalOverlayClassList: ["custom-overlay"],
        modalOverlayColor: 'rgba(0, 0, 0, 0.5)',
        modalWindowWrapperDrag: true,
        init: async function ($modalBody) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            $modalBody.innerHTML = 'Это второе модальное окно!';
        },
        destroy: function () {
            console.log('Второе модальное окно закрыто');
        }
    });
}
```

## Лицензия

Этот проект распространяется под лицензией MIT.