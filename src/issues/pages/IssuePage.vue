<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { useRoute } from 'vue-router';
import IssueCard from '../components/issue-list/IssueCard.vue';

const route = useRoute();
const { id } = route.params;
</script>

<template>
  <LoaderSpinner color="white" />

  <router-link class="text-white" :to="{ name: 'issue-list' }">
    Go back
  </router-link>

  <IssueCard />

  <LoaderSpinner color="white" :thickness="1" size="2rem" :show-text="false" />

  <section class="column">
    <span class="text-h3 q-mb-md">Comments ( 5 )</span>
    <IssueCard v-for="comment of 6" :key="comment" />
  </section>
</template>

<style lang="scss" scoped></style>
