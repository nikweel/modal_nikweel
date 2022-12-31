class Nikweel_modal {

    constructor(param) {

        this.name_modal_module = 'nikweel_modal';
        this.modal_overlay_color = '#ffffff9c'
        this.modal_overlay_zindex = 9999999;
        this.modal_window_wrapper_drag = false;
        this.modal_overlay_click_exit = false;
        this.classList_o = false;
        this.classList_w = false;
        this.modal_window_wrapper_close_time = false;
        this.modal_window_wrapper_close_button = false;
        this.modal_load_spiner = false;
        this.init = param.init;

        let modal_body,
            close_time,
            user_destroy = param.destroy,
            modal_body_window,
            destroy = function (elem) {
                elem.remove();
                user_destroy();
                window.clearTimeout(close_time);
            }


        if (param.modal_overlay_color) {
            this.modal_overlay_color = param.modal_overlay_color
        }

        if (param.modal_overlay_zindex) {
            this.modal_overlay_zindex = param.modal_overlay_zindex
        }

        if (param.modal_window_wrapper_drag) {
            this.modal_window_wrapper_drag = param.modal_window_wrapper_drag
        }

        if (param.modal_overlay_click_exit) {
            this.modal_overlay_click_exit = param.modal_overlay_click_exit
        }

        if (param.modal_window_wrapper_close_time) {
            this.modal_window_wrapper_close_time = param.modal_window_wrapper_close_time
        }

        if (param.modal_window_wrapper_close_button) {
            this.modal_window_wrapper_close_button = param.modal_window_wrapper_close_button
        }

        if (param.modal_load_spiner) {
            this.modal_load_spiner = param.modal_load_spiner
        }

        if (!document.getElementById(`${this.name_modal_module}_style`) && document.getElementsByTagName("head")[0]) {
            let css = `
            .${this.name_modal_module}{
                position: fixed;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
                z-index: ${this.modal_overlay_zindex};
                display: flex;
                background-color: ${this.modal_overlay_color};
                justify-content: center;
                align-items: center;
            }


            .${this.name_modal_module} .modal_window_wrapper{

                display: flex;
                box-shadow: rgb(0 0 0 / 20%) 0px 10px 30px;
                min-width: 200px;
                min-height: 100px;
                max-width: 50%;
                max-height: 50%;

                cursor: ${this.modal_window_wrapper_drag ? 'grab' : 'auto'};

                border: 1px solid #d3d6d7;
                position: absolute;
                box-sizing: border-box;
                border-radius: 1px;
                overflow: hidden;
                margin: 0 auto;
                padding: 44px 36px 39px;
                background-color: #fff;
                color: #3A3F4F;
                z-index: 999999;
                font-family: 'Open Sans CoMagic';
                
            }
            

            .${this.name_modal_module} .modal_window_content{
                overflow: auto;
                width: 100%;
                cursor: auto;
            }

            


            .${this.name_modal_module} .modal_close{
                background-size: cover;
                z-index: 9999999;
                background-repeat: no-repeat;
                padding: 10px;
                cursor: pointer;
                position: absolute;
                top: 0px;
                right: 0px;
                background-image: url("data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAE5QTFRFAAAAIx8gIx8gIx8gIx8gIx8gIx8gIx8gIx8gIx8gIx8gIx8gIx8gIx8gIx8gIx8gIx8gIx8gIx8gIh8fIx4hIx8gIx8gIx8gIx8g////qFhM1wAAABh0Uk5TAAAKGAMJl9prBJLX8m4B83D3+AEB1giNxISErAAAAAFiS0dEGexutYgAAAAJcEhZcwABOvYAATr2ATqxVzoAAACHSURBVDjL5ZJJDoAgDACtVAXccEP+/1KDook1tXflBJ1JupFlvzqQK4TrgaoAwouy0iYFwejKEgNUHZr2MMC0TagVETrdJ2Pnve5ojhiOxnV5VHkA5PhpOMfxZAwDy2P7bgxhdMhwUZBSSEWebeL7GNhBwURHPdNlLcKyvL2ve/U0h/Bhvn42thUKKJlqzs0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMTEtMDlUMTA6MDM6MjIrMDE6MDC3+udLAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTExLTA5VDEwOjAzOjIyKzAxOjAwxqdf9wAAAEZ0RVh0c29mdHdhcmUASW1hZ2VNYWdpY2sgNi43LjgtOSAyMDE2LTA2LTE2IFExNiBodHRwOi8vd3d3LmltYWdlbWFnaWNrLm9yZ+a/NLYAAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6aGVpZ2h0ADUxMsDQUFEAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANTEyHHwD3AAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNTQxNzU0MjAyrrLbNQAAABN0RVh0VGh1bWI6OlNpemUAOS4zNEtCQo9MI1EAAAA8dEVYdFRodW1iOjpVUkkAZmlsZTovLy4vdXBsb2Fkcy81Ni91dm5kc1MyLzE2NzQvY2xvc2VfMTExMTUyLnBuZzVJD1EAAAAASUVORK5CYII=");
            }



            .${this.name_modal_module} .preloader-3 svg {
                max-width: 25em;
                border-radius: 3px;
                background: #FFF;
                fill: none;
                stroke: #BFE2FF;
                stroke-linecap: round;
                stroke-width: 12%
            }
            .${this.name_modal_module} .spiner_loader {
                    margin: 0 auto;
                    position: absolute;
                    top: 45%;
                    left: 45%;
                    display: block;
                    width: 16px;
                    height: 16px;
                    border: solid 2px transparent;
                    border-top-color: #158fd2;
                    border-left-color: #158fd2;
                    border-radius: 100%;
                    -webkit-animation: nprogress-spinner-loader 900ms linear infinite;
                    animation: nprogress-spinner-loader 900ms linear infinite;
            }
             @keyframes preloader-3-a {
                to { 
                    stroke-dashoffset: 0px 
                } 
            }

            @-webkit-keyframes nprogress-spinner-loader{
              0%{transform:rotate(0deg)}to{transform:rotate(360deg)}}
            @keyframes nprogress-spinner-loader{0%{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  
          `;

            let head = document.getElementsByTagName("head")[0];
            let blob = new Blob([css], { type: 'text/css' });
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = window.URL.createObjectURL(blob);
            link.id = `${this.name_modal_module}_style`;
            head.appendChild(link);
        }

        if (param.modal_overlay_classList) {
            this.classList_o = param.modal_overlay_classList
        }

        if (param.modal_window_wrapper_classList) {
            this.classList_w = param.modal_window_wrapper_classList
        }

        this.modal_body = document.createElement('div');
        this.modal_body.className = this.name_modal_module;

        if (this.classList_o) {
            if (typeof (this.classList_o) == "array" || typeof (this.classList_o) == "object") {
                for (var i = 0; i < this.classList_o.length; i++) {
                    this.modal_body.classList.add(this.classList_o[i]);
                }
            } else {
                this.modal_body.classList.add(this.classList_o);
            }

        }

        this.modal_body_window = document.createElement('div');
        this.modal_body_window.className = 'modal_window_wrapper';

        if (this.classList_w) {
            if (typeof (this.classList_w) == "array" || typeof (this.classList_w) == "object") {
                for (var i = 0; i < this.classList_w.length; i++) {
                    this.modal_body_window.classList.add(this.classList_w[i]);
                }
            } else {
                this.modal_body_window.classList.add(this.classList_w);
            }

        }

        if (this.modal_window_wrapper_drag) {
            this.modal_body_window.draggable = "true";
        }

        this.modal_body.appendChild(this.modal_body_window);
        document.body.append(this.modal_body);

        if (this.modal_window_wrapper_close_button) {
            this.modal_body_close = document.createElement('span');
            this.modal_body_close.className = 'modal_close';
            this.modal_body_window.appendChild(this.modal_body_close);

            modal_body = this.modal_body;
            this.modal_body_close.addEventListener("click",
                function click(e) {
                    destroy(modal_body);
                }
            );

        }

        this.modal_window_content = document.createElement('div');
        this.modal_window_content.className = 'modal_window_content';
        this.modal_body_window.appendChild(this.modal_window_content);

        if (this.modal_load_spiner) {
            this.modal_window_content.innerHTML = `<span class="spiner_loader"></span>`;
        }

        if (this.modal_window_wrapper_drag) {

            this.startCursorX = 0;
            this.startCursorY = 0;
            this.startX = 0;
            this.startY = 0;


            function getCoords(elem) {
                return {
                    top: elem.getBoundingClientRect().top,
                    right: elem.getBoundingClientRect().right,
                    bottom: elem.getBoundingClientRect().bottom,
                    left: elem.getBoundingClientRect().left
                };
            }

            modal_body_window = this.modal_body_window;

            this.modal_body_window.addEventListener("dragstart",
                function dragstart(e) {
                    this.startCursorX = Math.round(e.pageX);
                    this.startCursorY = Math.round(e.pageY);
                    this.startX = Math.round(getCoords(e.target)['left']);
                    this.startY = Math.round(getCoords(e.target)['top']);
                }
            );

            this.modal_body_window.addEventListener("dragend",
                function dragend(e) {
                    e.target.style.position = 'absolute';
                    e.target.style.left = this.startX + (e.pageX - this.startCursorX) + 'px';
                    e.target.style.top = this.startY + (e.pageY - this.startCursorY) + 'px';
                }
            );

        }

        if (this.modal_overlay_click_exit) {
            modal_body = this.modal_body;
            this.modal_body.addEventListener("click",
                function click(e) {
                    if (e.target != modal_body) return;
                    destroy(e.target);
                }
            );
        }

        if (this.modal_window_wrapper_close_time) {
            modal_body = this.modal_body;
            close_time = setTimeout(function () { destroy(modal_body) }, this.modal_window_wrapper_close_time * 1000);
        }

        this.init(this.modal_window_content);
    }
}