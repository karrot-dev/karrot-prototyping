<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-tabs>
        <q-route-tab
          label="edit view"
          to="/vertical"
          exact
        />
        <q-route-tab
          label="community view"
          to="/community"
          exact
        />
      </q-tabs>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>
