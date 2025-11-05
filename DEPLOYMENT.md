# 🚀 Netlify Deployment Guide

Complete guide to deploy your Nuxt.js portfolio to Netlify.

## Quick Deploy (Recommended)

### Method 1: Netlify UI (Easiest)

1. **Go to Netlify**: Visit [app.netlify.com](https://app.netlify.com)

2. **Sign in or create account**: Use your GitHub account for easiest integration

3. **Import your project**:
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your repositories
   - Select `FarhanFDjabari/personal-web`

4. **Configure build settings**:
   ```
   Base directory: (leave empty)
   Build command: cd nuxt-app && pnpm install && pnpm run generate
   Publish directory: nuxt-app/.output/public
   ```

5. **Advanced settings** (optional but recommended):
   - Add environment variable if needed
   - Click "Show advanced" → "New variable"

6. **Deploy**: Click "Deploy site"
   - Initial build takes 2-4 minutes
   - You'll get a random URL like `random-name-123456.netlify.app`

7. **Custom domain** (optional):
   - Go to "Domain settings"
   - Click "Add custom domain"
   - Follow instructions to connect your domain

### Method 2: Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login
# This opens a browser to authorize

# Initialize Netlify site (one time)
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Choose your team
# - Site name (optional)
# - Build command: cd nuxt-app && pnpm install && pnpm run generate
# - Publish directory: nuxt-app/.output/public

# Deploy to production
netlify deploy --prod
```

### Method 3: One-Click Deploy Button

Click the badge in README.md:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/FarhanFDjabari/personal-web)

## Configuration Details

### Build Settings

The `netlify.toml` file in the root already contains optimal settings:

```toml
[build]
  publish = "nuxt-app/.output/public"
  command = "cd nuxt-app && pnpm install && pnpm run generate"

[build.environment]
  NODE_VERSION = "18"
```

### Automatic Deployments

Once connected to Netlify:
- ✅ Every push to `main` branch triggers a deploy
- ✅ Pull requests get preview deploys
- ✅ Build logs available in Netlify dashboard
- ✅ Rollback to previous deploys with one click

### Performance Features

Your site includes:
- ✅ Cache headers for static assets (1 year)
- ✅ Security headers (XSS protection, frame options)
- ✅ SPA fallback routing
- ✅ Gzip compression
- ✅ CDN distribution

## Post-Deployment

### 1. Check Your Site
```bash
# Your site will be at:
https://your-site-name.netlify.app

# Or your custom domain:
https://yourdomain.com
```

### 2. Monitor Performance
- Visit Netlify dashboard → Analytics
- Check Core Web Vitals
- Monitor build times

### 3. Configure Notifications
- Slack/Email notifications for deploy status
- Build failure alerts
- Deploy previews in PRs

## Troubleshooting

### Build Fails

**Issue**: Build command fails
```bash
# Check the build logs in Netlify dashboard
# Common fixes:

# 1. Clear cache and redeploy
netlify deploy --prod --clear-cache

# 2. Verify pnpm is being used
# In Netlify UI: Site settings → Build & deploy → Build settings
# Add environment variable: NPM_FLAGS = --legacy-peer-deps
```

**Issue**: Module not found errors
```bash
# Make sure all dependencies are in package.json
cd nuxt-app
pnpm install
# Commit the updated pnpm-lock.yaml if changed
```

### API Routes Not Working

API routes work perfectly on Netlify! They're automatically converted to serverless functions.

**To verify**:
```bash
# Check these endpoints after deployment:
https://your-site.netlify.app/api/github/repositories?username=farhanfdjabari
https://your-site.netlify.app/api/medium/posts?username=djabaridev&limit=3
```

### Pages Return 404

**Issue**: Direct navigation to `/blog` returns 404

This shouldn't happen with `netlify.toml` SPA redirect rule, but if it does:
```toml
# Verify this is in netlify.toml:
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Custom Domain Setup

### Add Domain to Netlify

1. **Buy a domain** (Namecheap, Google Domains, etc.)

2. **In Netlify Dashboard**:
   - Site settings → Domain management
   - Add custom domain → Enter your domain
   - Follow DNS configuration instructions

3. **Configure DNS**:
   
   **Option A: Netlify DNS (Recommended)**
   ```
   - Copy nameservers from Netlify
   - Update nameservers in your domain registrar
   - Wait for propagation (up to 48 hours, usually < 1 hour)
   ```

   **Option B: External DNS**
   ```
   Add these records in your DNS provider:
   
   A Record:
   @ → 75.2.60.5
   
   CNAME Record:
   www → your-site-name.netlify.app
   ```

4. **Enable HTTPS**:
   - Netlify automatically provisions SSL certificate
   - Free Let's Encrypt certificate
   - Auto-renewal

## Environment Variables

If you need environment variables:

1. **In Netlify Dashboard**:
   - Site settings → Build & deploy → Environment
   - Click "Edit variables"
   - Add key-value pairs

2. **Example**:
   ```
   GITHUB_TOKEN=your_github_token (optional, for higher API limits)
   MEDIUM_USERNAME=djabaridev
   ```

3. **Access in code**:
   ```typescript
   const config = useRuntimeConfig()
   config.public.mediumUsername
   ```

## Deployment Checklist

- [ ] Repository connected to Netlify
- [ ] Build settings configured correctly
- [ ] Initial deploy successful
- [ ] Site loads correctly
- [ ] API routes working
- [ ] Navigation works (all pages accessible)
- [ ] Dark/light theme toggle works
- [ ] Language toggle works (EN/ID)
- [ ] GitHub projects loading
- [ ] Medium blog posts loading
- [ ] Mobile responsive
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled
- [ ] Performance optimized

## Additional Resources

- [Netlify Docs](https://docs.netlify.com/)
- [Nuxt Deployment Guide](https://nuxt.com/deploy/netlify)
- [Netlify Support](https://answers.netlify.com/)

## Support

Having issues? Check:
1. Netlify build logs for detailed errors
2. Browser console for runtime errors
3. Network tab for failed API requests
4. This guide's troubleshooting section

---

**Note**: Your site is optimized for Netlify with automatic builds, serverless functions, and CDN distribution. Enjoy your deployment! 🎉
