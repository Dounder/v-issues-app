<script setup lang="ts">
import { Issue } from 'src/issues/interfaces/issue';
import { toRef } from 'vue';
import IssueCard from './IssueCard.vue';

interface Props {
  issues: Issue[];
}

const props = defineProps<Props>();
const issues = toRef(props, 'issues');
</script>

<template>
  <section class="row">
    <div
      class="full-width row flex-center text-white q-gutter-sm text-h5"
      v-if="issues.length === 0"
    >
      <q-icon size="2em" name="sentiment_dissatisfied" />
      <span> Not issues founded </span>
    </div>

    <template v-else>
      <IssueCard v-for="issue of issues" :key="issue.id" :issue="issue" />
    </template>
  </section>
</template>

<style lang="scss" scoped></style>
