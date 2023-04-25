export default [
      {
        path: '/tienda/productosBD/',
        name: 'tienda-productosBD',
        component: () => import('@/views/tienda/tienda-productos/TiendaProductosBD.vue'),
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
        path: '/tienda/productosBD/editar',
        name: 'tienda-productosBD-editar',
        component: () => import('@/views/tienda/tienda-productos/TiendaProductosActualizar.vue'),
        meta: {
          pageTitle: 'Actualizar Productos',
          breadcrumb: [
            {
              text: 'Basic Clothing Project'
            },
            {
              text: 'Actualizar Productos',
              active: true
            }
          ]
        }
      }
]