# 🚀 Yossef Salem - Personal Portfolio Website

A fully animated and responsive personal portfolio website built with modern web technologies. Features smooth animations, mobile-first design, and an engaging user experience.

## ✨ Features

### 🎨 **Design & Animations**
- **Smooth Animations**: CSS transitions, GSAP animations, and scroll-triggered effects
- **Modern UI**: Clean, professional design with gradient accents and glassmorphism effects
- **Responsive Layout**: Mobile-first design that adapts to all screen sizes
- **Dark/Light Theme**: Automatic theme switching with manual toggle option

### 🎭 **Interactive Elements**
- **Hero Section**: Animated introduction with typing effects and floating elements
- **Navigation**: Smooth hamburger menu for mobile with animated transitions
- **Cards**: Hover effects with 3D transforms and staggered animations
- **Timeline**: Animated experience section with scroll-triggered reveals
- **Contact Form**: Real-time validation with smooth error animations

### 📱 **Mobile Experience**
- **Touch Optimized**: Smooth touch interactions and mobile-friendly navigation
- **Performance**: Optimized animations that disable on mobile for better performance
- **Responsive Grid**: Adaptive layouts that stack beautifully on small screens

### 🚀 **Performance Features**
- **Lazy Loading**: Images and content load as needed
- **Smooth Scrolling**: Native smooth scrolling with fallbacks
- **Progress Bar**: Visual scroll progress indicator
- **Loading Screen**: Engaging loading animation with progress bar

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with custom properties, Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Modular code with modern JavaScript features
- **GSAP**: Professional-grade animations and scroll triggers
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

## 📁 Project Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles/
│   └── style.css      # Main stylesheet with animations
├── scripts/
│   ├── main.js        # Main JavaScript functionality
│   ├── utils.js       # Utility functions
│   └── animations.js  # GSAP animations
├── assets/
│   ├── avatar.png     # Profile image
│   └── icons/         # SVG icons for skills
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Customize** the content in the HTML file
4. **Modify** colors and styles in `styles/style.css`
5. **Update** animations in `scripts/animations.js`

### Development Setup

For local development with live reload:

```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx serve .

# Using PHP (if installed)
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎨 Customization

### Colors & Themes
Modify the CSS custom properties in `:root`:

```css
:root {
  --accent: #0ea5e9;        /* Primary accent color */
  --accent-2: #22d3ee;      /* Secondary accent color */
  --bg: #0b1220;            /* Background color */
  --text: #e6eefc;          /* Text color */
  /* ... more variables */
}
```

### Content Updates
- **Personal Info**: Update name, title, and contact information in `index.html`
- **Skills**: Modify the skills grid in the skills section
- **Projects**: Add your projects to the projects section
- **Experience**: Update the timeline with your work history

### Animations
Customize animations in `scripts/animations.js`:

```javascript
// Modify animation durations
const heroTl = gsap.timeline({ delay: 0.5 });

// Adjust scroll trigger settings
scrollTrigger: {
  trigger: section,
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none reverse"
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: 768px - 1024px
- **Large Desktop**: > 1024px

## 🎯 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Fallbacks**: Graceful degradation for older browsers

## 🚀 Performance Tips

1. **Optimize Images**: Use WebP format and appropriate sizes
2. **Minimize CSS/JS**: Use minified versions in production
3. **Lazy Load**: Images and non-critical content
4. **CDN**: Use CDN for external libraries (GSAP)
5. **Compression**: Enable gzip compression on your server

## 🔧 Troubleshooting

### Common Issues

**Animations not working?**
- Check if GSAP is loaded properly
- Verify browser console for errors
- Ensure elements have correct `data-animate` attributes

**Mobile menu not working?**
- Check JavaScript console for errors
- Verify CSS classes are applied correctly
- Test on different mobile devices

**Theme toggle not working?**
- Check localStorage permissions
- Verify theme toggle button exists
- Check browser console for errors

### Debug Mode

Enable debug mode by adding this to the console:

```javascript
// Enable GSAP debug mode
gsap.config({ nullTargetWarn: false });

// Check if animations are working
console.log('GSAP loaded:', typeof gsap !== 'undefined');
console.log('ScrollTrigger loaded:', typeof ScrollTrigger !== 'undefined');
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help:

- **Email**: yosefsalim123@gmail.com
- **GitHub**: [yossefmagdii](https://github.com/yossefmagdii)
- **LinkedIn**: [yossef-salem](https://linkedin.com/in/yossef-salem)

## 🎉 Acknowledgments

- **GSAP** for powerful animation capabilities
- **Modern CSS** for responsive design features
- **Web standards** for accessibility and performance

---

**Built with ❤️ by Yossef Salem**

*IT Support Specialist & Aspiring DevOps Engineer*
