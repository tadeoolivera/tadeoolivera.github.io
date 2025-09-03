/*
  Módulo principal de inicialización de la interfaz pública.

  Este módulo importa y coordina los submódulos encargados de:
  - Mostrar el modal de contraseña solo cuando se intenta acceder a contenido privado.
  - Aplicar animaciones de entrada progresiva a secciones visibles.
  - Configurar el envío del formulario de contacto con respuesta animada.
  - Simular la escritura progresiva en la consola de ejemplo.
  - Activar el botón de copia para la salida de consola.
  - Habilitar la carga diferida de imágenes para mejorar el rendimiento.
*/

// Muestra el modal de contraseña y redirige si la validación es correcta
import { requestAccess } from '../submodules/access.js';

// Aplica animaciones de entrada a las secciones con clase .reveal-section
import { initReveal } from '../submodules/events.js';

// Configura el envío del formulario de contacto y muestra respuesta animada
import { initForm } from '../submodules/events.js';

// Simula la escritura progresiva en el bloque de consola de ejemplo
import { initConsole } from '../submodules/events.js';

// Activa el botón de copia para copiar el contenido de la consola
import { initCopy } from '../submodules/events.js';

// Habilita la carga diferida de imágenes para mejorar el rendimiento
import { initLazyLoad } from '../submodules/events.js';

/*
  Función principal que se ejecuta al cargar el DOM.

  Si el usuario intenta acceder directamente a /private/...,
  se lo redirige a la página principal y se le solicita la contraseña.
  Si hace clic en el candado, se le solicita la contraseña desde allí.
*/
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;

  if (currentPath.includes('/private/')) {
    window.location.href = '/index.html?access=private';
    return;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('access') === 'private') {
    requestAccess('/private/index.html'); // Mostrar modal y redirigir si es correcto
  }

  initReveal(); // Animaciones de entrada para secciones
  initForm(); // Configurar envío del formulario de contacto
  initConsole(); // Simular escritura en consola
  initCopy(); // Activar botón de copia de consola
  initLazyLoad(); // Aplicar carga diferida a imágenes
});
