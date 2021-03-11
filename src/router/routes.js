
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/agreements', component: () => import('pages/AgreementList.vue') },
      { path: '/agreements/:id', component: () => import('pages/AgreementDetail.vue') }
      /*
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'group-wizard', component: () => import('pages/GroupWizard.vue') },
      { path: 'vertical', component: () => import('pages/Vertical.vue') },
      { path: 'community', component: () => import('pages/CommunityView.vue') },
      { path: 'agreement-details', component: () => import('pages/AgreementDetails.vue') },
      // { path: 'agreements/proposal', component: () => import('pages/AgreementProposalPage.vue') },
      { path: 'new-agreement', component: () => import('pages/NewAgreement.vue') },
      { path: 'edit-agreement', component: () => import('pages/EditAgreement.vue') }
       */
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
