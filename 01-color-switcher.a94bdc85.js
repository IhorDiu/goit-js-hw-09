!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,e.addEventListener("click",d),a=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)}));var a=null;function d(){clearInterval(a),t.disabled=!1,e.disabled=!0}e.disabled=!0}();
//# sourceMappingURL=01-color-switcher.a94bdc85.js.map