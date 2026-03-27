document.addEventListener('DOMContentLoaded', () => {
  const typed = document.querySelector('.home-hero-typed');
  const hero = document.querySelector('.home-hero');

  if (!typed) return;

  const fullText = typed.dataset.text || '';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    typed.textContent = fullText;
    typed.classList.add('is-complete');
    return;
  }

  typed.textContent = '';

  let index = 0;
  let restartTimeoutId;
  let heroIsVisible = true;

  const scheduleRestart = () => {
    window.clearTimeout(restartTimeoutId);
    restartTimeoutId = window.setTimeout(() => {
      if (!heroIsVisible) {
        scheduleRestart();
        return;
      }

      typed.textContent = '';
      typed.classList.remove('is-complete');
      index = 0;
      typeNext();
    }, 12000);
  };

  const typeNext = () => {
    if (index < fullText.length) {
      typed.textContent += fullText.charAt(index);
      index += 1;
      const delay = fullText.charAt(index - 1) === ',' ? 170 : 58;
      window.setTimeout(typeNext, delay);
      return;
    }

    typed.classList.add('is-complete');
    scheduleRestart();
  };

  if (hero && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      heroIsVisible = entries.some((entry) => entry.isIntersecting);
    }, {
      threshold: 0.35
    });

    observer.observe(hero);
  }

  window.setTimeout(typeNext, 250);
});
