import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  timerFace: document.querySelector('#datetime-picker'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  timer.start();
});

const timer = {
  start() {
    let intervalId = setInterval(() => {
      const futureDate = new Date(refs.timerFace.value);
      const currentTime = Date.now();
      const deltaTime = futureDate - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      if (deltaTime >= 0) {
        showTimer({ days, hours, minutes, seconds });
      } else {
        Notiflix.Notify.success('The time is up!!!');
        clearInterval(intervalId);
      }
    }, 1000);
  },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.timerFace, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
function showTimer({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = days;
  refs.dataHours.textContent = hours;
  refs.dataMinutes.textContent = minutes;
  refs.dataSeconds.textContent = seconds;
}
