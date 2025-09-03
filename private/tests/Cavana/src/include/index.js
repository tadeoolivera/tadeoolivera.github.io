/*
  Módulo principal de inicialización de la interfaz del inicio.

  Este módulo importa y coordina los submódulos encargados de:
  - Manejar animaciones y efectos visuales como scroll y hovers.
*/

// Aplica la animación de reducción del logo al hacer scroll
import { scrollLogo } from '../ui/scrollLogo.js';

// Resalta con color en el menú la sección de la página en la que se encuentra el usuario
import { toggleMenu } from '../ui/toggleMenu.js';

/*
  Función principal que se ejecuta al cargar el DOM.

  Inicializa la animación del logo al scrollear y el resaltamiento
  de color dependiendo la sección de la página en la que se 
  encuentre el usuario.
*/
document.addEventListener('DOMContentLoaded', async () => {
  scrollLogo(); // Activar animación del logo al hacer scroll

  toggleMenu(); // Activar resaltamiento de color por secciones
});


