# 🔧 Troubleshooting Guide

Common issues and their solutions.

## Installation Issues

### npm install fails

**Problem**: Dependencies won't install

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Or try with legacy peer deps
npm install --legacy-peer-deps
```

### Node version issues

**Problem**: "Unsupported engine" error

**Solution**: Use Node.js 18 or higher
```bash
node --version  # Check version
# Install Node 18+ from nodejs.org
```

## Development Server Issues

### Port 3000 already in use

**Problem**: "Port 3000 is already in use"

**Solutions**:
```bash
# Use different port
npm run dev -- -p 3001

# Or kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or kill process (Mac/Linux)
lsof -ti:3000 | xargs kill
```

### Hot reload not working

**Problem**: Changes don't reflect automatically

**Solutions**:
1. Restart dev server
2. Clear .next folder: `rm -rf .next`
3. Check file watcher limits (Linux)
4. Disable antivirus temporarily

## Build Issues

### Build fails with TypeScript errors

**Problem**: `npm run build` shows type errors

**Solutions**:
```bash
# Check for errors
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# Check specific file
npx tsc --noEmit components/sections/Hero.tsx
```

### Out of memory error

**Problem**: "JavaScript heap out of memory"

**Solution**:
```bash
# Increase memory limit
$env:NODE_OPTIONS="--max-old-space-size=4096"  # Windows PowerShell
npm run build

# Or in package.json
"build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
```

### Module not found errors

**Problem**: "Cannot find module '@/components/...'"

**Solutions**:
1. Check tsconfig.json paths configuration
2. Restart TypeScript server in VS Code
3. Delete .next and node_modules, reinstall

## Styling Issues

### Tailwind classes not working

**Problem**: Styles don't apply

**Solutions**:
1. Check tailwind.config.ts content paths
2. Restart dev server
3. Clear .next folder
4. Verify globals.css imports Tailwind

```typescript
// tailwind.config.ts should include:
content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
]
```

### Custom CSS not loading

**Problem**: Custom styles in globals.css don't work

**Solutions**:
1. Check import in layout.tsx: `import './globals.css'`
2. Restart dev server
3. Check CSS syntax
4. Clear browser cache

### Fonts not loading

**Problem**: Google Fonts don't display

**Solutions**:
1. Check internet connection
2. Verify font imports in layout.tsx
3. Check font variable names match
4. Clear browser cache

## Animation Issues

### Framer Motion animations not working

**Problem**: No animations visible

**Solutions**:
1. Check 'use client' directive at top of file
2. Verify framer-motion is installed
3. Check browser console for errors
4. Test with simple animation first

```tsx
// Add to component
'use client'

import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Test
</motion.div>
```

### Animations are choppy

**Problem**: Poor animation performance

**Solutions**:
1. Use transform properties (not top/left)
2. Add `will-change` CSS property
3. Reduce number of animated elements
4. Use `layoutId` for layout animations
5. Check browser performance

## Image Issues

### Images not loading

**Problem**: Next.js Image component shows error

**Solutions**:

1. Add domain to next.config.js:
```javascript
module.exports = {
  images: {
    domains: ['images.unsplash.com', 'your-domain.com'],
  },
}
```

2. Restart dev server after config change
3. Check image URL is valid
4. Use relative path for local images

### Image optimization errors

**Problem**: "Failed to optimize image"

**Solutions**:
1. Check image format (use JPG, PNG, WebP)
2. Verify image URL is accessible
3. Check image size (not too large)
4. Use `unoptimized` prop temporarily:
```tsx
<Image src="..." alt="..." unoptimized />
```

## Navigation Issues

### Smooth scroll not working

**Problem**: Clicking nav links doesn't scroll smoothly

**Solutions**:
1. Check element IDs match href values
2. Verify scroll-behavior CSS
3. Check for JavaScript errors
4. Test in different browser

### Active section not highlighting

**Problem**: Nav doesn't show active section

**Solutions**:
1. Check section IDs are correct
2. Verify scroll event listener
3. Check intersection observer logic
4. Test scroll position calculations

## Form Issues

### Contact form not submitting

**Problem**: Form submission doesn't work

**Solutions**:
1. Check form validation
2. Verify onSubmit handler
3. Check browser console for errors
4. Test with simple console.log

### Form validation errors

**Problem**: Required fields not validating

**Solutions**:
1. Check `required` attribute on inputs
2. Verify form state management
3. Test HTML5 validation
4. Add custom validation logic

## Deployment Issues

### Vercel deployment fails

**Problem**: Build fails on Vercel

**Solutions**:
1. Check build logs for specific error
2. Test `npm run build` locally first
3. Verify all dependencies in package.json
4. Check Node.js version in Vercel settings
5. Clear Vercel cache and redeploy

### Environment variables not working

**Problem**: Env vars undefined in production

**Solutions**:
1. Add vars in Vercel dashboard
2. Use NEXT_PUBLIC_ prefix for client-side vars
3. Redeploy after adding vars
4. Check var names match exactly

### 404 errors after deployment

**Problem**: Pages show 404 on deployed site

**Solutions**:
1. Check file names and paths
2. Verify App Router structure
3. Check next.config.js settings
4. Clear deployment cache

## Performance Issues

### Slow page load

**Problem**: Website loads slowly

**Solutions**:
1. Optimize images (compress, use WebP)
2. Check bundle size: `npm run build`
3. Use dynamic imports for heavy components
4. Enable caching
5. Use CDN for assets

### High memory usage

**Problem**: Browser uses too much memory

**Solutions**:
1. Reduce number of animations
2. Optimize images
3. Remove unused dependencies
4. Check for memory leaks
5. Use React DevTools Profiler

## Browser Compatibility

### Works in Chrome but not Safari

**Problem**: Features broken in Safari

**Solutions**:
1. Check CSS vendor prefixes
2. Test JavaScript features support
3. Use autoprefixer (already included)
4. Check console for errors
5. Test on actual device

### Mobile layout broken

**Problem**: Responsive design issues

**Solutions**:
1. Test with browser dev tools
2. Check Tailwind breakpoints
3. Verify viewport meta tag
4. Test on actual devices
5. Check touch event handlers

## Common Error Messages

### "Hydration failed"

**Problem**: React hydration mismatch

**Solutions**:
1. Check for client-only code in server components
2. Add 'use client' directive where needed
3. Avoid using Date.now() or Math.random() in render
4. Check for browser-only APIs

### "Cannot read property of undefined"

**Problem**: Accessing undefined variable

**Solutions**:
1. Check data is loaded before accessing
2. Use optional chaining: `data?.property`
3. Add null checks
4. Verify API responses

### "Module not found"

**Problem**: Import path incorrect

**Solutions**:
1. Check file path is correct
2. Verify file extension
3. Check case sensitivity
4. Use @ alias for absolute imports

## Getting More Help

### Debug Steps
1. Check browser console for errors
2. Check terminal for build errors
3. Test in incognito mode
4. Test in different browser
5. Clear all caches
6. Restart dev server
7. Delete .next and node_modules

### Useful Commands
```bash
# Check for errors
npm run lint

# Type check
npx tsc --noEmit

# Clean install
rm -rf .next node_modules package-lock.json
npm install

# Test build
npm run build
npm start

# Check package versions
npm list
```

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Stack Overflow](https://stackoverflow.com)
- [Next.js GitHub Issues](https://github.com/vercel/next.js/issues)

### Still Stuck?

1. Search for error message online
2. Check GitHub issues
3. Ask on Stack Overflow
4. Join Next.js Discord
5. Create detailed bug report

---

**Pro Tip**: Always check the browser console and terminal for error messages first!
