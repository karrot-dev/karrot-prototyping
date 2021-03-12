<template>
  <div>

    <q-card-section>
      <div class="text-h4 q-mb-md">Changes from existing agreement</div>
      <div ref="summaryDiff"/>
    </q-card-section>

    <!--
    <h4>title</h4>
    <q-card-section class="row">
      <div class="col-6 overflow-hidden">
        {{ fromAgreement.title }}
      </div>
      <div class="col-6 overflow-hidden">
        <div class="diff" v-html="diff(fromAgreement.title, toAgreement.title)"/>
      </div>
    </q-card-section>

    <h4>summary</h4>
    <q-card-section class="row">
      <div class="col-6 overflow-hidden">
        {{ fromAgreement.summary }}
      </div>
      <div class="col-6 overflow-hidden">
        <div class="diff" v-html="diff(fromAgreement.summary, toAgreement.summary)"/>
        <pre>{{ diff(fromAgreement.summary, toAgreement.summary) }}</pre>
        <div ref="summaryDiff"/>
      </div>
    </q-card-section>
    -->
  </div>
</template>

<script>
import * as Diff2html from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'
import { Diff2HtmlUI } from 'diff2html/lib/ui/js/diff2html-ui'
console.log('imported UI', Diff2HtmlUI)
import { createPatch } from 'diff'
export default {
  props: {
    fromAgreement: {
      type: Object,
      required: true
    },
    toAgreement: {
      type: Object,
      required: true
    }
  },

  mounted () {
    // https://github.com/rtfpessoa/diff2html#usage
    // https://www.npmjs.com/package/diff
    console.log('mounted diff!', this.$refs.summaryDiff)
    const parts = []
    for (const key of ['title', 'summary', 'content']) {
      if (this.fromAgreement[key] !== this.toAgreement[key]) {
        parts.push(createPatch(key, this.fromAgreement[key], this.toAgreement[key]))
      }
    }
    const foo = Diff2html.parse(parts.join('\n'))
    console.log('foo', foo)
    const diff2htmlUi = new Diff2HtmlUI(this.$refs.summaryDiff, foo, {
      inputFormat: 'json',
      outputFormat: 'line-by-line',
      // outputFormat: 'side-by-side',
      diffStyle: 'word',
      // matching: 'none',
      drawFileList: false,
      highlight: false
    })
    diff2htmlUi.draw()
    // diff2htmlUi.highlightCode() // not sure if it works, does it do based on filename?
  }
}
</script>

<style>
.diff ins {
  color: green;
  text-decoration: none;
}
</style>
