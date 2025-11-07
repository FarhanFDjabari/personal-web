<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { LINKS } from '~/utils/constants'

const { t } = useI18n()

const contactMethods = [
  {
    label: t('contact.email'),
    value: 'farhanf@djabari-dev.my.id',
    href: LINKS.email,
  },
  {
    label: t('contact.github'),
    value: 'farhanfdjabari',
    href: LINKS.github,
  },
  {
    label: t('contact.linkedin'),
    value: 'Farhan Fadhilah Djabari',
    href: LINKS.linkedin,
  },
]
</script>

<template>
  <section id="contact" class="section">
    <h2>{{ t('contact.title') }} {{ t('contact.titleHighlight') }}</h2>
    <p class="section-subtitle">{{ t('contact.subtitle') }}</p>

    <div class="contact-list">
      <div v-for="method in contactMethods" :key="method.label" class="contact-item">
        <strong>{{ method.label }}:</strong>
        <a :href="method.href" target="_blank" class="link">{{ method.value }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

h2 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.section-subtitle {
  color: #666;
  margin-bottom: 2rem;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.link {
  color: #0066cc;
  text-decoration: none;
  word-break: break-all;
}

.link:hover {
  text-decoration: underline;
}

@media (prefers-color-scheme: dark) {
  .section-subtitle {
    color: #aaa;
  }

  .link {
    color: #4a9eff;
  }
}

@media (min-width: 768px) {
  .contact-item {
    flex-direction: row;
    gap: 1rem;
  }
}
</style>
