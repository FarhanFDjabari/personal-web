<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
})
</script>

<template>
  <div>
    <Header />
    <main class="min-h-screen">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>
