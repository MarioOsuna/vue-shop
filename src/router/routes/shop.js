export default [
      {
        path: '/tienda/productos/',
        name: 'tienda-productos',
        component: () => import('@/views/tienda/tienda-productos/TiendaProductos.vue'),
        meta: {
          pageTitle: 'Productos',
          breadcrumb: [
            {
              text: 'Productos',
              active: true
            }
          ]
        }
      },
      {
        path: '/tienda/productos/editar/:referencia',
        name: 'tienda-productos-editar',
        component: () => import('@/views/tienda/tienda-productos/TiendaProductosActualizar.vue'),
        meta: {
          pageTitle: 'Actualizar Productos',
          breadcrumb: [
            {
              text: 'Productos',
              to: {name: 'tienda-productos'}
            },
            {
              text: 'Actualizar Productos',
              active: true
            }
          ]
        }
      }
]