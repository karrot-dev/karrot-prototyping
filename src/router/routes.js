
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'group-wizard', component: () => import('pages/GroupWizard.vue') },
      { path: 'vertical', component: () => import('pages/Vertical.vue') },
      { path: 'community', component: () => import('pages/CommunityView.vue') },
      { path: 'agreement-details', component: () => import('pages/AgreementDetails.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
