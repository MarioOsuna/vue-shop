export default [
      {
        path: '/tienda/productos/',
        name: 'tienda-productos',
        component: () => import('@/views/tienda/tienda-productos/TiendaProductos.vue'),
        meta: {
          pageTitle: 'Productos',
          breadcrumb: [
            {
              text: 'Basic Clothing Project'
            },
            {
              text: 'Productos',
              active: true
            }
          ]
        }
      },
      {
        path: '/tienda/productos/editar',
        name: 'tienda-productos-editar',
        component: () => import('@/views/tienda/tienda-productos/TiendaProductosActualizar.vue'),
        meta: {
          pageTitle: 'Actualizar Productos',
          breadcrumb: [
            {
              text: 'Basic Clothing Project',
            },
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