// Utility functions (inline to avoid module loading issues)
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

const store = {
  get: (key) => {
    try {
      // Try localStorage first
      if (typeof localStorage !== 'undefined') {
        const item = localStorage.getItem(key);
        if (item) {
          console.log('store.get - localStorage value for', key, ':', item);
          return JSON.parse(item);
        }
      }
      
      // Try sessionStorage as fallback
      if (typeof sessionStorage !== 'undefined') {
        const item = sessionStorage.getItem(key);
        if (item) {
          console.log('store.get - sessionStorage value for', key, ':', item);
          return JSON.parse(item);
        }
      }
      
      // Try cookies as last resort
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [cookieKey, cookieValue] = cookie.trim().split('=');
        if (cookieKey === key && cookieValue) {
          console.log('store.get - cookie value for', key, ':', cookieValue);
          return JSON.parse(decodeURIComponent(cookieValue));
        }
      }
      
      console.log('store.get - no value found for', key);
      return null;
    } catch (e) {
      console.warn('Failed to get from storage:', e);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      console.log('store.set - setting', key, 'to', value);
      
      // Try localStorage first
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
        console.log('store.set - saved to localStorage');
        return true;
      }
      
      // Try sessionStorage as fallback
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(key, JSON.stringify(value));
        console.log('store.set - saved to sessionStorage');
        return true;
      }
      
      // Try cookies as last resort
      document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))};path=/;max-age=31536000`;
      console.log('store.set - saved to cookies');
      return true;
    } catch (e) {
      console.warn('Failed to set storage:', e);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      // Remove from all storage types
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
      }
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem(key);
      }
      document.cookie = `${key}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      console.log('store.remove - removed from all storage types');
      return true;
    } catch (e) {
      console.warn('Failed to remove from storage:', e);
      return false;
    }
  }
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Simple GSAP animation function (fallback if GSAP fails to load)
function initGSAPAnimations() {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded, using fallback animations');
    // Fallback: add animate class to all data-animate elements
    document.querySelectorAll('[data-animate]').forEach(el => {
      setTimeout(() => {
        el.classList.add('animate');
      }, Math.random() * 1000);
    });
    
    // Fallback hero animations
    setTimeout(() => {
      const title = document.querySelector('.hero__title');
      if (title) title.style.opacity = '1';
    }, 500);
    
    setTimeout(() => {
      const subtitle = document.querySelector('.hero__subtitle');
      if (subtitle) subtitle.style.opacity = '1';
    }, 800);
    
    setTimeout(() => {
      const cta = document.querySelector('.hero__cta');
      if (cta) cta.style.opacity = '1';
    }, 1100);
    
    return;
  }

  // Register ScrollTrigger plugin
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Simple GSAP animations
  gsap.from('.hero__title', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.5
  });

  gsap.from('.hero__subtitle', {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: "power3.out",
    delay: 0.8
  });

  gsap.from('.hero__cta', {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: "power3.out",
    delay: 1.1
  });

  // Animate cards when they come into view
  gsap.utils.toArray('.card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      duration: 0.8,
      y: 60,
      opacity: 0,
      delay: index * 0.1
    });
  });
}

// Theme handling
const THEME_KEY = "yms-theme";

function applyTheme(theme) {
  // theme: "light", "dark", or "auto"
  const html = document.documentElement;
  console.log('applyTheme called with:', theme);
  
  if (theme === "auto") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    html.setAttribute("data-theme", systemTheme);
    console.log('applyTheme - auto mode, set to:', systemTheme);
  } else {
    html.setAttribute("data-theme", theme);
    console.log('applyTheme - set to:', theme);
  }
}

function initThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  
  // Only apply theme if it hasn't been set by the inline script
  if (!window.themeInitialized) {
    const saved = store.get(THEME_KEY) || "auto";
    console.log('initThemeToggle - applying saved theme:', saved);
    applyTheme(saved);
  } else {
    console.log('initThemeToggle - theme already initialized, skipping');
  }

  const updateIcon = () => {
    const current = document.documentElement.getAttribute("data-theme");
    btn.querySelector(".theme-toggle__icon").textContent = current === "dark" ? "🌙" : "☀️";
  };
  updateIcon();

  // Toggle between light/dark/auto cycles
  btn?.addEventListener("click", () => {
    const current = store.get(THEME_KEY) || "auto";
    const next = current === "auto" ? "dark" : current === "dark" ? "light" : "auto";
    
    console.log('Theme toggle - current:', current, 'next:', next);
    
    // Save to multiple storage methods for redundancy
    store.set(THEME_KEY, next);
    
    // Also save to a backup key
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('yms-theme-backup', JSON.stringify(next));
      }
    } catch (e) {
      console.warn('Failed to save backup theme:', e);
    }
    
    applyTheme(next);
    updateIcon();
    
    // Add click animation
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 150);
  });

  // React to system changes when in auto
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if ((store.get(THEME_KEY) || "auto") === "auto") applyTheme("auto");
    updateIcon();
  });
}

// Mobile nav with enhanced animations
function initNav() {
  const toggle = document.querySelector(".nav__toggle");
  const list = document.getElementById("nav-menu");
  const body = document.body;
  
  toggle?.addEventListener("click", () => {
    const open = list.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    
    // Prevent body scroll when mobile menu is open
    if (open) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
    
    // Add click animation
    toggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
      toggle.style.transform = '';
    }, 150);
  });

  // Close when clicking a link (mobile)
  list?.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      list.classList.remove("is-open");
      body.style.overflow = '';
      toggle.setAttribute("aria-expanded", "false");
    });
  });
  
  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!toggle?.contains(e.target) && !list?.contains(e.target)) {
      list?.classList.remove("is-open");
      body.style.overflow = '';
      toggle?.setAttribute("aria-expanded", "false");
    }
  });
}

// Footer year
function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

// Enhanced parallax hero background
function initParallax() {
  const bg = document.querySelector(".hero__bg");
  if (!bg) return;
  
  let ticking = false;
  
  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const rate2 = scrolled * -0.3;
    
    bg.style.transform = `translate3d(${rate2}px, ${rate}px, 0)`;
    ticking = false;
  };
  
  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };
  
  window.addEventListener("scroll", requestTick, { passive: true });
}

// Enhanced scroll progress bar
function initScrollProgress() {
  const progressBar = document.querySelector(".progress__bar");
  if (!progressBar) return;
  
  const updateProgress = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    progressBar.style.width = `${scrollPercent}%`;
  };
  
  window.addEventListener("scroll", throttle(updateProgress, 16), { passive: true });
}

// Enhanced contact form validation + mailto fallback
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const name = form.querySelector("#name");
  const email = form.querySelector("#email");
  const message = form.querySelector("#message");
  const submitBtn = form.querySelector('button[type="submit"]');

  const setError = (el, msg) => {
    const errorEl = el.parentElement.querySelector(".error");
    if (errorEl) {
      errorEl.textContent = msg || "";
      if (msg) {
        el.style.borderColor = '#f87171';
        el.style.boxShadow = '0 0 0 4px rgba(248, 113, 113, 0.2)';
      } else {
        el.style.borderColor = '';
        el.style.boxShadow = '';
      }
    }
  };

  const validate = () => {
    let ok = true;

    if (!name.value.trim()) { 
      setError(name, "Please enter your name."); 
      ok = false; 
    } else { 
      setError(name, ""); 
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { 
      setError(email, "Enter a valid email address."); 
      ok = false; 
    } else { 
      setError(email, ""); 
    }
    
    if (message.value.trim().length < 10) { 
      setError(message, "Message should be at least 10 characters."); 
      ok = false; 
    } else { 
      setError(message, ""); 
    }

    return ok;
  };

  // Real-time validation
  [name, email, message].forEach(field => {
    field.addEventListener("blur", validate);
    field.addEventListener("input", () => {
      if (field.value.trim()) {
        setError(field, "");
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    // Add loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    // Simulate sending (replace with actual form submission)
    setTimeout(() => {
      const subject = encodeURIComponent("Portfolio Contact (Yossef)");
      const body = encodeURIComponent(
        `Name: ${name.value}\nEmail: ${email.value}\n\n${message.value}`
      );
      
      // Reset form
      form.reset();
      submitBtn.textContent = "Sent! ✓";
      submitBtn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
      
      // Mailto fallback opens email client
      window.location.href = `mailto:yosefsalim123@gmail.com?subject=${subject}&body=${body}`;
      
      // Reset button after delay
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.style.background = "";
      }, 3000);
    }, 1000);
  });
}

// Enhanced scroll animations
function initScrollAnimations() {
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported, using fallback animations');
    // Fallback: animate all elements after a delay
    setTimeout(() => {
      document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.add('animate');
      });
    }, 1000);
    return;
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Add staggered animations for grid items
        if (entry.target.classList.contains('skills__grid') || 
            entry.target.classList.contains('certs__grid') || 
            entry.target.classList.contains('portfolio__grid')) {
          const items = entry.target.querySelectorAll('.card');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = '0';
              item.style.transform = 'translateY(20px)';
              item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
              
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              }, 50);
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Enhanced hover effects for cards
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Typing effect for hero title
function initTypingEffect() {
  const title = document.querySelector('.hero__title');
  if (!title) return;
  
  const text = title.innerHTML;
  title.innerHTML = '';
  title.style.opacity = '1';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      title.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  };
  
  // Start typing after a delay
  setTimeout(typeWriter, 1000);
}

// Loading screen management
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;
  
  // Animate progress bar
  const progressFill = loadingScreen.querySelector('.loading-progress-fill');
  const progressText = loadingScreen.querySelector('.loading-progress-text');
  
  if (progressFill && progressText) {
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15 + 5; // Random progress increments
      if (progress > 100) progress = 100;
      
      progressFill.style.width = `${progress}%`;
      progressText.textContent = `${Math.round(progress)}%`;
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        // Hide loading screen after progress completes
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          setTimeout(() => {
            loadingScreen.remove();
          }, 800);
        }, 500);
      }
    }, 100);
  }
  
  // Fallback: hide after 2.5 seconds if progress doesn't complete
  setTimeout(() => {
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.remove();
      }, 800);
    }
  }, 2500);
  
  // Emergency fallback: hide after 3.5 seconds no matter what
  setTimeout(() => {
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.remove();
      }, 800);
    }
  }, 3500);
}

// Performance detection
const isLowEndDevice = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  const isMobile = window.innerWidth <= 768;
  const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return isSlowConnection || (isMobile && hasReducedMotion);
};

// Initialize all
document.addEventListener("DOMContentLoaded", () => {
  console.log('DOM Content Loaded - Starting initialization...');
  
  // Performance mode detection
  const performanceMode = isLowEndDevice();
  console.log('Performance mode:', performanceMode ? 'low-end' : 'high-end');
  
  try {
    initLoadingScreen();
    console.log('Loading screen initialized');
    initThemeToggle();
    console.log('Theme toggle initialized');
    initNav();
    console.log('Navigation initialized');
    
    // Only initialize heavy features on high-end devices
    if (!performanceMode) {
      initParallax();
      console.log('Parallax initialized');
      initScrollAnimations();
      console.log('Scroll animations initialized');
      initCardHoverEffects();
      console.log('Card hover effects initialized');
      initTypingEffect();
      console.log('Typing effect initialized');
    } else {
      console.log('Skipping heavy animations for performance');
    }
    
    initScrollProgress();
    console.log('Scroll progress initialized');
    setYear();
    console.log('Year set');
    initContactForm();
    console.log('Contact form initialized');
    initSmoothScrolling();
    console.log('Smooth scrolling initialized');
    
    // Initialize GSAP animations only on high-end devices
    if (!performanceMode) {
      setTimeout(() => {
        try {
          initGSAPAnimations();
          console.log('GSAP animations initialized');
        } catch (error) {
          console.warn('GSAP animations failed:', error);
          // Fallback: add animate class to all elements
          document.querySelectorAll('[data-animate]').forEach(el => {
            setTimeout(() => el.classList.add('animate'), Math.random() * 1000);
          });
        }
      }, 100);
    } else {
      // Simple fallback animations for low-end devices
      document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.add('animate');
      });
    }
    
    // Add loading animation class
    document.body.classList.add('loaded');
    console.log('Initialization complete!');
  } catch (error) {
    console.error('Initialization failed:', error);
    // Emergency fallback: hide loading screen and show content
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => loadingScreen.remove(), 500);
    }
  }
});

// Add some performance optimizations
window.addEventListener('load', () => {
  // Remove loading states
  document.querySelectorAll('.loading').forEach(el => {
    el.classList.remove('loading');
  });
});

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Recalculate any layout-dependent values
    if (window.innerWidth > 860) {
      document.body.style.overflow = '';
    }
  }, 250);
});
