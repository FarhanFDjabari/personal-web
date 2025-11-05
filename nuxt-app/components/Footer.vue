<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { LINKS } from '~/utils/constants'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border bg-background/50 backdrop-blur-sm">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-sm text-muted-foreground">
          © {{ currentYear }} Farhan Fadhilah Djabari. {{ t('footer.madeWith') }} ❤️
        </div>

        <div class="flex gap-6">
          <a
            :href="LINKS.github"
            target="_blank"
            rel="noopener noreferrer"
            class="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Icon name="lucide:github" class="w-5 h-5" />
          </a>
          <a
            :href="LINKS.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Icon name="lucide:linkedin" class="w-5 h-5" />
          </a>
          <a
            :href="LINKS.medium"
            target="_blank"
            rel="noopener noreferrer"
            class="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Medium"
          >
            <Icon name="lucide:book-open" class="w-5 h-5" />
          </a>
          <a
            :href="LINKS.email"
            class="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Icon name="lucide:mail" class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
