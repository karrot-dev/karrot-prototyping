<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="width: 800px; max-width: 80vw;">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>
          <q-icon
            name="fas fa-info-circle"
            class="on-left"
          />
          <span>Proposal</span>
        </q-toolbar-title>
        <q-btn
          outline
          @click="hide"
          label="Close"
        />
      </q-toolbar>

      <agreement :agreement="agreement" class="q-pa-lg" />
    </q-card>
  </q-dialog>
</template>

<script>
import Agreement from 'components/Agreement'

export default {
  components: {
    Agreement
  },
  props: {
    agreement: {
      type: Object,
      required: true
    }
  },

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>

<style>
.q-markdown :last-child {
  margin-bottom: 0;
}
</style>
