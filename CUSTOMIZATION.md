# Customization Guide

This guide will help you personalize the portfolio website with your own information.

## 🎯 Quick Start Checklist

- [ ] Update personal information in Hero section
- [ ] Add your profile photo
- [ ] Update About section content
- [ ] Add your skills and proficiency levels
- [ ] Add your projects with images
- [ ] Update work experience and education
- [ ] Update contact information
- [ ] Replace resume PDF
- [ ] Update social media links
- [ ] Customize colors (optional)

## 📝 Detailed Instructions

### 1. Hero Section (`components/sections/Hero.tsx`)

```typescript
// Line 8-13: Update your roles
const roles = [
  'Your Role 1',
  'Your Role 2',
  'Your Role 3',
]

// Line 35: Update your name
<span className="gradient-text">Your Name</span>

// Line 50: Update your description
<motion.p>
  Your personal tagline or description
</motion.p>
```

### 2. About Section (`components/sections/About.tsx`)

```typescript
// Line 10-13: Update stats
const stats = [
  { label: 'Years Experience', value: 'X+', icon: Code2 },
  { label: 'Projects Completed', value: 'X+', icon: Zap },
  // ... update all stats
]

// Line 52: Update profile image
<Image
  src="your-image-url-or-path"
  alt="Your Name"
  // ...
/>

// Line 70-90: Update your bio text
<p>Your introduction...</p>
<p>Your expertise...</p>
<p>Your interests...</p>
```

### 3. Skills Section (`components/sections/Skills.tsx`)

```typescript
// Line 13-60: Update skill categories and levels
const skillCategories = [
  {
    name: 'Frontend',
    icon: Globe,
    skills: [
      { name: 'React', level: 95 }, // Update skill name and level (0-100)
      // Add more skills...
    ],
  },
  // Add more categories...
]

// Line 150-160: Update additional skills
{['Skill1', 'Skill2', 'Skill3'].map((tech, index) => (
  // Update with your technologies
))}
```

### 4. Projects Section (`components/sections/Projects.tsx`)

```typescript
// Line 9-60: Update projects array
const projects = [
  {
    title: 'Your Project Name',
    description: 'Project description',
    image: 'project-image-url',
    tags: ['Tech1', 'Tech2', 'Tech3'],
    github: 'https://github.com/yourusername/project',
    demo: 'https://your-project-demo.com',
    featured: true, // Set to true for featured projects
  },
  // Add more projects...
]
```

### 5. Experience Section (`components/sections/Experience.tsx`)

```typescript
// Line 8-50: Update experiences array
const experiences = [
  {
    type: 'work', // or 'education'
    title: 'Your Job Title',
    company: 'Company Name',
    location: 'City, State',
    period: 'Start - End',
    description: 'Job description',
    achievements: [
      'Achievement 1',
      'Achievement 2',
    ],
  },
  // Add more experiences...
]
```

### 6. Contact Section (`components/sections/Contact.tsx`)

```typescript
// Line 28-32: Update contact information
const contactInfo = [
  { icon: Mail, label: 'Email', value: 'your@email.com', href: 'mailto:your@email.com' },
  { icon: Phone, label: 'Phone', value: '+1 (XXX) XXX-XXXX', href: 'tel:+1XXXXXXXXXX' },
  { icon: MapPin, label: 'Location', value: 'Your City, State', href: '#' },
]

// Line 34-37: Update social links
const socialLinks = [
  { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
]
```

### 7. Metadata (`app/layout.tsx`)

```typescript
// Line 18-22: Update SEO metadata
export const metadata: Metadata = {
  title: 'Your Name - Your Title',
  description: 'Your description',
  keywords: ['your', 'keywords', 'here'],
}
```

### 8. Footer (`components/sections/Footer.tsx`)

```typescript
// Line 42: Update brand initials
<div className="text-3xl font-heading font-bold gradient-text mb-4">
  YI  {/* Your Initials */}
</div>

// Line 45: Update tagline
<p className="text-gray-400 text-sm leading-relaxed">
  Your tagline or description
</p>

// Line 95: Update copyright
<p className="text-gray-400 text-sm flex items-center gap-1">
  © {new Date().getFullYear()} Your Name. Made with...
</p>
```

## 🎨 Color Customization

### Update Gradient Colors

In `app/globals.css`, you can customize the gradient colors:

```css
/* Change gradient colors throughout the site */
.gradient-text {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400;
  /* Change to your preferred colors */
}
```

### Update Theme Colors

In `tailwind.config.ts`:

```typescript
extend: {
  colors: {
    // Add your custom colors here
    'custom-purple': '#your-color',
    'custom-cyan': '#your-color',
  },
}
```

## 📸 Images

### Profile Photo
- Replace the Unsplash URL in `About.tsx` with your own image
- Recommended size: 500x500px
- Format: JPG or PNG

### Project Images
- Replace Unsplash URLs in `Projects.tsx`
- Recommended size: 800x600px
- Format: JPG or PNG
- Add your image domains to `next.config.js`

### Resume
- Replace `public/resume.pdf` with your actual resume

## 🔧 Advanced Customization

### Add New Sections
1. Create a new component in `components/sections/`
2. Import and add it to `app/page.tsx`
3. Add navigation link in `components/Navigation.tsx`

### Modify Animations
- Adjust animation durations in component files
- Modify Framer Motion variants for different effects
- Update animation delays for staggered effects

### Change Fonts
- Update font imports in `app/layout.tsx`
- Modify font variables in `tailwind.config.ts`

## 🚀 After Customization

1. Test on different screen sizes
2. Check all links work correctly
3. Verify images load properly
4. Test contact form functionality
5. Run `npm run build` to check for errors
6. Deploy to Vercel or your preferred platform

## 💡 Tips

- Keep descriptions concise and impactful
- Use high-quality images
- Ensure all external links open in new tabs
- Test accessibility with screen readers
- Optimize images before uploading
- Keep the design consistent with your personal brand

---

Need help? Check the main README.md or create an issue!
