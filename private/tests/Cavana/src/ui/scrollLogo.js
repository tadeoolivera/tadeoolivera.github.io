export function scrollLogo() {
  window.addEventListener('scroll', () => {
    const logo = document.querySelector('.logo-scroll');
    logo.classList.toggle('shrink', window.scrollY > 50);
  });
}