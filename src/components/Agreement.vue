<template>
  <div>
    <div class="text-caption text-uppercase">Title</div>
    <div class="text-h6 q-mb-lg">{{ agreement.title }}</div>

    <!--
    <template v-if="agreement.values.length > 0">
      <div class="text-caption text-uppercase">Values</div>
      <values :values="agreement.values" class="q-mb-lg"/>
    </template>
    -->

    <template v-if="agreement.summary">
      <div class="text-caption text-uppercase q-mb-sm">Summary</div>
      <div class="bg-amber-1 q-pa-md q-mb-lg">
        <q-markdown :src="agreement.summary"/>
      </div>
    </template>

    <template v-if="agreement.content">
      <div class="text-caption text-uppercase">Content</div>
      <q-markdown
        :src="agreement.content"
        class="q-mb-lg"
      />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    agreement: {
      type: Object,
      required: true
    }
  }
}
</script>
