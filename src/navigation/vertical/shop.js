export default [
    {
        header: 'Tienda'
    },
    {
        title: 'Basic Clothin Project',
        icon: 'ShoppingCartIcon',
        children: [
          {
            title: 'Productos',
            route: 'tienda-productos',
          },
          {
            title: 'Categorias',
            route: 'tienda-categorias'
          },
          {
            title: 'ProductosBD',
            children: [
              {
                title: 'Crear',
                route: 'tienda-productosBD-crear'
              },
              {
                title: 'Consultar',
                route: 'tienda-productosBD-consultar'
              },
              {
                title: 'Actualizar',
                route: 'tienda-productosBD-actualizar'
              },
              {
                title: 'Eliminar',
                route: 'tienda-productosBD-eliminar'
              }

            ]
          }
        ],
      }
]