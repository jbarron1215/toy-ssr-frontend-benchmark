<template>
  <div>
    Hello World Component!
    {{ props.text }}
  </div>
</template>

<script setup>
const props = defineProps(['text'])
</script>