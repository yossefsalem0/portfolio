// GSAP animations for the portfolio website
import { isMobile, isTouchDevice } from './utils.js';

// Initialize GSAP animations
export function initGSAPAnimations() {
  // Check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded, skipping animations');
    return;
  }

  // Register ScrollTrigger plugin
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Hero section animations
  initHeroAnimations();
  
  // Section reveal animations
  initSectionReveals();
  
  // Timeline animations
  initTimelineAnimations();
  
  // Card stagger animations
  initCardAnimations();
  
  // Floating elements
  initFloatingElements();
  
  // Text reveal animations
initTextReveals();

// Enhanced text animations
initEnhancedTextAnimations();
  
  // Parallax effects
  initParallaxEffects();
}

// Hero section entrance animations
function initHeroAnimations() {
  const heroElements = {
    eyebrow: '.eyebrow',
    title: '.hero__title',
    subtitle: '.hero__subtitle',
    cta: '.hero__cta',
    meta: '.hero__meta',
    visual: '.hero__visual',
    chips: '.hero__chips'
  };

  // Create timeline for hero animations
  const heroTl = gsap.timeline({ delay: 0.5 });

  // Stagger the text elements from left
  heroTl.from(heroElements.eyebrow, {
    duration: 1,
    x: -50,
    opacity: 0,
    ease: "power3.out"
  })
  .from(heroElements.title, {
    duration: 1.2,
    x: -60,
    opacity: 0,
    ease: "power3.out"
  }, "-=0.8")
  .from(heroElements.subtitle, {
    duration: 1,
    x: -50,
    opacity: 0,
    ease: "power3.out"
  }, "-=0.6")
  .from(heroElements.cta, {
    duration: 1,
    x: -50,
    opacity: 0,
    ease: "power3.out"
  }, "-=0.4")
  .from(heroElements.meta, {
    duration: 1,
    x: -50,
    opacity: 0,
    ease: "power3.out"
  }, "-=0.2");

  // Animate visual elements from right
  heroTl.from(heroElements.visual, {
    duration: 1.2,
    x: 60,
    opacity: 0,
    scale: 0.9,
    ease: "power3.out"
  }, "-=1.2")
  .from(heroElements.chips, {
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.1,
    ease: "back.out(1.7)"
  }, "-=0.8");

  // Continuous floating animation for hero background
  gsap.to('.hero__bg', {
    y: -20,
    duration: 6,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1
  });
}

// Section reveal animations
function initSectionReveals() {
  const sections = gsap.utils.toArray('.section');
  
  sections.forEach((section, index) => {
    const title = section.querySelector('.section__title');
    const subtitle = section.querySelector('.section__subtitle');
    const content = section.querySelector('.section__header + *');
    
    if (title) {
      gsap.from(title, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out"
      });
    }
    
    if (subtitle) {
      gsap.from(subtitle, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out",
        delay: 0.2
      });
    }
    
    if (content) {
      gsap.from(content, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        duration: 1,
        y: 40,
        opacity: 0,
        ease: "power3.out",
        delay: 0.4
      });
    }
  });
}

// Timeline animations
function initTimelineAnimations() {
  const timelineItems = gsap.utils.toArray('.timeline__item');
  
  timelineItems.forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse"
      },
      duration: 0.8,
      x: -50,
      opacity: 0,
      ease: "power3.out",
      delay: index * 0.2
    });
  });
}

// Card stagger animations
function initCardAnimations() {
  const cardGrids = gsap.utils.toArray('.skills__grid, .certs__grid, .portfolio__grid');
  
  cardGrids.forEach(grid => {
    const cards = grid.querySelectorAll('.card');
    
    gsap.from(cards, {
      scrollTrigger: {
        trigger: grid,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      duration: 0.8,
      y: 60,
      opacity: 0,
      scale: 0.9,
      stagger: 0.1,
      ease: "power3.out"
    });
  });
}

// Floating elements animation
function initFloatingElements() {
  const floatingElements = gsap.utils.toArray('.avatar-ring, .chip');
  
  floatingElements.forEach((el, index) => {
    gsap.to(el, {
      y: -10,
      duration: 2 + index * 0.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: index * 0.2
    });
  });
}

// Text reveal animations
function initTextReveals() {
  // Animate accent text with underline effect
  const accentTexts = gsap.utils.toArray('.accent');
  
  accentTexts.forEach(text => {
    const underline = text.querySelector('::after');
    if (underline) {
      gsap.fromTo(underline, 
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.out",
          delay: 1.5,
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  });
}

// Parallax effects
function initParallaxEffects() {
  if (isMobile()) return; // Disable on mobile for performance
  
  // Parallax for hero background
  gsap.to('.hero__bg', {
    scrollTrigger: {
      trigger: '.hero',
      start: "top top",
      end: "bottom top",
      scrub: 1
    },
    y: -100,
    ease: "none"
  });
  
  // Parallax for avatar
  gsap.to('.avatar-wrap', {
    scrollTrigger: {
      trigger: '.hero',
      start: "top top",
      end: "bottom top",
      scrub: 1
    },
    y: -50,
    ease: "none"
  });
}

// Hover animations for interactive elements
export function initHoverAnimations() {
  // Button hover effects
  const buttons = gsap.utils.toArray('.btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        duration: 0.3,
        scale: 1.05,
        ease: "power2.out"
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        duration: 0.3,
        scale: 1,
        ease: "power2.out"
      });
    });
  });
  
  // Card hover effects
  const cards = gsap.utils.toArray('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        duration: 0.4,
        y: -8,
        scale: 1.02,
        ease: "power2.out"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        duration: 0.4,
        y: 0,
        scale: 1,
        ease: "power2.out"
      });
    });
  });
}

// Enhanced text animations for hero section
function initEnhancedTextAnimations() {
  // Animate greeting characters
  const greetingChars = gsap.utils.toArray('.hero__greeting .char');
  
  if (greetingChars.length > 0) {
    gsap.set(greetingChars, { opacity: 0, y: 20, rotationX: -90 });
    
    gsap.to(greetingChars, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 0.3
    });
  }
  
  // Animate subtitle words
  const subtitleWords = gsap.utils.toArray('.hero__subtitle .word');
  
  if (subtitleWords.length > 0) {
    gsap.set(subtitleWords, { opacity: 0, y: 30, scale: 0.8 });
    
    gsap.to(subtitleWords, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 1.0
    });
  }
  
  // Add hover effects to words
  subtitleWords.forEach(word => {
    word.addEventListener('mouseenter', () => {
      gsap.to(word, {
        duration: 0.3,
        scale: 1.1,
        color: 'var(--accent)',
        ease: "power2.out"
      });
    });
    
    word.addEventListener('mouseleave', () => {
      gsap.to(word, {
        duration: 0.3,
        scale: 1,
        color: 'inherit',
        ease: "power2.out"
      });
    });
  });
  
  // Simple button animations
  initSimpleButtonAnimations();
  
  // Simple social icon animations
  initSocialIconAnimations();
}

// Simple button animations
function initSimpleButtonAnimations() {
  const simpleBtn = document.querySelector('.simple-btn');
  const btnText = document.querySelector('.btn__text');
  const btnArrow = document.querySelector('.btn__arrow');
  
  if (!simpleBtn) return;
  
  // Initial state
  gsap.set(simpleBtn, { 
    opacity: 0,
    y: 30,
    scale: 0.9
  });
  
  // Button entrance animation
  gsap.to(simpleBtn, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    ease: "power2.out",
    delay: 2.0
  });
  
  // Text reveal animation
  if (btnText) {
    gsap.set(btnText, { opacity: 0, y: 10 });
    gsap.to(btnText, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 2.3
    });
  }
  
  // Modern hover effects
  simpleBtn.addEventListener('mouseenter', () => {
    gsap.to(simpleBtn, {
      y: -3,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out"
    });
    
    gsap.to(btnArrow, {
      x: 6,
      duration: 0.4,
      ease: "power2.out"
    });
    
    // Add subtle text glow
    gsap.to(btnText, {
      textShadow: "0 0 10px rgba(255,255,255,0.5)",
      duration: 0.4,
      ease: "power2.out"
    });
  });
  
  simpleBtn.addEventListener('mouseleave', () => {
    gsap.to(simpleBtn, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
    
    gsap.to(btnArrow, {
      x: 0,
      duration: 0.4,
      ease: "power2.out"
    });
    
    // Remove text glow
    gsap.to(btnText, {
      textShadow: "none",
      duration: 0.4,
      ease: "power2.out"
    });
  });
  
  // Simple click effect
  simpleBtn.addEventListener('click', () => {
    gsap.to(simpleBtn, {
      scale: 0.98,
      duration: 0.1,
      ease: "power2.in",
      yoyo: true,
      repeat: 1
    });
  });
}

// Simple social icon animations
function initSocialIconAnimations() {
  const socialIcons = gsap.utils.toArray('.social-icon');
  
  if (socialIcons.length === 0) return;
  
  // Initial state for social icons
  gsap.set(socialIcons, { 
    opacity: 0, 
    y: 20,
    scale: 0.9
  });
  
  // Staggered entrance animation
  gsap.to(socialIcons, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    delay: 1.0
  });
  
  // Simple hover effects for each icon
  socialIcons.forEach((icon, index) => {
    const svg = icon.querySelector('svg');
    
    // Mouse enter effects
    icon.addEventListener('mouseenter', () => {
      // Icon lift and scale
      gsap.to(icon, {
        y: -4,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // SVG scale effect
      if (svg) {
        gsap.to(svg, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
      
      // Add subtle glow effect
      gsap.to(icon, {
        boxShadow: "0 8px 20px rgba(14, 165, 233, 0.3)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    // Mouse leave effects
    icon.addEventListener('mouseleave', () => {
      // Reset icon position and scale
      gsap.to(icon, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Reset SVG
      if (svg) {
        gsap.to(svg, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
      
      // Remove glow effect
      gsap.to(icon, {
        boxShadow: "0 4px 12px rgba(14, 165, 233, 0.2)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    // Simple click effect
    icon.addEventListener('click', () => {
      gsap.to(icon, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.in",
        yoyo: true,
        repeat: 1
      });
    });
  });
}

// Loading animations
export function initLoadingAnimations() {
  // Page load animation
  gsap.from('body', {
    duration: 1,
    opacity: 0,
    ease: "power2.out"
  });
  
  // Header slide down
  gsap.from('.site-header', {
    duration: 1,
    y: -100,
    opacity: 0,
    ease: "power3.out"
  });
}

// Scroll-triggered counter animations
export function initCounterAnimations() {
  const counters = gsap.utils.toArray('[data-counter]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-counter'));
    const duration = 2;
    
    gsap.to(counter, {
      scrollTrigger: {
        trigger: counter,
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      duration: duration,
      innerHTML: target,
      ease: "power2.out",
      snap: { innerHTML: 1 },
      onUpdate: function() {
        const current = Math.round(this.targets()[0].innerHTML);
        if (current === target) {
          this.kill();
        }
      }
    });
  });
}

// Magnetic effect for interactive elements
export function initMagneticEffect() {
  if (isMobile()) return; // Disable on mobile
  
  const magneticElements = gsap.utils.toArray('.btn, .card, .logo');
  
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(el, {
        duration: 0.3,
        x: x * 0.1,
        y: y * 0.1,
        ease: "power2.out"
      });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        duration: 0.3,
        x: 0,
        y: 0,
        ease: "power2.out"
      });
    });
  });
}

// Initialize all animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for GSAP to load
  setTimeout(() => {
    initGSAPAnimations();
    initHoverAnimations();
    initLoadingAnimations();
    initCounterAnimations();
    initMagneticEffect();
  }, 100);
});

// Export for use in main.js
export default {
  initGSAPAnimations,
  initHoverAnimations,
  initLoadingAnimations,
  initCounterAnimations,
  initMagneticEffect
};
