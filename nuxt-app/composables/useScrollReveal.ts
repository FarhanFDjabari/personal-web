import { onMounted, onUnmounted } from 'vue'

/**
 * Composable for scroll reveal animations
 * Adds scroll-triggered reveal animations to elements
 */
export function useScrollReveal() {
  let observer: IntersectionObserver | null = null

  const initScrollReveal = () => {
    if (process.client) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed')
              // Optional: unobserve after reveal to improve performance
              observer?.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        },
      )

      // Observe all elements with data-scroll-reveal attribute
      const elements = document.querySelectorAll('[data-scroll-reveal]')
      elements.forEach((el) => observer?.observe(el))
    }
  }

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  onMounted(() => {
    initScrollReveal()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    initScrollReveal,
    cleanup,
  }
}
