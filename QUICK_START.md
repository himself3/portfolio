# 🚀 Quick Start Guide

Get your portfolio up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
cd portfolio
npm install
```

## Step 2: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

## Step 3: Customize Your Content

### Essential Updates (5 minutes)

1. **Your Name & Title** - `components/sections/Hero.tsx`
   - Line 35: Change "John Doe" to your name
   - Line 8-13: Update the roles array with your titles

2. **Contact Info** - `components/sections/Contact.tsx`
   - Line 28-32: Update email, phone, location
   - Line 34-37: Update social media links

3. **About Section** - `components/sections/About.tsx`
   - Line 70-90: Update your bio
   - Line 10-13: Update your stats

### Add Your Projects (10 minutes)

Edit `components/sections/Projects.tsx` (Line 9-60):

```typescript
const projects = [
  {
    title: 'Your Project',
    description: 'What it does',
    image: 'https://your-image-url.com/image.jpg',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/you/project',
    demo: 'https://your-demo.com',
    featured: true,
  },
  // Add more projects...
]
```

### Update Skills (5 minutes)

Edit `components/sections/Skills.tsx` (Line 13-60):

```typescript
skills: [
  { name: 'Your Skill', level: 90 }, // 0-100
  // Add more...
]
```

### Add Experience (10 minutes)

Edit `components/sections/Experience.tsx` (Line 8-50):

```typescript
{
  type: 'work',
  title: 'Your Job Title',
  company: 'Company Name',
  location: 'City, State',
  period: '2020 - Present',
  description: 'What you did',
  achievements: ['Achievement 1', 'Achievement 2'],
}
```

## Step 4: Add Your Images

1. **Profile Photo**: Update image URL in `components/sections/About.tsx` (Line 52)
2. **Project Images**: Update image URLs in `components/sections/Projects.tsx`
3. **Resume**: Replace `public/resume.pdf` with your resume

## Step 5: Update Metadata

Edit `app/layout.tsx` (Line 18-22):

```typescript
export const metadata: Metadata = {
  title: 'Your Name - Your Title',
  description: 'Your description',
  keywords: ['your', 'keywords'],
}
```

## Step 6: Build & Deploy

### Test Production Build

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy!

Your portfolio will be live in minutes! 🎉

## 📚 Next Steps

- Read [CUSTOMIZATION.md](./CUSTOMIZATION.md) for detailed customization
- Check [README.md](./README.md) for full documentation
- Customize colors and animations to match your brand

## 🆘 Common Issues

### Port 3000 already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Images not loading
- Add image domains to `next.config.js`
- Check image URLs are correct

### Build errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

## 💡 Pro Tips

- Use high-quality images (optimize with tinypng.com)
- Keep descriptions concise and impactful
- Test on mobile devices
- Update content regularly
- Add Google Analytics for tracking

---

Need more help? Check the full documentation or create an issue!
