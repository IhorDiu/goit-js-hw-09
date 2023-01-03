const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');


startBtn.addEventListener('click', startBgColorChange);

let intervalId = null;
stopBtn.disabled = true;

function startBgColorChange() {
    
    startBtn.disabled = true;
    stopBtn.disabled = false;
    stopBtn.addEventListener('click', stopBgColorChange);
    
    intervalId = setInterval(() => changeBgColor(), 1000);
  };

function stopBgColorChange () {
    clearInterval(intervalId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
};

function changeBgColor() {
    document.body.style.backgroundColor = getRandomHexColor();
  }

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
