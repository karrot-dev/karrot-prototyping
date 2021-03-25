<template>
  <q-dialog
    v-bind="$attrs"
    v-on="$listeners"
  >
    <q-card class="q-dialog-plugin" style="width: 1000px; max-width: 100vw;">
      <q-card-section class="q-dialog__title">
        <slot name="title" />
      </q-card-section>
      <q-card-section class="q-dialog__message">
        <slot name="message" />
      </q-card-section>
      <q-card-actions align="right">
        <slot name="actions" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {}
</script>
