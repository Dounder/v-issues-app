<script setup lang="ts">
import { toRef } from 'vue';
import VueMarkdown from 'vue-markdown-render';

import useIssue from 'src/issues/composables/useIssue';
import { Issue, State } from 'src/issues/interfaces/issue';
import { timeSince } from 'src/shared/helpers/time-since';

interface Props {
  issue: Issue;
}

const props = defineProps<Props>();
const issue = toRef(props, 'issue');

const { setIssueCacheData } = useIssue(issue.value.number, {
  autoload: false,
});
</script>

<template>
  <q-card
    class="text-white col-12 q-mb-md bg-dark"
    flat
    bordered
    dark
    @mouseenter="setIssueCacheData(issue)"
  >
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="issue.user.avatar_url" alt="User Avatar" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label v-if="issue.title">
          <router-link :to="{ name: 'issue-id', params: { id: issue.number } }">
            {{ issue.title }}
          </router-link>
        </q-item-label>
        <q-item-label caption class="text-white">
          {{ timeSince(issue.created_at) }} - ago
        </q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label class="row items-center justify-end">
          <q-item-label class="q-mr-md">
            <q-icon name="question_answer" />
            {{ issue.comments }}
          </q-item-label>
          <template v-if="issue.state">
            <q-chip
              color="positive"
              text-color="white"
              icon="check"
              v-if="issue.state === State.Closed"
            >
              Closed
            </q-chip>
            <q-chip
              color="negative"
              text-color="white"
              icon="bug_report"
              v-else
            >
              Open
            </q-chip>
          </template>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator dark inset />

    <q-item-section class="q-pa-md markdown-css">
      <VueMarkdown :source="issue.body || ''" />
    </q-item-section>

    <template v-if="issue.labels">
      <q-separator dark inset />
      <q-item-section class="q-pa-xs q-gutter-xs">
        <div>
          <q-chip
            outline
            :style="{ color: `#${color}` }"
            :label="name"
            v-for="{ id, name, color } of issue.labels"
            :key="id"
          />
        </div>
      </q-item-section>
    </template>
  </q-card>
</template>

<style scoped>
.q-item__section {
  overflow: hidden;
}

.markdown-css img {
  width: 250px !important;
}
</style>
