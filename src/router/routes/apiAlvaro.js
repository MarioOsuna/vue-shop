export default [
    {
      path: '/apiAlvaro/exportar',
      name: 'exportarJSON',
      component: () => import('@/views/apiAlvaro/export.vue'),
      meta: {
        pageTitle: 'API',
        breadcrumb: [
          {
            text: 'Exportar JSON',
            active: true
          }
        ]
      }
    },
    {
      path: '/apiAlvaro/importar',
      name: 'importarJSON',
      component: () => import('@/views/apiAlvaro/import.vue'),
      meta: {
        pageTitle: 'API',
        breadcrumb: [
          {
            text: 'Importar JSON',
            active: true
          }
        ]
      }
    }
]