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
    meta: { activeItem: 'users-usuarios' },
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
  {
    path: '/users/usuarios/bbbdd',
    name: 'users-usuarios-bbdd',
    meta: { activeItem: 'users-usuarios' },
    component: () => import('@/views/usuarios/usuariosBBDD.vue'),
    meta: {
      pageTitle: 'Usuarios',
      breadcrumb: [
        {
          text: 'Listar Usuarios BBDD',
        },
        {
          text: 'Información de Los Usuarios',
          active: true,
        },
      ],
    },

  },
  {
    path: '/users/usuarios/editarusuariobbdd/:id',
    name: 'users-usuarios-editarbbdd',
    meta: { activeItem: 'users-usuarios' },
    component: () => import('@/views/usuarios/usuariosEditarBBDD.vue'),
    meta: {
      pageTitle: 'Editar Usuarios',
      breadcrumb: [
        {
          text: 'Listar Usuarios BBDD',
          to: { name: 'users-usuarios-bbdd' },

        },
        {
          text: 'Editar Usuarios BBDD',
        },
        {
          text: 'Información del Usuario',
          active: true,
        },

      ],
    },

  },
  {
    path: '/users/usuarios/crearusuariobbdd',
    name: 'users-usuarios-crearbbdd',
    meta: { activeItem: 'users-usuarios' },
    component: () => import('@/views/usuarios/usuariosCrearBBDD.vue'),
    meta: {
      pageTitle: 'Usuarios',
      breadcrumb: [
        {
          text: 'Crear Usuarios BBDD',
        },
        {
          text: 'Información De Creación del Usuario',
          active: true,
        },
      ],
    },

  },
  {
    path: '/users/usuarios/bbddcards',
    name: 'users-usuarios-bbddcard',
    meta: { activeItem: 'users-usuarios' },
    component: () => import('@/views/usuarios/usuariosBBDDCards.vue'),
    meta: {
      pageTitle: 'Usuarios',
      breadcrumb: [
        {
          text: 'Listar Usuarios BBDD',
        },
        {
          text: 'Información De Los Usuarios',
          active: true,
        },
      ],
    },

  },
]
