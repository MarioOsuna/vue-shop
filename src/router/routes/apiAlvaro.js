export default [
    {
      path: '/apiAlvaro/API',
      name: 'api-alvaro',
      component: () => import('@/views/apiAlvaro/api.vue'),
      meta: {
        pageTitle: 'API',
        breadcrumb: [
          {
            text: 'API',
            active: true
          }
        ]
      }
    },
]