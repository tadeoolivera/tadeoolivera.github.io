export function actualizarBusqueda(texto) {
  const resultado = document.getElementById('resultado-busqueda');
  resultado.textContent = texto ? `Resultados para: "${texto}"` : '';
}