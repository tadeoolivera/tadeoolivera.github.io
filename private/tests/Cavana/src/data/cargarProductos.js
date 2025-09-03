export async function cargarProductos() {
  try {
    const res = await fetch('data/productos.json');
    return await res.json();
  } catch (error) {
    console.error('Error al cargar productos:', error);
    return [];
  }
}