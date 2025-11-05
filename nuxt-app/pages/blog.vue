<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { format } from 'date-fns'

const { t } = useI18n()
const config = useRuntimeConfig()

useHead({
  title: 'Blog - Farhan Fadhilah Djabari',
  meta: [
    { name: 'description', content: 'Articles and insights on mobile development, Flutter, and Kotlin.' },
  ],
})

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
    const data = await $fetch<BlogPost[]>(`/api/medium/posts?username=${config.public.mediumUsername}&limit=20`)
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
  return format(new Date(date), 'MMMM dd, yyyy')
}
</script>

<template>
  <div class="min-h-screen pt-24 pb-20 px-4">
    <div class="container mx-auto max-w-5xl">
      <div class="text-center mb-12 space-y-4">
        <h1 class="text-4xl md:text-5xl font-bold">
          <span class="gradient-text">{{ t('blog.title') }} {{ t('blog.titleHighlight') }}</span>
        </h1>
        <p class="text-muted-foreground max-w-2xl mx-auto text-lg">
          {{ t('blog.subtitle') }}
        </p>
        <div class="flex items-center justify-center gap-2 text-muted-foreground">
          <span>{{ t('blog.findMeOn') }}</span>
          <a
            href="https://medium.com/@djabaridev"
            target="_blank"
            class="text-primary hover:underline font-medium"
          >
            {{ t('blog.medium') }}
          </a>
        </div>
      </div>

      <div v-if="loading" class="space-y-6">
        <Card v-for="i in 6" :key="i" class="p-6">
          <div class="animate-pulse space-y-4">
            <div class="h-6 bg-muted rounded w-3/4" />
            <div class="h-4 bg-muted rounded" />
            <div class="h-4 bg-muted rounded w-5/6" />
          </div>
        </Card>
      </div>

      <div v-else class="space-y-6">
        <Card
          v-for="post in posts"
          :key="post.link"
          class="hover-lift transition-all duration-300"
        >
          <CardHeader>
            <div class="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Icon name="lucide:calendar" class="w-4 h-4" />
              <span>{{ formatDate(post.pubDate) }}</span>
              <span>•</span>
              <Icon name="lucide:clock" class="w-4 h-4" />
              <span>{{ post.readTime }} min read</span>
            </div>
            <CardTitle class="text-2xl hover:text-primary transition-colors">
              <a :href="post.link" target="_blank" rel="noopener noreferrer">
                {{ post.title }}
              </a>
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <p class="text-muted-foreground">
              {{ post.contentSnippet }}
            </p>
            <div class="flex flex-wrap gap-2">
              <Badge v-for="category in post.categories" :key="category" variant="secondary">
                {{ category }}
              </Badge>
            </div>
            <Button as="a" :href="post.link" target="_blank" variant="outline" class="gap-2">
              Read More
              <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        <div v-if="!loading && posts.length === 0" class="text-center py-12">
          <p class="text-muted-foreground">No blog posts found.</p>
        </div>
      </div>
    </div>
  </div>
</template>
