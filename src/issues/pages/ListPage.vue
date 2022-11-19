<script setup lang="ts">
import IssueList from 'src/issues//components/issue-list/IssueList.vue';
import FilterSelector from 'src/issues/components/filter-selector/FilterSelector.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
</script>

<template>
  <section class="row q-mb-md">
    <div class="col-12">
      <span class="text-h4">Github Issues</span>
    </div>
  </section>

  <section class="row">
    <article class="col-xs-12 col-md-4">
      <!-- TODO: filters -->
      <FilterSelector />
    </article>

    <article class="col-xs-12 col-md-8">
      <LoaderSpinner color="white" />
      <IssueList />
    </article>
  </section>
</template>

<style lang="scss" scoped></style>
