export function getFiltrosActivos() {
  const tipo = Array.from(document.querySelectorAll('#filtros-tipo input:checked')).map(el => el.value);
  const color = Array.from(document.querySelectorAll('#filtros-color input:checked')).map(el => el.value);
  const precio = Array.from(document.querySelectorAll('#filtros-precio input:checked')).map(el => el.value);
  const busqueda = document.getElementById('busqueda').value.toLowerCase();

  return { tipo, color, precio, busqueda };
}