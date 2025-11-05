<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { type BadgeVariants, badgeVariants } from './badge-variants'
import { cn } from '~/utils'

const props = defineProps<{
  variant?: BadgeVariants['variant']
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn(badgeVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
