<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '~/composables/useScrollReveal'

const { t } = useI18n()
const config = useRuntimeConfig()

// Initialize scroll reveal
useScrollReveal()

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
  <section id="projects" class="py-20 px-4">
    <div class="container mx-auto">
      <div class="text-center mb-12 space-y-4">
        <h2 class="text-3xl md:text-4xl font-bold">
          {{ t('projects.title') }} <span class="gradient-text">{{ t('projects.titleHighlight') }}</span>
        </h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          {{ t('projects.subtitle') }}
        </p>
      </div>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card v-for="i in 4" :key="i" class="glass-card p-6 card-shadow">
          <div class="space-y-4">
            <div class="h-6 shimmer rounded w-3/4" />
            <div class="h-4 shimmer rounded" />
            <div class="h-4 shimmer rounded w-5/6" />
          </div>
        </Card>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          v-for="(repo, index) in repositories"
          :key="repo.githubUrl"
          data-scroll-reveal
          class="glass-card hover-lift card-shadow transition-all duration-300 overflow-hidden group border-border/50 hover:border-primary/30"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <CardHeader class="relative">
            <!-- Gradient overlay on hover -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <CardTitle class="flex items-start justify-between gap-2 relative z-10">
              <span class="group-hover:text-primary transition-colors">{{ repo.title }}</span>
              <div class="flex gap-2 text-sm text-muted-foreground">
                <span class="flex items-center gap-1 hover-scale">
                  <Icon name="lucide:star" class="w-4 h-4 text-yellow-500" />
                  {{ repo.stars }}
                </span>
                <span class="flex items-center gap-1 hover-scale">
                  <Icon name="lucide:git-fork" class="w-4 h-4 text-blue-500" />
                  {{ repo.forks }}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4 relative z-10">
            <p class="text-muted-foreground leading-relaxed">
              {{ repo.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="tech in repo.technologies.slice(0, 5)"
                :key="tech"
                variant="secondary"
                class="hover-scale glass-card"
              >
                {{ tech }}
              </Badge>
              <Badge
                v-if="repo.technologies.length > 5"
                variant="secondary"
                class="glass-card"
              >
                +{{ repo.technologies.length - 5 }}
              </Badge>
            </div>
            <div class="flex gap-2 pt-2">
              <Button
                as="a"
                :href="repo.githubUrl"
                target="_blank"
                variant="outline"
                size="sm"
                class="gap-2 glass-button group/btn"
              >
                <Icon name="lucide:github" class="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                {{ t('projects.github') }}
              </Button>
              <Button
                v-if="repo.liveUrl"
                as="a"
                :href="repo.liveUrl"
                target="_blank"
                size="sm"
                class="gap-2 group/btn hover:shadow-lg hover:shadow-primary/25"
              >
                <Icon name="lucide:external-link" class="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                {{ t('projects.liveDemo') }}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
