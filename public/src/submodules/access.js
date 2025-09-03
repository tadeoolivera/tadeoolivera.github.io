import { storedHash } from './data.js';
import { hashPassword } from './logic.js';
import { createAccessModal } from './ui.js';
import { generateAccessToken } from './logic.js';

export function requestAccess(targetPath = '/private/index.html') {
  const modal = createAccessModal();
  const input = modal.querySelector('#accessInput');
  const btn = modal.querySelector('#accessBtn');
  const response = modal.querySelector('#accessResponse');

  const validate = async () => {
    const raw = input.value;
    const hash = await hashPassword(raw);
    if (hash === storedHash) {
      const token = generateAccessToken();
      sessionStorage.setItem('accessToken', token);
      modal.remove();
      document.body.style.overflow = '';
      window.location.href = targetPath;
    } else {
      response.textContent = 'Contraseña incorrecta.';
      response.style.color = '#dc2626';
    }
  };

  btn.addEventListener('click', validate);

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') validate();
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      modal.remove();
      document.body.style.overflow = '';
    }
  }, { once: true });
}
