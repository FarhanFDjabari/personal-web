<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useColorMode } from '@nuxtjs/color-mode'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const colorMode = useColorMode()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollToSection = (sectionId: string) => {
  if (process.client) {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    isMobileMenuOpen.value = false
  }
}

const navItems = [
  { key: 'about', section: 'about' },
  { key: 'projects', section: 'projects' },
  { key: 'contact', section: 'contact' },
]

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled ? 'glass backdrop-blur-xl border-b border-border/50 shadow-lg' : 'bg-transparent',
    ]"
  >
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-3 items-center h-16">
        <div class="flex justify-start">
          <NuxtLink
            to="/"
            class="text-xl font-mono font-bold text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
          >
            FarhanFDjabari
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="flex justify-center">
          <nav class="hidden md:flex items-center justify-center space-x-8">
            <button
              v-for="(item, index) in navItems"
              :key="item.key"
              @click="scrollToSection(item.section)"
              :style="{ animationDelay: `${index * 100}ms` }"
              class="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 capitalize relative group"
            >
              {{ t(`nav.${item.key}`) }}
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
            <NuxtLink
              to="/blog"
              class="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group"
            >
              {{ t('nav.blog') }}
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </NuxtLink>
          </nav>
        </div>

        <div class="flex justify-end items-center gap-2">
          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            <Icon v-if="colorMode.value === 'dark'" name="lucide:sun" class="w-5 h-5" />
            <Icon v-else name="lucide:moon" class="w-5 h-5" />
          </button>

          <!-- Mobile Menu Button -->
          <button
            class="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            aria-label="Toggle menu"
          >
            <Icon v-if="isMobileMenuOpen" name="lucide:x" class="w-5 h-5" />
            <Icon v-else name="lucide:menu" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden pb-4 animate-slide-in"
      >
        <nav class="flex flex-col space-y-4">
          <button
            v-for="item in navItems"
            :key="item.key"
            @click="scrollToSection(item.section)"
            class="text-left text-foreground hover:text-primary transition-all capitalize"
          >
            {{ t(`nav.${item.key}`) }}
          </button>
          <NuxtLink
            to="/blog"
            class="text-left text-foreground hover:text-primary transition-all"
            @click="isMobileMenuOpen = false"
          >
            {{ t('nav.blog') }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>
