export default [
    {
        path: '/tienda/productos',
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
        path: '/tienda/categorias',
        name: 'tienda-categorias',
        component: () => import('@/views/tienda/tienda-productos/TiendaCategorias.vue'),
        meta: {
          pageTitle: 'Categorias',
          breadcrumb: [
            {
              text: 'Basic Clothing Project'
            },
            {
              text: 'Categorias',
              active: true
            }
          ]
        }
      },
      {
        path: '/tienda/categorias/productos/:name',
        name: 'tienda-categorias-productos',
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
        path: '/tienda/productosBD',
        name: 'tienda-productosBD',
        component: () => import('@/views/tienda/tienda-productos/TiendaProductosBD.vue'),
        meta: {
          pageTitle: 'ProductosBD',
          breadcrumb: [
            {
              text: 'Basic Clothing Project'
            },
            {
              text: 'ProductosBD',
              active: true
            }
          ]
        }
      }
]