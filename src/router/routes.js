
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Home.vue') },
      { path: '/agreements', component: () => import('pages/AgreementList.vue') },
      { path: '/proposals', component: () => import('pages/AgreementProposalList.vue') },
      { path: '/agreements/:agreementId', component: () => import('pages/AgreementDetail.vue') },
      { path: '/agreements/:agreementId/propose', component: () => import('pages/AgreementProposalEdit.vue') },
      { path: '/proposals/new', component: () => import('pages/AgreementProposalEdit.vue') },
      { path: '/proposals/:proposalId', component: () => import('pages/AgreementProposalDetail.vue') },
      { path: '/proposals/:proposalId/edit', component: () => import('pages/AgreementProposalEdit.vue') }
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
