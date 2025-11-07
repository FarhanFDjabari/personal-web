<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const config = useRuntimeConfig()

interface Repository {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string | null
  stars: number
  forks: number
}

const repositories = ref<Repository[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await $fetch<Repository[]>(`/api/github/repositories?username=${config.public.githubUsername}`)
    repositories.value = data
  }
  catch (error) {
    console.error('Failed to fetch repositories:', error)
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <section id="projects" class="section">
    <h2>{{ t('projects.title') }} {{ t('projects.titleHighlight') }}</h2>
    <p class="section-subtitle">{{ t('projects.subtitle') }}</p>

    <div v-if="loading" class="loading">
      Loading projects...
    </div>

    <div v-else-if="repositories.length === 0" class="empty">
      No projects found.
    </div>

    <div v-else class="projects-list">
      <article v-for="repo in repositories" :key="repo.githubUrl" class="project-card">
        <div class="project-header">
          <h3>{{ repo.title }}</h3>
          <div class="project-stats">
            <span>⭐ {{ repo.stars }}</span>
            <span>🔱 {{ repo.forks }}</span>
          </div>
        </div>

        <p class="project-description">{{ repo.description }}</p>

        <div class="project-tech">
          <span v-for="tech in repo.technologies.slice(0, 5)" :key="tech" class="tech-tag">
            {{ tech }}
          </span>
          <span v-if="repo.technologies.length > 5" class="tech-tag">
            +{{ repo.technologies.length - 5 }}
          </span>
        </div>

        <div class="project-links">
          <a :href="repo.githubUrl" target="_blank" class="link">{{ t('projects.github') }}</a>
          <a v-if="repo.liveUrl" :href="repo.liveUrl" target="_blank" class="link">{{ t('projects.liveDemo') }}</a>
        </div>
      </article>
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

.loading,
.empty {
  padding: 2rem;
  text-align: center;
  color: #666;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.project-card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1.5rem;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 1rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.project-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #666;
  white-space: nowrap;
}

.project-description {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  background: #f0f0f0;
  border-radius: 3px;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.link {
  color: #0066cc;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

@media (prefers-color-scheme: dark) {
  .section-subtitle,
  .loading,
  .empty,
  .project-stats {
    color: #aaa;
  }

  .project-card {
    border-color: #333;
  }

  .tech-tag {
    background: #2a2a2a;
  }

  .link {
    color: #4a9eff;
  }
}
</style>
