export function filtrarProductos(productos, filtros) {
  return productos.filter(p => {
    const coincideTipo = filtros.tipo.length ? filtros.tipo.includes(p.tipo) : true;
    const coincideColor = filtros.color.length ? filtros.color.includes(p.color) : true;
    const coincidePrecio =
      filtros.precio.includes('low') ? p.precio < 1500 :
      filtros.precio.includes('mid') ? p.precio >= 1500 && p.precio <= 2500 :
      filtros.precio.includes('high') ? p.precio > 2500 :
      filtros.precio.length === 0;

    const coincideNombre = filtros.busqueda
      ? p.nombre.toLowerCase().includes(filtros.busqueda)
      : true;

    return coincideTipo && coincideColor && coincidePrecio && coincideNombre;
  });
}