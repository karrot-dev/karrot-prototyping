<template>
  <q-page class="flex flex-center">
    <div style="width: 800px;">
      <agreement-proposal/>
    </div>
  </q-page>
</template>

<script>
import AgreementProposal from 'components/AgreementProposal'
export default {
  name: 'AgreementProposalPage',
  components: { AgreementProposal }
}
</script>
