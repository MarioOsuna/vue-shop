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
            route: 'tienda-productosBD'
          }
        ],
      }
]