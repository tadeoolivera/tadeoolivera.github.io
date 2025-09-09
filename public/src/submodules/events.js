import {
  revealItems, preferReduced,
  form, response,
  consolePre, copyBtn,
  imgs
} from './data.js';

import {
  showReveal, updateFormUI,
  clearConsole, updateConsoleText,
  setCopyFeedback
} from './ui.js';

import {
  observeReveal, handleFormSubmit,
  animateConsole, copyText
} from './logic.js';

export function initReveal() {
  if (!preferReduced && 'IntersectionObserver' in window) {
    observeReveal(revealItems, showReveal);
  } else {
    revealItems.forEach(showReveal);
  }
}

export function initForm() {
  if (!form || !response) return;
  const btn = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', e => handleFormSubmit(e, btn, response, updateFormUI));
}

export function initConsole() {
  if (!consolePre || preferReduced) return;
  const full = consolePre.getAttribute('data-text') || consolePre.innerText;
  clearConsole(consolePre);
  animateConsole(consolePre, full, updateConsoleText);
}

export function initCopy() {
  if (!copyBtn || !consolePre) return;
  const text = consolePre.getAttribute('data-text') || consolePre.innerText;
  copyBtn.addEventListener('click', () => copyText(text, copyBtn, setCopyFeedback));
}

export function initLazyLoad() {
  imgs.forEach(img => img.loading = 'lazy');
}
