<template>
  <q-page class="flex flex-center">
    <div style="width: 800px;">
      <community-organisation>
        <template #actions>
          <q-btn
            color="primary"
            label="Done"
            to=community
          />
        </template>
      </community-organisation>
    </div>
  </q-page>
</template>

<script>
import CommunityOrganisation from 'components/CommunityOrganisation'
export default {
  name: 'PageIndex',
  components: { CommunityOrganisation }
}
</script>
