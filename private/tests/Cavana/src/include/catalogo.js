/*
  Módulo principal de inicialización de la interfaz de catálogo de productos.

  Este módulo importa y coordina los submódulos encargados de:
  - Cargar los datos de productos desde un archivo JSON.
  - Aplicar filtros dinámicos por tipo, color, precio y búsqueda textual.
  - Renderizar los productos filtrados en pantalla.
  - Actualizar el texto de búsqueda visible.
  - Configurar eventos de interacción búsqueda y selección de filtros.
  - Manejar la animación de scroll para el logo.
*/

// Carga los datos desde productos.json
import { cargarProductos } from '../data/cargarProductos.js';

// Obtiene los filtros seleccionados por el usuario
import { getFiltrosActivos } from '../logic/getFiltrosActivos.js';

// Aplica la lógica de filtrado sobre el conjunto de productos
import { filtrarProductos } from '../logic/filtrarProductos.js';

// Renderiza los productos en el contenedor visual
import { renderProductos } from '../ui/renderProductos.js';

// Actualiza el texto que muestra el término de búsqueda
import { actualizarBusqueda } from '../ui/actualizarBusqueda.js';

// Aplica la animación de reducción del logo al hacer scroll
import { scrollLogo } from '../ui/scrollLogo.js';

// Configura el evento de búsqueda al presionar Enter
import { setupBusqueda } from '../events/setupBusqueda.js';

// Configura los eventos de cambio en los filtros (checkboxes)
import { setupFiltros } from '../events/setupFiltros.js';

/*
  Función principal que se ejecuta al cargar el DOM.

  Inicializa la animación del logo, carga los productos,
  aplica los filtros iniciales (incluyendo búsqueda por URL),
  renderiza los resultados y configura los eventos de interacción.
*/
document.addEventListener('DOMContentLoaded', async () => {
  scrollLogo(); // Activar animación del logo al hacer scroll

  const productos = await cargarProductos(); // Obtener productos desde JSON

  const params = new URLSearchParams(window.location.search);
  const busquedaOriginal = params.get('busqueda') || ''; // Leer búsqueda desde la URL si existe

  const filtrosIniciales = getFiltrosActivos(); // Obtener filtros seleccionados al cargar

  const productosFiltrados = busquedaOriginal
    ? filtrarProductos(productos, { ...filtrosIniciales, busqueda: busquedaOriginal.toLowerCase() })
    : filtrarProductos(productos, filtrosIniciales); // Aplicar filtrado inicial

  renderProductos(productosFiltrados); // Mostrar productos en pantalla

  actualizarBusqueda(busquedaOriginal); // Mostrar texto de búsqueda si corresponde

  setupBusqueda(productos); // Activar evento de búsqueda por Enter

  setupFiltros(productos); // Activar eventos de cambio en filtros
});
