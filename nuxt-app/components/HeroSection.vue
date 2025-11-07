<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { LINKS } from '~/utils/constants'

const { t } = useI18n()

const skills = [
  { name: 'Flutter', icon: 'lucide:smartphone', level: 95 },
  { name: 'Kotlin', icon: 'lucide:code-2', level: 90 },
]

const projectsSection = ref<HTMLElement>()

const scrollToProjects = () => {
  const element = document.getElementById('projects')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section id="about" class="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <!-- Grid Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]" />

      <!-- Floating Gradient Orbs -->
      <div class="absolute top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div class="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" />

      <!-- Radial gradient overlay -->
      <div class="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background" />
    </div>

    <div class="container mx-auto relative z-10">
      <div class="max-w-4xl mx-auto text-center space-y-10 animate-fade-in-up">
        <!-- Title with improved hierarchy -->
        <div class="space-y-6">
          <h1 class="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            <span class="gradient-text-animated">{{ t('hero.title') }}</span>
          </h1>
          <p class="text-xl md:text-3xl text-muted-foreground font-medium">
            {{ t('hero.subtitle') }}
          </p>
        </div>

        <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {{ t('hero.tagline') }}
        </p>

        <!-- Interactive Skill Cards -->
        <div class="flex gap-4 justify-center max-w-3xl mx-auto pt-4">
          <div
            v-for="(skill, i) in skills"
            :key="skill.name"
            class="group relative p-6 w-40 rounded-xl glass-card border hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-default"
            :style="{ animationDelay: `${i * 100}ms` }"
          >
            <!-- Hover gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

            <div class="relative text-center space-y-2">
              <Icon :name="skill.icon" class="w-8 h-8 mx-auto text-primary group-hover:scale-110 transition-transform" />
              <p class="text-sm font-medium">{{ skill.name }}</p>

              <!-- Skill level indicator on hover -->
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <div class="h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-700"
                    :style="{ width: `${skill.level}%` }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex gap-4 justify-center flex-wrap pt-4">
          <Button as="a" :href="LINKS.resume" target="_blank" size="lg" class="gap-2 group hover:shadow-lg hover:shadow-primary/25 transition-all">
            <Icon name="lucide:download" class="w-4 h-4 group-hover:animate-bounce" />
            {{ t('hero.downloadResume') }}
          </Button>
          <Button
            as="button"
            variant="outline"
            size="lg"
            class="glass-button group"
            @click="scrollToProjects"
          >
            {{ t('hero.viewProjects') }}
            <Icon name="lucide:arrow-down" class="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
