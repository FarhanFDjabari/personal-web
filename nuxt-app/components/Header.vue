<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const scrollToSection = (sectionId: string) => {
  if (process.client) {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

const navItems = [
  { key: 'about', section: 'about' },
  { key: 'projects', section: 'projects' },
  { key: 'contact', section: 'contact' },
]
</script>

<template>
  <header class="header">
    <div class="container">
      <NuxtLink to="/" class="logo">FarhanFDjabari</NuxtLink>

      <nav class="nav">
        <button
          v-for="item in navItems"
          :key="item.key"
          @click="scrollToSection(item.section)"
          class="nav-link"
        >
          {{ t(`nav.${item.key}`) }}
        </button>
        <NuxtLink to="/blog" class="nav-link">
          {{ t('nav.blog') }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  border-bottom: 1px solid #ddd;
  background: white;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.logo {
  font-weight: 700;
  font-size: 1.125rem;
  text-decoration: none;
  color: inherit;
}

.logo:hover {
  color: #0066cc;
}

.nav {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.nav-link {
  text-decoration: none;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-family: inherit;
  padding: 0;
}

.nav-link:hover {
  color: #0066cc;
}

@media (prefers-color-scheme: dark) {
  .header {
    background: #0a0a0a;
    border-bottom-color: #333;
  }

  .logo:hover,
  .nav-link:hover {
    color: #4a9eff;
  }
}

@media (max-width: 640px) {
  .container {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .nav {
    gap: 1rem;
    font-size: 0.875rem;
  }
}
</style>
