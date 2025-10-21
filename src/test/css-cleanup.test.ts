import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('CSS Cleanup - Remove Old Gray Line', () => {
  it('should verify that old gray background is removed from bridge', () => {
    const navigationFile = readFileSync(
      join(process.cwd(), 'src/components/Navigation.astro'), 
      'utf8'
    )
    
    // Check that the old gray background is no longer used
    const hasOldGrayBackground = navigationFile.includes('background: #1a1a1a')
    
    expect(hasOldGrayBackground).toBe(false)
  })

  it('should verify that bridge is now transparent', () => {
    const navigationFile = readFileSync(
      join(process.cwd(), 'src/components/Navigation.astro'), 
      'utf8'
    )
    
    // Check that bridge is now transparent
    const hasTransparentBridge = navigationFile.includes('background: transparent')
    
    expect(hasTransparentBridge).toBe(true)
  })

  it('should verify no solid gray/black backgrounds in dropdown area', () => {
    const navigationFile = readFileSync(
      join(process.cwd(), 'src/components/Navigation.astro'), 
      'utf8'
    )
    
    // Check for any remaining solid backgrounds that could cause gray lines
    const hasSolidGray = navigationFile.includes('background: #') && 
                        !navigationFile.includes('background: #bfa16b') // Allow gold color for accents
    
    expect(hasSolidGray).toBe(false)
  })

  it('should verify dropdown has proper transparent background', () => {
    const navigationFile = readFileSync(
      join(process.cwd(), 'src/components/Navigation.astro'), 
      'utf8'
    )
    
    // Check that dropdown has proper transparent background
    const hasProperDropdownBackground = navigationFile.includes('background: rgba(0, 0, 0, 0.95)')
    
    expect(hasProperDropdownBackground).toBe(true)
  })

  it('should verify no old CSS artifacts remain', () => {
    const navigationFile = readFileSync(
      join(process.cwd(), 'src/components/Navigation.astro'), 
      'utf8'
    )
    
    // Check for any old CSS patterns that could cause visual issues
    const hasOldPatterns = navigationFile.includes('background: #1a1a1a') ||
                           navigationFile.includes('background: #000000') ||
                           navigationFile.includes('background: #333')
    
    expect(hasOldPatterns).toBe(false)
  })
})
