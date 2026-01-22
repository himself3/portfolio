# 🚀 Deployment Guide

Deploy your portfolio to various platforms.

## Vercel (Recommended) ⭐

Vercel is the easiest way to deploy Next.js applications.

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Done!** Your site is live at `your-project.vercel.app`

### Custom Domain (Optional)
- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records as instructed

---

## Netlify

### Steps:

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository
   - Configure build settings
   - Click "Deploy"

---

## GitHub Pages

Not recommended for Next.js (requires static export), but possible:

1. **Update next.config.js**
   ```javascript
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   }
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Deploy**
   - Use `gh-pages` package or GitHub Actions
   - Deploy `out` folder to `gh-pages` branch

---

## AWS Amplify

### Steps:

1. **Install Amplify CLI**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. **Initialize**
   ```bash
   amplify init
   amplify add hosting
   ```

3. **Deploy**
   ```bash
   amplify publish
   ```

---

## Docker

### Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Build & Run

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

---

## Environment Variables

For production, set these in your hosting platform:

```bash
# Optional: Email service for contact form
NEXT_PUBLIC_EMAIL_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAIL_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAIL_PUBLIC_KEY=your_public_key

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

---

## Pre-Deployment Checklist

- [ ] Test production build locally (`npm run build && npm start`)
- [ ] Update all personal information
- [ ] Replace placeholder images
- [ ] Add your resume PDF
- [ ] Update social media links
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Verify contact form
- [ ] Add custom domain (optional)
- [ ] Set up analytics (optional)
- [ ] Test SEO with Google Search Console

---

## Performance Optimization

### Before Deploying:

1. **Optimize Images**
   - Use WebP format
   - Compress with tinypng.com
   - Use Next.js Image component

2. **Code Splitting**
   - Already handled by Next.js
   - Use dynamic imports for heavy components

3. **Caching**
   - Vercel handles this automatically
   - Configure cache headers if self-hosting

4. **Analytics**
   - Add Google Analytics
   - Use Vercel Analytics (free)

---

## Monitoring

### Vercel Analytics
- Automatically enabled on Vercel
- View performance metrics in dashboard

### Google Analytics
1. Create GA4 property
2. Add tracking ID to `.env.local`
3. Add GA script to `app/layout.tsx`

### Uptime Monitoring
- Use UptimeRobot (free)
- Set up alerts for downtime

---

## Continuous Deployment

### Automatic Deployments

Most platforms support automatic deployments:

- **Vercel/Netlify**: Auto-deploy on git push
- **GitHub Actions**: Set up custom workflows

### Example GitHub Action

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      # Add deployment steps
```

---

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Clear cache: `rm -rf .next node_modules && npm install`
- Check for TypeScript errors

### Images Not Loading
- Add domains to `next.config.js`
- Use Next.js Image component
- Check image URLs

### Slow Performance
- Optimize images
- Enable caching
- Use CDN
- Check Lighthouse scores

---

## Support

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

---

Happy Deploying! 🚀
