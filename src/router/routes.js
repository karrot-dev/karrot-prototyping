
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Home.vue') },
      { path: '/agreements', redirect: '/agreements/approved' },
      { path: '/agreements/approved', component: () => import('pages/AgreementList.vue') },
      { path: '/agreements/proposed', component: () => import('pages/AgreementList.vue') },
      { path: '/proposals', component: () => import('pages/AgreementProposalList.vue') },
      { path: '/agreements/:agreementId', component: () => import('pages/AgreementDetail.vue') },
      { path: '/agreements/:agreementId/propose', component: () => import('pages/AgreementProposalEdit.vue') },
      { path: '/proposals/new', component: () => import('pages/AgreementProposalEdit.vue') },
      { path: '/proposals/:proposalId', component: () => import('pages/AgreementProposalDetail.vue') },
      { path: '/proposals/:proposalId/edit', component: () => import('pages/AgreementProposalEdit.vue') }
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
