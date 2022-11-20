<script setup lang="ts">
import { QBtnToggle } from 'quasar';
import { useIssuesStore } from 'src/stores/issues.store';

const store = useIssuesStore();
</script>

<template>
  <q-btn-toggle
    v-model="store.state"
    toggle-color="primary"
    push
    spread
    :options="[
      { label: 'All', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'Closed', value: 'closed' },
    ]"
  />
</template>

<style lang="scss" scoped></style>
