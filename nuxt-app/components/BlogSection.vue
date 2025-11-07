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
  <section class="section bg-section">
    <h2>{{ t('blog.title') }} {{ t('blog.titleHighlight') }}</h2>
    <p class="section-subtitle">{{ t('blog.subtitle') }}</p>

    <div v-if="loading" class="loading">
      Loading blog posts...
    </div>

    <div v-else-if="posts.length === 0" class="empty">
      No blog posts found.
    </div>

    <div v-else class="blog-list">
      <article v-for="post in posts" :key="post.link" class="blog-card">
        <div class="blog-meta">
          <span>{{ formatDate(post.pubDate) }}</span>
          <span>•</span>
          <span>{{ post.readTime }} min read</span>
        </div>

        <h3>
          <a :href="post.link" target="_blank" class="blog-title">{{ post.title }}</a>
        </h3>

        <p class="blog-excerpt">{{ post.contentSnippet }}</p>

        <div class="blog-categories">
          <span v-for="category in post.categories.slice(0, 3)" :key="category" class="category-tag">
            {{ category }}
          </span>
        </div>
      </article>
    </div>

    <div class="view-all">
      <a href="/blog" class="button">{{ t('blog.viewAll') }}</a>
    </div>
  </section>
</template>

<style scoped>
.section {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.bg-section {
  background: #f9f9f9;
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

.blog-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}

.blog-card {
  border-bottom: 1px solid #ddd;
  padding-bottom: 1.5rem;
}

.blog-card:last-child {
  border-bottom: none;
}

.blog-meta {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.blog-title {
  color: inherit;
  text-decoration: none;
}

.blog-title:hover {
  color: #0066cc;
}

.blog-excerpt {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #333;
}

.blog-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-tag {
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  background: #e8e8e8;
  border-radius: 3px;
}

.view-all {
  text-align: center;
}

.button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #0066cc;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 1rem;
}

.button:hover {
  background: #0052a3;
}

@media (prefers-color-scheme: dark) {
  .bg-section {
    background: #1a1a1a;
  }

  .section-subtitle,
  .loading,
  .empty,
  .blog-meta {
    color: #aaa;
  }

  .blog-card {
    border-bottom-color: #333;
  }

  .blog-excerpt {
    color: #ccc;
  }

  .category-tag {
    background: #2a2a2a;
  }

  .blog-title:hover {
    color: #4a9eff;
  }
}
</style>
