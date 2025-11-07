<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { LINKS } from '~/utils/constants'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="copyright">
          © {{ currentYear }} Farhan Fadhilah Djabari
        </div>

        <div class="social-links">
          <a :href="LINKS.github" target="_blank" rel="noopener noreferrer" class="link">GitHub</a>
          <a :href="LINKS.linkedin" target="_blank" rel="noopener noreferrer" class="link">LinkedIn</a>
          <a :href="LINKS.medium" target="_blank" rel="noopener noreferrer" class="link">Medium</a>
          <a :href="LINKS.email" class="link">Email</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid #ddd;
  margin-top: 4rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.copyright {
  font-size: 0.875rem;
  color: #666;
}

.social-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.link {
  color: #0066cc;
  text-decoration: none;
  font-size: 0.875rem;
}

.link:hover {
  text-decoration: underline;
}

@media (prefers-color-scheme: dark) {
  .footer {
    border-top-color: #333;
  }

  .copyright {
    color: #aaa;
  }

  .link {
    color: #4a9eff;
  }
}

@media (max-width: 640px) {
  .footer-content {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
