<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { LINKS } from '~/utils/constants'

const { t } = useI18n()

const contactMethods = [
  {
    icon: 'lucide:mail',
    label: t('contact.email'),
    value: 'farhanf@djabari-dev.my.id',
    href: LINKS.email,
  },
  {
    icon: 'lucide:github',
    label: t('contact.github'),
    value: 'farhanfdjabari',
    href: LINKS.github,
  },
  {
    icon: 'lucide:linkedin',
    label: t('contact.linkedin'),
    value: 'Farhan Fadhilah Djabari',
    href: LINKS.linkedin,
  },
]
</script>

<template>
  <section id="contact" class="py-20 px-4">
    <div class="container mx-auto max-w-4xl">
      <div class="text-center mb-12 space-y-4">
        <h2 class="text-3xl md:text-4xl font-bold">
          {{ t('contact.title') }} <span class="gradient-text">{{ t('contact.titleHighlight') }}</span>
        </h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          {{ t('contact.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          v-for="(method, index) in contactMethods"
          :key="method.label"
          data-scroll-reveal
          class="glass-card hover-lift card-shadow transition-all duration-300 text-center group border-border/50 hover:border-primary/30"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <CardContent class="pt-6 space-y-4">
            <div class="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Icon :name="method.icon" class="w-7 h-7 text-primary" />
            </div>
            <div class="space-y-2">
              <h3 class="font-semibold group-hover:text-primary transition-colors">
                {{ method.label }}
              </h3>
              <p class="text-sm text-muted-foreground break-all">
                {{ method.value }}
              </p>
            </div>
            <Button as="a" :href="method.href" target="_blank" variant="outline" class="w-full gap-2 glass-button group/btn">
              <Icon name="lucide:external-link" class="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
              Connect
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
