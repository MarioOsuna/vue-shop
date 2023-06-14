export default [
    {
      path: '/apiAdrian/exportar',
      name: 'exportarJSONAdrian',
      component: () => import('@/views/apiAdrian/export.vue'),
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
      path: '/apiAdrian/importar',
      name: 'importarJSONAdrian',
      component: () => import('@/views/apiAdrian/import.vue'),
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