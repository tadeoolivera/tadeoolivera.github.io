
document.addEventListener('DOMContentLoaded', () => {
  const revealItems = document.querySelectorAll('.reveal-section');
  const preferReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!preferReduced && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(el => obs.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('in-view'));
  }

  const form = document.getElementById('contactForm');
  const response = document.getElementById('formResponse');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    setTimeout(() => {
      btn.textContent = 'Enviar';
      btn.disabled = false;
      response.textContent = 'Gracias por tu mensaje — te responderé pronto.';
      response.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400 });
      form.reset();
    }, 900);
  });

  const consolePre = document.getElementById('consoleText');
  if (consolePre) {
    const full = consolePre.getAttribute('data-text') || consolePre.innerText;
    if (!preferReduced) {
      consolePre.innerText = '';
      let i = 0;
      const speed = 18;
      function typeChunk() {
        const chunkSize = 6;
        const next = full.slice(i, i + chunkSize);
        consolePre.innerText += next;
        i += chunkSize;
        if (i < full.length) {
          requestAnimationFrame(() => setTimeout(typeChunk, speed));
        }
      }
      if ('IntersectionObserver' in window) {
        const cObs = new IntersectionObserver(entries => {
          entries.forEach(en => {
            if (en.isIntersecting) {
              cObs.disconnect();
              typeChunk();
            }
          });
        }, {threshold: 0.3});
        cObs.observe(consolePre);
      } else {
        typeChunk();
      }
    }
  }

  const copyBtn = document.querySelector('.btn-copy');
  if (copyBtn && consolePre) {
    copyBtn.addEventListener('click', async () => {
      const text = consolePre.getAttribute('data-text') || consolePre.innerText;
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = '✅';
        setTimeout(() => (copyBtn.textContent = '📋'), 900);
      } catch (err) {
        const range = document.createRange();
        range.selectNodeContents(consolePre);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        try {
          document.execCommand('copy');
          copyBtn.textContent = '✅';
          setTimeout(() => (copyBtn.textContent = '📋'), 900);
        } catch (e) {
          copyBtn.textContent = '❌';
          setTimeout(() => (copyBtn.textContent = '📋'), 900);
        } finally {
          sel.removeAllRanges();
        }
      }
    });
  }

  const imgs = document.querySelectorAll('img');
  imgs.forEach(img => img.loading = 'lazy');
});
