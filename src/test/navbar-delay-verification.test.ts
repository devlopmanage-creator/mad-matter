import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('Navbar Delay Verification', () => {
  it('should verify that delayed hide timeout has been removed', () => {
    // Read the Navigation.astro file
    const navigationFile = readFileSync(
      join(process.cwd(), 'src/components/Navigation.astro'), 
      'utf8'
    )
    
    // Check that the old timeout code has been removed
    const hasOldTimeoutCode = navigationFile.includes('hoverTimeout = setTimeout(() => {') &&
                              navigationFile.includes('nav?.classList.remove(\'dropdown-open\')')
    
    expect(hasOldTimeoutCode).toBe(false)
  })

  it('should verify that immediate hide is implemented', () => {
    const navigationFile = readFileSync(
      join(process.cwd(), 'src/components/Navigation.astro'), 
      'utf8'
    )
    
    // Check that immediate hide is implemented for dropdown items
    const hasImmediateHideForItems = navigationFile.includes('item.addEventListener(\'mouseleave\', () => {') &&
                                     navigationFile.includes('nav?.classList.remove(\'dropdown-open\')')
    
    // Check that immediate hide is implemented for dropdown menus
    const hasImmediateHideForMenus = navigationFile.includes('menu.addEventListener(\'mouseleave\', () => {') &&
                                     navigationFile.includes('nav?.classList.remove(\'dropdown-open\')')
    
    expect(hasImmediateHideForItems).toBe(true)
    expect(hasImmediateHideForMenus).toBe(true)
  })

  it('should verify that menu hover timeout has been removed', () => {
    const navigationFile = readFileSync(
      join(process.cwd(), 'src/components/Navigation.astro'), 
      'utf8'
    )
    
    // Check that menu hover timeout has been removed
    const hasMenuTimeout = navigationFile.includes('menuHoverTimeout = setTimeout(() => {') &&
                          navigationFile.includes('nav?.classList.remove(\'dropdown-open\')')
    
    expect(hasMenuTimeout).toBe(false)
  })

  it('should verify that both dropdown and menu have immediate hide', () => {
    const navigationFile = readFileSync(
      join(process.cwd(), 'src/components/Navigation.astro'), 
      'utf8'
    )
    
    // Check for immediate hide in dropdown items
    const hasItemImmediateHide = navigationFile.includes('item.addEventListener(\'mouseleave\', () => {') &&
                                 navigationFile.includes('nav?.classList.remove(\'dropdown-open\')')
    
    // Check for immediate hide in dropdown menus  
    const hasMenuImmediateHide = navigationFile.includes('menu.addEventListener(\'mouseleave\', () => {') &&
                                navigationFile.includes('nav?.classList.remove(\'dropdown-open\')')
    
    expect(hasItemImmediateHide).toBe(true)
    expect(hasMenuImmediateHide).toBe(true)
  })

  it('should verify no setTimeout calls for mouse leave dropdown hide', () => {
    const navigationFile = readFileSync(
      join(process.cwd(), 'src/components/Navigation.astro'), 
      'utf8'
    )
    
    // Check that there are no setTimeout calls in mouseleave event handlers
    // Look for the specific pattern of setTimeout in mouseleave handlers
    const lines = navigationFile.split('\n')
    let hasSetTimeoutInMouseLeave = false
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line.includes('mouseleave') && line.includes('addEventListener')) {
        // Check the next few lines for setTimeout
        for (let j = i; j < Math.min(i + 10, lines.length); j++) {
          if (lines[j].includes('setTimeout') && lines[j].includes('dropdown-open')) {
            hasSetTimeoutInMouseLeave = true
            break
          }
        }
      }
    }
    
    expect(hasSetTimeoutInMouseLeave).toBe(false)
  })
})
