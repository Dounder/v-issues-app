<script setup lang="ts">
import IssueCard from './IssueCard.vue';
</script>

<template>
  <section class="row">
    <IssueCard v-for="issue of 20" :key="issue" />
  </section>
</template>

<style lang="scss" scoped></style>
