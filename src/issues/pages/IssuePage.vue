<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { useRoute } from 'vue-router';
import IssueCard from '../components/issue-list/IssueCard.vue';
import useIssue from '../composables/useIssue';

const route = useRoute();
const { id } = route.params;

const { isLoading, issue, isLoadingComments, comments } = useIssue(+id);
</script>

<template>
  <router-link class="text-white" :to="{ name: 'issue-list' }">
    Go back
  </router-link>

  <LoaderSpinner color="white" v-if="isLoading" />
  <IssueCard v-else-if="issue" :issue="issue" />
  <p v-else>Issue with id {{ id }} not found</p>

  <LoaderSpinner
    color="white"
    :thickness="1"
    size="2rem"
    :show-text="false"
    v-if="isLoadingComments"
  />
  <section class="column" v-else-if="comments">
    <span class="text-h3 q-mb-md">Comments ( {{ comments.length }} )</span>
    <IssueCard v-for="comment of comments" :key="comment.id" :issue="comment" />
  </section>
  <p v-else>Issue has no comments yet</p>
</template>

<style lang="scss" scoped></style>
