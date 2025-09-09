import { getFiltrosActivos } from '../logic/getFiltrosActivos.js';
import { filtrarProductos } from '../logic/filtrarProductos.js';
import { renderProductos } from '../ui/renderProductos.js';
import { actualizarBusqueda } from '../ui/actualizarBusqueda.js';

export function setupBusqueda(productos) {
  const input = document.getElementById('busqueda');
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const valor = input.value.trim();
      const filtros = getFiltrosActivos();
      const filtrados = filtrarProductos(productos, { ...filtros, busqueda: valor.toLowerCase() });
      renderProductos(filtrados);
      actualizarBusqueda(valor);
    }
  });
}