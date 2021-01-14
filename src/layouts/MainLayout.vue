<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-tabs>
        <q-route-tab
          label="horizontal stepper"
          to="/"
          exact
        />
        <q-route-tab
          label="vertical style"
          to="/vertical"
          exact
        />
        <q-route-tab
          label="community"
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
