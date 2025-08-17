// Utility functions for the portfolio website

// Throttle function to limit how often a function can be called
export function throttle(func, limit) {
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

// Debounce function to delay execution until after a pause
export function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Local storage wrapper with error handling
export const store = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.warn('Failed to get from localStorage:', e);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('Failed to set localStorage:', e);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn('Failed to remove from localStorage:', e);
      return false;
    }
  }
};

// Clamp a value between min and max
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Get random number between min and max
export function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Get random integer between min and max
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Format number with commas
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Check if element is in viewport
export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Get distance from top of page
export function getDistanceFromTop(element) {
  const rect = element.getBoundingClientRect();
  return rect.top + window.pageYOffset;
}

// Smooth scroll to element
export function scrollToElement(element, offset = 0) {
  const elementPosition = getDistanceFromTop(element);
  const offsetPosition = elementPosition - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

// Add CSS class with animation
export function addClassWithAnimation(element, className, animationDuration = 300) {
  element.classList.add(className);
  setTimeout(() => {
    element.classList.remove(className);
  }, animationDuration);
}

// Remove CSS class with animation
export function removeClassWithAnimation(element, className, animationDuration = 300) {
  element.classList.remove(className);
  setTimeout(() => {
    element.classList.add(className);
  }, animationDuration);
}

// Check if device is mobile
export function isMobile() {
  return window.innerWidth <= 768;
}

// Check if device supports touch
export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Get current scroll position
export function getScrollPosition() {
  return window.pageYOffset || document.documentElement.scrollTop;
}

// Get document height
export function getDocumentHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
}

// Get viewport dimensions
export function getViewportDimensions() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight
  };
}

// Preload image
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Wait for a specified amount of time
export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate unique ID
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
