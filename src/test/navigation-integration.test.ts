import { describe, it, expect, beforeEach, vi } from 'vitest'
import { JSDOM } from 'jsdom'

// Mock DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable'
})

global.window = dom.window as any
global.document = dom.window.document
global.HTMLElement = dom.window.HTMLElement
global.Element = dom.window.Element
global.Node = dom.window.Node
global.Event = dom.window.Event
global.MouseEvent = dom.window.MouseEvent
global.KeyboardEvent = dom.window.KeyboardEvent

// Mock scroll behavior
Object.defineProperty(window, 'scrollY', {
  writable: true,
  value: 0
})

Object.defineProperty(document.documentElement, 'scrollTop', {
  writable: true,
  value: 0
})

describe('Navigation Integration Tests', () => {
  beforeEach(() => {
    // Clear DOM
    document.body.innerHTML = ''
    
    // Create the actual navbar HTML structure from Navigation.astro
    const navbarHTML = `
      <nav id="mainNav">
        <div class="nav-container">
          <div class="logo">
            <a href="/">Famuae</a>
          </div>
          <ul class="desktop-nav">
            <li class="has-dropdown">
              <a href="/" class="nav-link">
                Home
                <svg class="chevron-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </a>
              <div class="dropdown-menu">
                <button class="dropdown-close" aria-label="Close dropdown">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <div class="dropdown-content">
                  <div class="dropdown-left">
                    <div class="dropdown-header">
                      <h3 class="dropdown-title">Home</h3>
                      <p class="dropdown-description">Explore premium building materials and featured brands for your projects.</p>
                    </div>
                    <div class="dropdown-list">
                      <a href="/#home" class="dropdown-item">Overview</a>
                      <a href="/#brands" class="dropdown-item">Featured Brands</a>
                      <a href="/#wonda" class="dropdown-item">Wonda</a>
                      <a href="/#contact" class="dropdown-item">Radaway</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="has-dropdown">
              <a href="/about-us" class="nav-link">
                About Us
                <svg class="chevron-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </a>
              <div class="dropdown-menu">
                <button class="dropdown-close" aria-label="Close dropdown">×</button>
                <div class="dropdown-content">
                  <div class="dropdown-left">
                    <div class="dropdown-header">
                      <h3 class="dropdown-title">About Us</h3>
                      <p class="dropdown-description">Learn about our journey, innovation, and commitment to excellence in building materials.</p>
                    </div>
                    <div class="dropdown-list">
                      <a href="/about-us#who-we-are" class="dropdown-item">Who We Are</a>
                      <a href="/about-us#achievements" class="dropdown-item">Our Achievements</a>
                      <a href="/about-us#innovation" class="dropdown-item">What We Offer</a>
                      <a href="/about-us#commitment" class="dropdown-item">Our Values</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a href="https://wa.me/15551234567?text=Hello%2C%20I%27m%20interested%20in%20your%20building%20materials%20and%20services" class="nav-link">Contact</a>
            </li>
          </ul>
          <div class="nav-actions">
            <button class="menu-toggle" aria-label="Toggle menu" id="menuToggle">
              <span class="menu-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </nav>
      <div class="menu-overlay" id="menuOverlay">
        <div class="menu-content">
          <div class="menu-items">
            <div class="menu-item" data-index="0">
              <div class="menu-item-wrapper">
                <a href="/" class="menu-link">Home</a>
                <button class="dropdown-toggle" aria-label="Toggle Home submenu">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
              </div>
              <div class="submenu">
                <a href="/#home" class="submenu-link">Overview</a>
                <a href="/#brands" class="submenu-link">Featured Brands</a>
                <a href="/#wonda" class="submenu-link">Wonda</a>
                <a href="/#contact" class="submenu-link">Radaway</a>
              </div>
            </div>
            <div class="menu-item" data-index="1">
              <div class="menu-item-wrapper">
                <a href="/about-us" class="menu-link">About Us</a>
                <button class="dropdown-toggle" aria-label="Toggle About Us submenu">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
              </div>
              <div class="submenu">
                <a href="/about-us#who-we-are" class="submenu-link">Who We Are</a>
                <a href="/about-us#achievements" class="submenu-link">Our Achievements</a>
                <a href="/about-us#innovation" class="submenu-link">What We Offer</a>
                <a href="/about-us#commitment" class="submenu-link">Our Values</a>
              </div>
            </div>
            <div class="menu-item" data-index="2">
              <div class="menu-item-wrapper">
                <a href="https://wa.me/15551234567?text=Hello%2C%20I%27m%20interested%20in%20your%20building%20materials%20and%20services" class="menu-link">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    
    document.body.innerHTML = navbarHTML
    
    // Load the actual JavaScript from Navigation.astro
    const script = `
      document.addEventListener('DOMContentLoaded', () => {
        const nav = document.getElementById('mainNav');
        const menuToggle = document.getElementById('menuToggle');
        const menuOverlay = document.getElementById('menuOverlay');
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        const menuLinks = document.querySelectorAll('.menu-link, .submenu-link');
        const dropdownCloseButtons = document.querySelectorAll('.dropdown-close');
        const dropdownItems = document.querySelectorAll('.has-dropdown');

        // Change navbar background when dropdown is open
        dropdownItems.forEach(item => {
          item.addEventListener('mouseenter', () => {
            nav?.classList.add('dropdown-open');
          });
          
          item.addEventListener('mouseleave', () => {
            nav?.classList.remove('dropdown-open');
          });
        });

        // Also listen to dropdown-menu hover
        const dropdownMenus = document.querySelectorAll('.dropdown-menu');
        dropdownMenus.forEach(menu => {
          menu.addEventListener('mouseenter', () => {
            nav?.classList.add('dropdown-open');
          });
          
          menu.addEventListener('mouseleave', () => {
            nav?.classList.remove('dropdown-open');
          });
        });

        // Close dropdown functionality
        dropdownCloseButtons.forEach(button => {
          button.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = button.closest('.dropdown-menu');
            dropdown?.classList.add('force-hide');
            nav?.classList.remove('dropdown-open');
            setTimeout(() => {
              dropdown?.classList.remove('force-hide');
            }, 500);
          });
        });

        // Scroll effect for navbar with hide/show
        let lastScrollTop = 0;
        let scrollThreshold = 100;

        const handleScroll = () => {
          const currentScroll = window.scrollY || document.documentElement.scrollTop;
          
          // Add/remove scrolled class for background
          if (currentScroll > 50) {
            nav?.classList.add('scrolled');
          } else {
            nav?.classList.remove('scrolled');
          }

          // Hide/show navbar based on scroll direction
          if (currentScroll > scrollThreshold) {
            if (currentScroll > lastScrollTop) {
              // Scrolling down - hide navbar
              nav?.classList.add('nav-hidden');
              nav?.classList.remove('nav-visible');
            } else {
              // Scrolling up - show navbar
              nav?.classList.remove('nav-hidden');
              nav?.classList.add('nav-visible');
            }
          } else {
            // Always show when near top
            nav?.classList.remove('nav-hidden');
            nav?.classList.add('nav-visible');
          }

          lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        };

        window.addEventListener('scroll', handleScroll);

        // Menu toggle
        menuToggle?.addEventListener('click', () => {
          menuToggle.classList.toggle('active');
          menuOverlay?.classList.toggle('active');
          document.body.style.overflow = menuOverlay?.classList.contains('active') ? 'hidden' : '';
        });

        // Dropdown toggles
        dropdownToggles.forEach(toggle => {
          toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const menuItem = toggle.closest('.menu-item');
            const isActive = menuItem?.classList.contains('active');
            
            // Close all other dropdowns
            document.querySelectorAll('.menu-item').forEach(item => {
              if (item !== menuItem) {
                item.classList.remove('active');
              }
            });
            
            // Toggle current dropdown
            menuItem?.classList.toggle('active', !isActive);
          });
        });

        // Close menu when clicking on links
        menuLinks.forEach(link => {
          link.addEventListener('click', () => {
            menuToggle?.classList.remove('active');
            menuOverlay?.classList.remove('active');
            document.body.style.overflow = '';
          });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && menuOverlay?.classList.contains('active')) {
            menuToggle?.classList.remove('active');
            menuOverlay?.classList.remove('active');
            document.body.style.overflow = '';
          }
        });

        // Close menu when clicking overlay background
        menuOverlay?.addEventListener('click', (e) => {
          if (e.target === menuOverlay) {
            menuToggle?.classList.remove('active');
            menuOverlay?.classList.remove('active');
            document.body.style.overflow = '';
          }
        });
      });
    `
    
    // Execute the script
    const scriptElement = document.createElement('script')
    scriptElement.textContent = script
    document.head.appendChild(scriptElement)
    
    // Trigger DOMContentLoaded
    const domContentLoadedEvent = new Event('DOMContentLoaded')
    document.dispatchEvent(domContentLoadedEvent)
  })

  describe('Dropdown Behavior - No Delayed Hide', () => {
    it('should remove dropdown-open class immediately on mouse leave (no timeout)', async () => {
      const nav = document.getElementById('mainNav')!
      const dropdownItem = document.querySelector('.has-dropdown')!
      
      // Hover to open dropdown
      const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true })
      dropdownItem.dispatchEvent(mouseEnterEvent)
      
      expect(nav).toHaveClass('dropdown-open')
      
      // Leave immediately - should remove class without delay
      const mouseLeaveEvent = new MouseEvent('mouseleave', { bubbles: true })
      dropdownItem.dispatchEvent(mouseLeaveEvent)
      
      // Should be removed immediately, not after timeout
      expect(nav).not.toHaveClass('dropdown-open')
    })

    it('should handle rapid hover in/out without delays', () => {
      const nav = document.getElementById('mainNav')!
      const dropdownItem = document.querySelector('.has-dropdown')!
      
      // Rapid hover sequence
      dropdownItem.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      expect(nav).toHaveClass('dropdown-open')
      
      dropdownItem.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
      expect(nav).not.toHaveClass('dropdown-open')
      
      dropdownItem.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      expect(nav).toHaveClass('dropdown-open')
      
      dropdownItem.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
      expect(nav).not.toHaveClass('dropdown-open')
    })
  })

  describe('Scroll Behavior', () => {
    it('should hide navbar when scrolling down past threshold', () => {
      const nav = document.getElementById('mainNav')!
      
      // Simulate scrolling down
      Object.defineProperty(window, 'scrollY', { value: 150 })
      Object.defineProperty(document.documentElement, 'scrollTop', { value: 150 })
      
      const scrollEvent = new Event('scroll')
      window.dispatchEvent(scrollEvent)
      
      expect(nav).toHaveClass('nav-hidden')
      expect(nav).not.toHaveClass('nav-visible')
    })

    it('should show navbar when scrolling up', () => {
      const nav = document.getElementById('mainNav')!
      
      // First scroll down
      Object.defineProperty(window, 'scrollY', { value: 200 })
      window.dispatchEvent(new Event('scroll'))
      expect(nav).toHaveClass('nav-hidden')
      
      // Then scroll up
      Object.defineProperty(window, 'scrollY', { value: 100 })
      window.dispatchEvent(new Event('scroll'))
      
      expect(nav).not.toHaveClass('nav-hidden')
      expect(nav).toHaveClass('nav-visible')
    })
  })

  describe('Mobile Menu Functionality', () => {
    it('should toggle mobile menu correctly', () => {
      const menuToggle = document.getElementById('menuToggle')!
      const menuOverlay = document.getElementById('menuOverlay')!
      
      // Initial state
      expect(menuToggle).not.toHaveClass('active')
      expect(menuOverlay).not.toHaveClass('active')
      
      // Click to open
      menuToggle.click()
      expect(menuToggle).toHaveClass('active')
      expect(menuOverlay).toHaveClass('active')
      expect(document.body.style.overflow).toBe('hidden')
      
      // Click to close
      menuToggle.click()
      expect(menuToggle).not.toHaveClass('active')
      expect(menuOverlay).not.toHaveClass('active')
      expect(document.body.style.overflow).toBe('')
    })

    it('should close mobile menu on escape key', () => {
      const menuToggle = document.getElementById('menuToggle')!
      const menuOverlay = document.getElementById('menuOverlay')!
      
      // Open menu
      menuToggle.click()
      expect(menuOverlay).toHaveClass('active')
      
      // Press escape
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
      document.dispatchEvent(escapeEvent)
      
      expect(menuToggle).not.toHaveClass('active')
      expect(menuOverlay).not.toHaveClass('active')
    })
  })

  describe('Accessibility Features', () => {
    it('should have proper ARIA attributes', () => {
      const menuToggle = document.getElementById('menuToggle')!
      const dropdownClose = document.querySelector('.dropdown-close')!
      const dropdownToggle = document.querySelector('.dropdown-toggle')!
      
      expect(menuToggle).toHaveAttribute('aria-label', 'Toggle menu')
      expect(dropdownClose).toHaveAttribute('aria-label', 'Close dropdown')
      expect(dropdownToggle).toHaveAttribute('aria-label', 'Toggle Home submenu')
    })

    it('should handle external links correctly', () => {
      const contactLink = document.querySelector('a[href*="wa.me"]')!
      expect(contactLink).toHaveAttribute('target', '_blank')
      expect(contactLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
