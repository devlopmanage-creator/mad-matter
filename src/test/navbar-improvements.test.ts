import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('Navbar Improvements Verification', () => {
  it('should verify improved dropdown animations', () => {
    const navigationFile = readFileSync(
      join(process.cwd(), 'src/components/Navigation.astro'), 
      'utf8'
    )
    
    // Check for improved cubic-bezier transitions
    const hasImprovedTransitions = navigationFile.includes('cubic-bezier(0.4, 0, 0.2, 1)')
    
    expect(hasImprovedTransitions).toBe(true)
  })

  it('should verify dropdown has better styling', () => {
    const navigationFile = readFileSync(
      join(process.cwd(), 'src/components/Navigation.astro'), 
      'utf8'
    )
    
    // Check for improved dropdown styling
    const hasBoxShadow = navigationFile.includes('box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3)')
    const hasBorderTop = navigationFile.includes('border-top: 1px solid rgba(255, 255, 255, 0.1)')
    const hasBackdropFilter = navigationFile.includes('backdrop-filter: blur(20px)')
    
    expect(hasBoxShadow).toBe(true)
    expect(hasBorderTop).toBe(true)
    expect(hasBackdropFilter).toBe(true)
  })

  it('should verify dropdown items have enhanced hover effects', () => {
    const navigationFile = readFileSync(
      join(process.cwd(), 'src/components/Navigation.astro'), 
      'utf8'
    )
    
    // Check for enhanced hover effects
    const hasHoverTransform = navigationFile.includes('transform: translateX(5px)')
    const hasBeforePseudo = navigationFile.includes('.dropdown-item::before')
    const hasHoverBefore = navigationFile.includes('.dropdown-item:hover::before')
    
    expect(hasHoverTransform).toBe(true)
    expect(hasBeforePseudo).toBe(true)
    expect(hasHoverBefore).toBe(true)
  })

  it('should verify improved close button animations', () => {
    const navigationFile = readFileSync(
      join(process.cwd(), 'src/components/Navigation.astro'), 
      'utf8'
    )
    
    // Check for improved close button
    const hasCloseButtonAnimation = navigationFile.includes('opacity: 0')
    const hasCloseButtonHover = navigationFile.includes('transform: scale(1.1) rotate(90deg)')
    const hasCloseButtonBorder = navigationFile.includes('border: 1px solid rgba(255, 255, 255, 0.2)')
    
    expect(hasCloseButtonAnimation).toBe(true)
    expect(hasCloseButtonHover).toBe(true)
    expect(hasCloseButtonBorder).toBe(true)
  })

  it('should verify navbar has improved dropdown-open styling', () => {
    const navigationFile = readFileSync(
      join(process.cwd(), 'src/components/Navigation.astro'), 
      'utf8'
    )
    
    // Check for improved navbar dropdown styling
    const hasImprovedBackground = navigationFile.includes('background: rgba(0, 0, 0, 0.98) !important')
    const hasImprovedBlur = navigationFile.includes('backdrop-filter: blur(20px) !important')
    const hasNavbarShadow = navigationFile.includes('box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3)')
    
    expect(hasImprovedBackground).toBe(true)
    expect(hasImprovedBlur).toBe(true)
    expect(hasNavbarShadow).toBe(true)
  })

  it('should verify no black box issues in dropdown', () => {
    const navigationFile = readFileSync(
      join(process.cwd(), 'src/components/Navigation.astro'), 
      'utf8'
    )
    
    // Check that dropdown has proper background and no solid black
    const hasProperBackground = navigationFile.includes('background: rgba(0, 0, 0, 0.95)')
    const hasNoSolidBlack = !navigationFile.includes('background: #000')
    
    expect(hasProperBackground).toBe(true)
    expect(hasNoSolidBlack).toBe(true)
  })

  it('should verify improved content padding and spacing', () => {
    const navigationFile = readFileSync(
      join(process.cwd(), 'src/components/Navigation.astro'), 
      'utf8'
    )
    
    // Check for improved content spacing
    const hasImprovedPadding = navigationFile.includes('padding: 2rem')
    const hasImprovedMinHeight = navigationFile.includes('min-height: 400px')
    const hasImprovedLeftPadding = navigationFile.includes('padding: 1.5rem 0 2rem 0')
    
    expect(hasImprovedPadding).toBe(true)
    expect(hasImprovedMinHeight).toBe(true)
    expect(hasImprovedLeftPadding).toBe(true)
  })
})
