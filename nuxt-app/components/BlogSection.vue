<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { format } from 'date-fns'

const { t } = useI18n()
const config = useRuntimeConfig()

interface BlogPost {
  title: string
  link: string
  pubDate: string
  contentSnippet: string
  categories: string[]
  readTime: number
}

const posts = ref<BlogPost[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await $fetch<BlogPost[]>(`/api/medium/posts?username=${config.public.mediumUsername}&limit=3`)
    posts.value = data
  }
  catch (error) {
    console.error('Failed to fetch blog posts:', error)
  }
  finally {
    loading.value = false
  }
})

const formatDate = (date: string) => {
  return format(new Date(date), 'MMM dd, yyyy')
}
</script>

<template>
  <section class="py-20 px-4 bg-muted/30">
    <div class="container mx-auto">
      <div class="text-center mb-12 space-y-4">
        <h2 class="text-3xl md:text-4xl font-bold">
          {{ t('blog.title') }} <span class="gradient-text">{{ t('blog.titleHighlight') }}</span>
        </h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          {{ t('blog.subtitle') }}
        </p>
      </div>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card v-for="i in 3" :key="i" class="p-6">
          <div class="animate-pulse space-y-4">
            <div class="h-6 bg-muted rounded w-3/4" />
            <div class="h-4 bg-muted rounded" />
            <div class="h-4 bg-muted rounded w-5/6" />
          </div>
        </Card>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card
          v-for="post in posts"
          :key="post.link"
          class="hover-lift transition-all duration-300 flex flex-col"
        >
          <CardHeader>
            <div class="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Icon name="lucide:calendar" class="w-4 h-4" />
              <span>{{ formatDate(post.pubDate) }}</span>
              <span>•</span>
              <Icon name="lucide:clock" class="w-4 h-4" />
              <span>{{ post.readTime }} min read</span>
            </div>
            <CardTitle class="line-clamp-2">
              {{ post.title }}
            </CardTitle>
          </CardHeader>
          <CardContent class="flex-1 flex flex-col justify-between gap-4">
            <p class="text-muted-foreground line-clamp-3">
              {{ post.contentSnippet }}
            </p>
            <div class="flex flex-wrap gap-2">
              <Badge v-for="category in post.categories.slice(0, 3)" :key="category" variant="secondary">
                {{ category }}
              </Badge>
            </div>
            <Button as="a" :href="post.link" target="_blank" variant="outline" class="w-full mt-auto gap-2">
              Read More
              <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div class="text-center">
        <Button as="a" href="/blog" size="lg" class="gap-2">
          {{ t('blog.viewAll') }}
          <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </section>
</template>
