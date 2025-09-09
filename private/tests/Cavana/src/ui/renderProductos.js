export function renderProductos(productos) {
  const contenedor = document.getElementById('productos-container');
  contenedor.innerHTML = '';

  productos.forEach((producto, index) => {
    const card = document.createElement('div');
    card.className = 'producto';
    card.style.animationDelay = `${0.1 * (index + 1)}s`;
    card.innerHTML = `
      <span class="etiqueta-tipo">${producto.tipo.charAt(0).toUpperCase() + producto.tipo.slice(1)}</span>
      <div class="producto-inner">
        <div class="imagen-container">
          <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <h3>${producto.nombre}</h3>
        <p class="precio">$${producto.precio}</p>
      </div>
    `;
    contenedor.appendChild(card);
  });
}