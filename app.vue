<template>
  <NuxtLayout :name="layout">
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
<script lang="ts" setup>
import { useLayouts } from './composables/useLayouts';

const { layout } = useLayouts()
</script>
