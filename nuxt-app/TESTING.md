# 🧪 Testing Guide

Comprehensive testing suite for the Nuxt.js portfolio application.

## Test Suite Overview

This project includes three types of tests:

1. **Unit Tests** - Test individual functions and utilities
2. **API Tests** - Test data structures and validation
3. **E2E Tests** - Test user flows and interactions (Playwright)

## Running Tests

### All Unit Tests
```bash
pnpm run test              # Watch mode
pnpm run test:unit         # Run once
pnpm run test:coverage     # With coverage report
pnpm run test:ui           # Interactive UI
```

###E2E Tests
```bash
pnpm run test:e2e          # Run E2E tests
pnpm run test:e2e:ui       # Interactive UI
pnpm run test:e2e:headed   # With browser visible
```

### Run All Tests
```bash
pnpm run test:all          # Unit + E2E tests
```

## Test Coverage

### Unit Tests (27 tests)

#### Utils Tests (6 tests)
- ✅ Class name merging (`cn` function)
- ✅ Conditional classes
- ✅ Tailwind class merging
- ✅ Array handling
- ✅ Empty inputs
- ✅ Undefined/null handling

#### Logger Tests (4 tests)
- ✅ Info messages in development
- ✅ No info messages in production
- ✅ Error messages always logged
- ✅ Warning messages in development

#### Constants Tests (5 tests)
- ✅ All social links present
- ✅ Valid URL formats
- ✅ Resume link exists
- ✅ Medium cache duration (6 hours)
- ✅ GitHub cache duration (24 hours)

#### GitHub API Tests (5 tests)
- ✅ Repository data structure validation
- ✅ Repositories with live URLs
- ✅ Repositories without live URLs
- ✅ Username parameter validation
- ✅ Valid username acceptance

#### Medium API Tests (7 tests)
- ✅ Blog post data structure validation
- ✅ Read time calculation
- ✅ Minimum read time handling
- ✅ Long articles handling
- ✅ Username parameter validation
- ✅ Limit parameter acceptance
- ✅ Default limit (3 posts)

### E2E Tests (Playwright)

#### Homepage Tests
- ✅ Page loads successfully
- ✅ Hero section displayed
- ✅ Header with navigation
- ✅ Projects section
- ✅ Footer displayed
- ✅ Social media links
- ✅ Section navigation
- ✅ Theme toggle

#### Blog Page Tests
- ✅ Navigation to blog page
- ✅ Blog page title
- ✅ Blog posts loading
- ✅ Post metadata
- ✅ External Medium links
- ✅ Navigate back to home

#### Responsive Design Tests
- ✅ Mobile menu on small screens
- ✅ Desktop navigation
- ✅ Tablet layout
- ✅ Mobile portrait
- ✅ Mobile landscape

## Test Structure

```
tests/
├── unit/                  # Unit tests
│   ├── utils.test.ts     # Utility functions
│   ├── logger.test.ts    # Logger utility
│   └── constants.test.ts # App constants
├── api/                   # API data validation
│   ├── github.test.ts    # GitHub API
│   └── medium.test.ts    # Medium API
└── ../e2e/               # E2E tests (Playwright)
    ├── homepage.spec.ts  # Homepage flows
    ├── blog.spec.ts      # Blog page flows
    └── responsive.spec.ts # Responsive design
```

## Writing New Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest'
import { myFunction } from '../../utils/myFunction'

describe('My Function', () => {
  it('should do something', () => {
    const result = myFunction('input')
    expect(result).toBe('expected output')
  })
})
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test'

test('should perform user action', async ({ page }) => {
  await page.goto('/')
  await page.click('button')
  await expect(page.locator('.result')).toBeVisible()
})
```

## Test Configuration

### Vitest (`vitest.config.ts`)
- Environment: happy-dom
- Coverage provider: v8
- Globals enabled
- TypeScript support

### Playwright (`playwright.config.ts`)
- Browsers: Chromium, Firefox, WebKit
- Mobile: Pixel 5, iPhone 12
- Base URL: http://localhost:3000
- Screenshots on failure
- Trace on first retry

## CI/CD Integration

Tests run automatically on:
- Every push to main/master
- Every pull request
- Manual workflow dispatch

### GitHub Actions Workflow

The `.github/workflows/test.yml` file runs:
1. **Unit Tests** - All Vitest tests
2. **E2E Tests** - Playwright tests (Chromium only in CI)
3. **Build Test** - Ensures static generation works

### Coverage Reporting

Coverage reports are uploaded to Codecov automatically. View coverage at:
```
https://codecov.io/gh/FarhanFDjabari/personal-web
```

## Best Practices

### Do's ✅
- Write tests for new features
- Test edge cases
- Use descriptive test names
- Mock external dependencies
- Keep tests focused and simple
- Update tests when changing code

### Don'ts ❌
- Don't test implementation details
- Don't write fragile tests
- Don't skip failing tests
- Don't mock everything
- Don't duplicate tests

## Troubleshooting

### Tests Failing Locally

```bash
# Clear cache and retry
rm -rf .nuxt node_modules/.vite
pnpm install
pnpm run test
```

### E2E Tests Failing

```bash
# Install/update browsers
npx playwright install

# Run in headed mode to see what's happening
pnpm run test:e2e:headed
```

### Coverage Not Generating

```bash
# Ensure coverage package is installed
pnpm add -D @vitest/coverage-v8

# Generate coverage
pnpm run test:coverage
```

## Test Metrics

Current Status: ✅ **All 27 unit tests passing**

- **Coverage Target**: 70%+
- **Test Speed**: < 6 seconds
- **Flakiness**: 0%
- **Maintainability**: High

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Testing Library Best Practices](https://testing-library.com/docs/guiding-principles)

## Contributing

When contributing:
1. Write tests for new features
2. Ensure all tests pass
3. Maintain test coverage above 70%
4. Update this documentation if needed

---

**Happy Testing!** 🎉
