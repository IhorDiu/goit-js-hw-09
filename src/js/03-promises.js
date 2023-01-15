import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  };

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  let inputDelay = Number(refs.delay.value);
  let inputStep = Number(refs.step.value);
  let inputAmount = Number(refs.amount.value);

  for (let i = 0; i < inputAmount; i += 1) {
    createPromise(i + 1, inputDelay + inputStep * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      })
      .finally(() => {
        refs.form.reset()
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
