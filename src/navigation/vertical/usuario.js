export default [
    {
      header: 'Users',
    },
    {
      title: 'Usuarios',   
      icon: 'UserIcon',
      children: [
        {
          title: 'Listar Usuarios',
          route: 'users-usuarios',
        },
        {
          title: 'Editar Usuarios',
          route: 'users-usuarios-bbdd',
        },
        {
          title: 'Crear Usuarios',
          route: 'users-usuarios-crearbbdd',
        },
      ]
    },
    
]