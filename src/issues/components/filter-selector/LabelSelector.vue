<script setup lang="ts">
import useLabels from 'src/issues/composables/useLabels';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';

const { isLoading, labels, toggleLabel, selectedLabels } = useLabels();
</script>

<template>
  <section class="q-mt-lg">
    <LoaderSpinner
      size="10rem"
      :thickness="1"
      :show-text="false"
      v-if="isLoading"
    />
    <q-chip
      v-else
      clickable
      outline
      :style="{
        color: `#${color}`,
        opacity: !selectedLabels.includes(name) ? 0.5 : 1,
        transition: 'all 500ms ease',
        transitionDelay: '100ms',
      }"
      :label="name"
      v-for="{ id, name, color } of labels"
      :key="id"
      @click="toggleLabel(name)"
    />
  </section>
</template>

<style lang="scss" scoped></style>
