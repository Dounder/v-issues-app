<script setup lang="ts">
import { toRefs } from 'vue';

interface Props {
  color?: string;
  size?: string;
  thickness?: number;
  text?: string;
  showText?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: '4rem',
  thickness: 2,
  text: 'Loading...',
  showText: true,
});

const { color, size, thickness, text, showText } = toRefs(props);
</script>

<template>
  <article class="column items-center">
    <q-spinner-gears :color="color" :size="size" :thickness="thickness" />
    <span class="q-mt-md text-overline" v-if="showText">{{ text }}</span>
  </article>
</template>
