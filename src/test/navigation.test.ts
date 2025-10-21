import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/dom'
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

describe('Navigation Component', () => {
  let navElement: HTMLElement
  let menuToggle: HTMLElement
  let menuOverlay: HTMLElement

  beforeEach(() => {
    // Clear DOM
    document.body.innerHTML = ''
    
    // Create navbar HTML structure
    const navbarHTML = `
      <nav id="mainNav">
        <div class="nav-container">
          <div class="logo">
            <a href="/">Famuae</a>
          </div>
          <ul class="desktop-nav">
            <li class="has-dropdown">
              <a href="/" class="nav-link">Home</a>
              <div class="dropdown-menu">
                <button class="dropdown-close" aria-label="Close dropdown">×</button>
                <div class="dropdown-content">
                  <div class="dropdown-left">
                    <div class="dropdown-header">
                      <h3 class="dropdown-title">Home</h3>
                      <p class="dropdown-description">Explore premium building materials</p>
                    </div>
                    <div class="dropdown-list">
                      <a href="/#home" class="dropdown-item">Overview</a>
                      <a href="/#brands" class="dropdown-item">Featured Brands</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <a href="/about-us" class="nav-link">About Us</a>
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
            <div class="menu-item">
              <div class="menu-item-wrapper">
                <a href="/" class="menu-link">Home</a>
                <button class="dropdown-toggle" aria-label="Toggle Home submenu">▼</button>
              </div>
              <div class="submenu">
                <a href="/#home" class="submenu-link">Overview</a>
                <a href="/#brands" class="submenu-link">Featured Brands</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    
    document.body.innerHTML = navbarHTML
    
    // Get elements
    navElement = document.getElementById('mainNav')!
    menuToggle = document.getElementById('menuToggle')!
    menuOverlay = document.getElementById('menuOverlay')!
  })

  describe('Navbar Visibility', () => {
    it('should show navbar by default', () => {
      expect(navElement).not.toHaveClass('nav-hidden')
      expect(navElement).toHaveClass('nav-visible')
    })

    it('should hide navbar when scrolling down', () => {
      // Mock scroll down
      Object.defineProperty(window, 'scrollY', { value: 150 })
      Object.defineProperty(document.documentElement, 'scrollTop', { value: 150 })
      
      const scrollEvent = new Event('scroll')
      window.dispatchEvent(scrollEvent)
      
      expect(navElement).toHaveClass('nav-hidden')
      expect(navElement).not.toHaveClass('nav-visible')
    })

    it('should show navbar when scrolling up', () => {
      // First scroll down
      Object.defineProperty(window, 'scrollY', { value: 150 })
      const scrollDownEvent = new Event('scroll')
      window.dispatchEvent(scrollDownEvent)
      
      expect(navElement).toHaveClass('nav-hidden')
      
      // Then scroll up
      Object.defineProperty(window, 'scrollY', { value: 50 })
      const scrollUpEvent = new Event('scroll')
      window.dispatchEvent(scrollUpEvent)
      
      expect(navElement).not.toHaveClass('nav-hidden')
      expect(navElement).toHaveClass('nav-visible')
    })

    it('should always show navbar when near top', () => {
      Object.defineProperty(window, 'scrollY', { value: 30 })
      const scrollEvent = new Event('scroll')
      window.dispatchEvent(scrollEvent)
      
      expect(navElement).not.toHaveClass('nav-hidden')
      expect(navElement).toHaveClass('nav-visible')
    })
  })

  describe('Dropdown Functionality', () => {
    it('should add dropdown-open class on hover', () => {
      const dropdownItem = document.querySelector('.has-dropdown')!
      
      fireEvent.mouseEnter(dropdownItem)
      
      expect(navElement).toHaveClass('dropdown-open')
    })

    it('should remove dropdown-open class immediately on mouse leave', () => {
      const dropdownItem = document.querySelector('.has-dropdown')!
      
      // First hover to add class
      fireEvent.mouseEnter(dropdownItem)
      expect(navElement).toHaveClass('dropdown-open')
      
      // Then leave - should remove immediately (no delay)
      fireEvent.mouseLeave(dropdownItem)
      expect(navElement).not.toHaveClass('dropdown-open')
    })

    it('should keep dropdown open when hovering over dropdown menu', () => {
      const dropdownItem = document.querySelector('.has-dropdown')!
      const dropdownMenu = document.querySelector('.dropdown-menu')!
      
      // Hover on item
      fireEvent.mouseEnter(dropdownItem)
      expect(navElement).toHaveClass('dropdown-open')
      
      // Move to dropdown menu
      fireEvent.mouseEnter(dropdownMenu)
      expect(navElement).toHaveClass('dropdown-open')
    })

    it('should close dropdown when clicking close button', () => {
      const dropdownItem = document.querySelector('.has-dropdown')!
      const closeButton = document.querySelector('.dropdown-close')!
      
      // Open dropdown
      fireEvent.mouseEnter(dropdownItem)
      expect(navElement).toHaveClass('dropdown-open')
      
      // Click close button
      fireEvent.click(closeButton)
      
      expect(navElement).not.toHaveClass('dropdown-open')
    })
  })

  describe('Mobile Menu', () => {
    it('should toggle mobile menu on button click', () => {
      expect(menuOverlay).not.toHaveClass('active')
      expect(menuToggle).not.toHaveClass('active')
      
      fireEvent.click(menuToggle)
      
      expect(menuOverlay).toHaveClass('active')
      expect(menuToggle).toHaveClass('active')
    })

    it('should close mobile menu when clicking toggle again', () => {
      // Open menu
      fireEvent.click(menuToggle)
      expect(menuOverlay).toHaveClass('active')
      
      // Close menu
      fireEvent.click(menuToggle)
      expect(menuOverlay).not.toHaveClass('active')
    })

    it('should close mobile menu when clicking on links', () => {
      const menuLink = document.querySelector('.menu-link')!
      
      // Open menu
      fireEvent.click(menuToggle)
      expect(menuOverlay).toHaveClass('active')
      
      // Click link
      fireEvent.click(menuLink)
      
      expect(menuOverlay).not.toHaveClass('active')
      expect(menuToggle).not.toHaveClass('active')
    })

    it('should close mobile menu on escape key', () => {
      // Open menu
      fireEvent.click(menuToggle)
      expect(menuOverlay).toHaveClass('active')
      
      // Press escape
      fireEvent.keyDown(document, { key: 'Escape' })
      
      expect(menuOverlay).not.toHaveClass('active')
      expect(menuToggle).not.toHaveClass('active')
    })

    it('should toggle mobile submenu on dropdown toggle click', () => {
      const dropdownToggle = document.querySelector('.dropdown-toggle')!
      const menuItem = document.querySelector('.menu-item')!
      
      // Open mobile menu first
      fireEvent.click(menuToggle)
      
      // Click dropdown toggle
      fireEvent.click(dropdownToggle)
      
      expect(menuItem).toHaveClass('active')
    })
  })

  describe('Scroll Background', () => {
    it('should add scrolled class when scrolled', () => {
      Object.defineProperty(window, 'scrollY', { value: 100 })
      const scrollEvent = new Event('scroll')
      window.dispatchEvent(scrollEvent)
      
      expect(navElement).toHaveClass('scrolled')
    })

    it('should remove scrolled class when at top', () => {
      // First scroll down
      Object.defineProperty(window, 'scrollY', { value: 100 })
      const scrollDownEvent = new Event('scroll')
      window.dispatchEvent(scrollDownEvent)
      expect(navElement).toHaveClass('scrolled')
      
      // Then scroll to top
      Object.defineProperty(window, 'scrollY', { value: 10 })
      const scrollUpEvent = new Event('scroll')
      window.dispatchEvent(scrollUpEvent)
      
      expect(navElement).not.toHaveClass('scrolled')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      expect(menuToggle).toHaveAttribute('aria-label', 'Toggle menu')
      expect(document.querySelector('.dropdown-close')).toHaveAttribute('aria-label', 'Close dropdown')
      expect(document.querySelector('.dropdown-toggle')).toHaveAttribute('aria-label', 'Toggle Home submenu')
    })

    it('should prevent body scroll when mobile menu is open', () => {
      fireEvent.click(menuToggle)
      expect(document.body.style.overflow).toBe('hidden')
      
      fireEvent.click(menuToggle)
      expect(document.body.style.overflow).toBe('')
    })
  })
})
