<template>
  <div>
    {{ hello.text }}
  </div>
</template>

<script setup>
// NOTE: this cache only works in the client
const cacheTimeMs = 60 * 1000

const nuxt = useNuxtApp()
let lastCached = 0
let lastCachedData= null

const { data: hello } = await useFetch(
  'http://127.0.0.1:3210/api/hello',
  {
    getCachedData(key) {
      const data = nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key]
      if ((lastCached + (3 * 1000)) < Date.now()) {
        lastCachedData = data;
        lastCached = Date.now()
      }
      return data
    }
  }
)
</script>