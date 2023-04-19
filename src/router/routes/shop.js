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
        path: '/tienda/productosBD/crear',
        name: 'tienda-productosBD-crear',
        component: () => import('@/views/tienda/tienda-productos/TiendaProductosCrear.vue'),
        meta: {
          pageTitle: 'Crear Productos',
          breadcrumb: [
            {
              text: 'Basic Clothing Project'
            },
            {
              text: 'Crear Productos',
              active: true
            }
          ]
        }
      },
      {
        path: '/tienda/productosBD/consultar',
        name: 'tienda-productosBD-consultar',
        component: () => import('@/views/tienda/tienda-productos/TiendaProductosConsultar.vue'),
        meta: {
          pageTitle: 'Consultar Productos',
          breadcrumb: [
            {
              text: 'Basic Clothing Project'
            },
            {
              text: 'Consultar Productos',
              active: true
            }
          ]
        }
      },
      {
        path: '/tienda/productosBD/actualizar',
        name: 'tienda-productosBD-actualizar',
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
      },
      {
        path: '/tienda/productosBD/eliminar',
        name: 'tienda-productosBD-eliminar',
        component: () => import('@/views/tienda/tienda-productos/TiendaProductosEliminar.vue'),
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