export function showReveal(el) {
  el.classList.add('in-view');
}

// ESTA FUNCION YA NO SE UTILIZA
export function updateFormUI(btn, response) {
  btn.textContent = 'Enviar';
  btn.disabled = false;
  response.textContent = 'Gracias por tu mensaje — te responderé pronto.';
  response.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400 });
}

export function clearConsole(el) {
  el.innerText = '';
}

export function updateConsoleText(el, text) {
  el.innerText += text;
}

export function setCopyFeedback(btn, status) {
  btn.textContent = status;
  setTimeout(() => (btn.textContent = '📋'), 900);
}

export function createAccessModal() {
  const modal = document.createElement('div');
  modal.className = 'access-modal';
  modal.innerHTML = `
    <div class="access-box">
      <span class="access-close" title="Cerrar">×</span>
      <h2>Acceso requerido</h2>
      <input type="password" id="accessInput" placeholder="Contraseña" />
      <button id="accessBtn">Entrar</button>
      <p id="accessResponse" class="access-response"></p>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  modal.querySelector('.access-close').addEventListener('click', () => {
    modal.remove();
    document.body.style.overflow = '';
  });

  return modal;
}

