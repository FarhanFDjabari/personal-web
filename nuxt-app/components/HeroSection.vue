<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { LINKS } from '~/utils/constants'

const { t } = useI18n()

const skills = ['Flutter', 'Kotlin', 'React Native', 'Firebase', 'REST API']
</script>

<template>
  <section id="about" class="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
    <div class="container mx-auto relative z-10">
      <div class="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
        <div class="space-y-4">
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight">
            <span class="gradient-text">{{ t('hero.title') }}</span>
          </h1>
          <p class="text-xl md:text-2xl text-muted-foreground font-medium">
            {{ t('hero.subtitle') }}
          </p>
        </div>

        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          {{ t('hero.tagline') }}
        </p>

        <div class="flex flex-wrap gap-3 justify-center">
          <Badge v-for="skill in skills" :key="skill" variant="secondary" class="text-sm px-4 py-2">
            {{ skill }}
          </Badge>
        </div>

        <div class="flex gap-4 justify-center flex-wrap">
          <Button as="a" :href="LINKS.resume" target="_blank" size="lg" class="gap-2">
            <Icon name="lucide:download" class="w-4 h-4" />
            {{ t('hero.downloadResume') }}
          </Button>
          <Button
            as="button"
            variant="outline"
            size="lg"
            @click="$el.closest('section').nextElementSibling?.scrollIntoView({ behavior: 'smooth' })"
          >
            {{ t('hero.viewProjects') }}
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
