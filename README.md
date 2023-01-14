# modal_nikweel
Javascript modal plugin

## Getting started

```html
<script src="modal_nikweel.js"></script>
```

```html
<div id="button">click me!</div>
```

```javascript
let data = `<div>Hello modal</div>`;

button.onclick = function () {

    new Nikweel_modal({
        modal_overlay_classList: ["MyBody"], //class overlay (text)
        modal_overlay_color: '', //color bg overlay (css text)
        modal_overlay_zindex: -999999, //z-index overlay (number)
        modal_overlay_click_exit: true, //close when clicking on the (false/true)
        modal_window_wrapper_classList: ["MyWindow"], //class window (text)
        modal_window_wrapper_drag: false, //drag (false/true)
        modal_window_wrapper_close_button: true, //add close button (false/true)
        modal_window_wrapper_close_time: false, //time closing (false/number)
        modal_load_spiner: true, //preloader (false/true)
        init: async function ($modal_body) {
            $modal_body.innerHTML = data;
        },
        destroy: function () { }
    })

};
```
