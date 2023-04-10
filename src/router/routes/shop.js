export default [
    {
        path: '/tienda/productos',
        name: 'tienda-productos',
        component: () => import('@/views/tienda/tienda-productos/TiendaProductos.vue'),
      },
      {
        path: '/tienda/categorias',
        name: 'tienda-categorias',
        component: () => import('@/views/tienda/tienda-productos/TiendaCategorias.vue')
      }
]