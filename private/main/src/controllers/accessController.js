const token = sessionStorage.getItem('accessToken');

// Si no hay token válido en sessionStorage, redirige al inicio
if (!token) {
  window.location.href = '/index.html?access=private';
}
