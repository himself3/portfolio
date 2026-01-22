# Portfolio Animations & Effects Guide

## Color Scheme
Your portfolio now features a vibrant **two-color gradient theme**:
- **Color 1**: Cyan (`hsl(189, 94%, 43%)`)
- **Color 2**: Purple (`hsl(271, 81%, 56%)`)

## Text Effects

### Gradient Text
- All major headings now have animated gradient text
- Smooth color transitions between cyan and purple
- Applied to: Hero name, section titles, role text

### Glow Effect
- Hero name has a pulsing glow effect
- Creates depth and draws attention
- Subtle animation that doesn't distract

## Animations

### Hero Section
- **Gradient text** on name with glow effect
- **Floating stats cards** with staggered animations
- **Gradient borders** with pulse glow on stat cards
- **Gradient buttons** with hover slide effects
- **Shimmer effect** on Download CV button

### Skills Section
- **Gradient progress bars** with shimmer animation
- **Gradient category buttons** when active
- **Gradient borders** on technology tags
- **Shimmer effects** on hover

### Projects Section
- **Gradient borders** on project cards
- **Gradient overlay** on image hover
- **Pulse glow** on action buttons
- **Scale and rotate** animations on hover
- **Gradient button** for "View All Projects"

### About Section
- **Floating highlight cards** with gradient icons
- **Gradient borders** on technology tags
- **Shimmer effects** throughout

### Experience Section
- **Gradient icons** for work/education
- **Gradient borders** on timeline cards

### Contact Section
- **Gradient icons** on contact info cards
- **Gradient submit button** with slide effect
- **Gradient borders** on form container

### Navigation
- **Gradient logo** with glow effect
- **Gradient scroll progress bar** at top

## CSS Classes Available

- `.gradient-text` - Animated gradient text
- `.glow-text` - Pulsing glow effect
- `.gradient-border` - Animated gradient border
- `.float-animation` - Floating up/down animation
- `.shimmer` - Shimmer overlay effect
- `.pulse-glow` - Pulsing glow shadow
- `.gradient-bg` - Gradient background

## Customization

To change the color scheme, edit the CSS variables in `app/globals.css`:

```css
--color-1: 189 94% 43%; /* Cyan */
--color-2: 271 81% 56%; /* Purple */
```

Try these alternatives:
- **Blue/Pink**: `--color-1: 210 100% 50%` / `--color-2: 330 100% 60%`
- **Green/Blue**: `--color-1: 160 100% 40%` / `--color-2: 210 100% 50%`
- **Orange/Red**: `--color-1: 30 100% 50%` / `--color-2: 0 100% 50%`
