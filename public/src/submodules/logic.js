export function observeReveal(items, callback) {
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        callback(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => obs.observe(el));
}

export function handleFormSubmit(e, btn, response, updateUI) {
  e.preventDefault();
  btn.disabled = true;
  btn.textContent = 'Enviando...';
  setTimeout(() => {
    updateUI(btn, response);
    e.target.reset();
  }, 900);
}

export function animateConsole(el, text, updateUI) {
  let i = 0;
  const speed = 18;
  const chunkSize = 6;

  function typeChunk() {
    const next = text.slice(i, i + chunkSize);
    updateUI(el, next);
    i += chunkSize;
    if (i < text.length) {
      requestAnimationFrame(() => setTimeout(typeChunk, speed));
    }
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        obs.disconnect();
        typeChunk();
      }
    });
  }, { threshold: 0.3 });

  obs.observe(el);
}

export async function copyText(text, btn, setFeedback) {
  try {
    await navigator.clipboard.writeText(text);
    setFeedback(btn, '✅');
  } catch {
    const temp = document.createElement('textarea');
    temp.value = text;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    try {
      document.execCommand('copy');
      setFeedback(btn, '✅');
    } catch {
      setFeedback(btn, '❌');
    }
    setTimeout(() => (btn.textContent = '📋'), 900);
    document.body.removeChild(temp);
  }
}

export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function generateAccessToken() {
  return crypto.randomUUID();
}