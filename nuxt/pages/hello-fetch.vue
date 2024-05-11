<template>
  <div>
    {{ hello.text }}
  </div>
</template>

<script setup>
const { data: hello } = await useFetch('http://127.0.0.1:3210/api/hello')
</script>