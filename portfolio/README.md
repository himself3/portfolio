# Modern Portfolio Website

A stunning, professional portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Modern Design**: Dark mode with glassmorphism effects and gradient accents
- **Smooth Animations**: Powered by Framer Motion for buttery-smooth interactions
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **Performance Optimized**: Fast page loads with Next.js 14 App Router
- **SEO Ready**: Optimized meta tags and structured data
- **Accessible**: WCAG 2.1 compliant components
- **Easy to Customize**: Clean code structure with customizable variables

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter & Space Grotesk (Google Fonts)

## 📦 Installation

1. Clone the repository or navigate to the portfolio folder:
```bash
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Customization

### Personal Information

Edit the content in the following files:

- `app/layout.tsx` - Update metadata (title, description)
- `components/sections/Hero.tsx` - Your name and roles
- `components/sections/About.tsx` - About section content and stats
- `components/sections/Skills.tsx` - Your skills and proficiency levels
- `components/sections/Projects.tsx` - Your projects
- `components/sections/Experience.tsx` - Work experience and education
- `components/sections/Contact.tsx` - Contact information and social links

### Colors & Theme

Customize colors in `tailwind.config.ts` and `app/globals.css`:

```css
/* In globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* Add your custom colors */
}
```

### Images

Replace placeholder images with your own:
- Profile photo in `About.tsx`
- Project screenshots in `Projects.tsx`
- Update `next.config.js` to include your image domains

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and utilities
├── components/
│   ├── sections/
│   │   ├── Hero.tsx        # Landing section
│   │   ├── About.tsx       # About section
│   │   ├── Skills.tsx      # Skills section
│   │   ├── Projects.tsx    # Projects showcase
│   │   ├── Experience.tsx  # Timeline section
│   │   ├── Contact.tsx     # Contact form
│   │   └── Footer.tsx      # Footer section
│   ├── Navigation.tsx      # Navigation bar
│   ├── BackgroundEffects.tsx  # Animated background
│   └── theme-provider.tsx  # Theme context
├── lib/
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

Build the production version:
```bash
npm run build
npm start
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💬 Support

If you have any questions or need help, feel free to reach out!

---

Made with ❤️ and lots of coffee
