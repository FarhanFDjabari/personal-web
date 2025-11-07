<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { LINKS } from '~/utils/constants'

const { t } = useI18n()

const skills = ['Flutter', 'Kotlin', 'Swift/iOS']

const scrollToProjects = () => {
  const element = document.getElementById('projects')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section id="about" class="section">
    <h1>{{ t('hero.title') }}</h1>
    <p class="subtitle">{{ t('hero.subtitle') }}</p>

    <p class="tagline">{{ t('hero.tagline') }}</p>

    <div class="skills">
      <strong>{{ t('hero.skills') }}:</strong>
      <span v-for="(skill, i) in skills" :key="skill">
        {{ skill }}<span v-if="i < skills.length - 1">, </span>
      </span>
    </div>

    <div class="actions">
      <a :href="LINKS.resume" target="_blank" class="button">{{ t('hero.downloadResume') }}</a>
      <button @click="scrollToProjects" class="button button-secondary">{{ t('hero.viewProjects') }}</button>
    </div>
  </section>
</template>

<style scoped>
.section {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.subtitle {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.tagline {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.skills {
  margin-bottom: 2rem;
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #0066cc;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-family: inherit;
}

.button:hover {
  background: #0052a3;
}

.button-secondary {
  background: white;
  color: #0066cc;
  border: 2px solid #0066cc;
}

.button-secondary:hover {
  background: #f0f0f0;
}

@media (prefers-color-scheme: dark) {
  .subtitle {
    color: #aaa;
  }

  .button-secondary {
    background: transparent;
    color: #4a9eff;
    border-color: #4a9eff;
  }

  .button-secondary:hover {
    background: #1a1a1a;
  }
}
</style>
