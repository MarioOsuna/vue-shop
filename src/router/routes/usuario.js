export default [
    {
      path: '/users/usuarios',
      name: 'users-usuarios',
      component: () => import('@/views/usuarios/usuarios.vue'),
      meta: {
        contentClass: 'ecommerce-application',
        pageTitle: 'Usuarios',
        breadcrumb: [
          {
            text: 'Listar Usuarios',
          },
        ],
      },
    },
    {
      path: '/users/usuarios/editar/:id',
      name: 'users-usuarios-editar',
      meta:{activeItem:'users-usuarios'},
      component: () => import('@/views/usuarios/usuariosEditar.vue'),
      meta: {
        pageTitle: 'Usuarios',
        breadcrumb: [
          {
            text: 'Listar Usuarios',
          },
          {
            text: 'Información del Usuario',
            active: true,
          },
        ],
      },
    },
]