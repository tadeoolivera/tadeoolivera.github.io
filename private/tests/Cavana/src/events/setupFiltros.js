import { getFiltrosActivos } from '../logic/getFiltrosActivos.js';
import { filtrarProductos } from '../logic/filtrarProductos.js';
import { renderProductos } from '../ui/renderProductos.js';

export function setupFiltros(productos) {
  const checkboxes = document.querySelectorAll('.grupo-filtros input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const filtros = getFiltrosActivos();
      const filtrados = filtrarProductos(productos, filtros);
      renderProductos(filtrados);
    });
  });
}