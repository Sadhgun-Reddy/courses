/**
 * Tests for Responsive Design Foundation
 * Task 3.1: Verify mobile-first CSS architecture and breakpoint system
 */

import { describe, it, expect, beforeEach } from 'vitest';

describe('Responsive Design Foundation - Task 3.1', () => {
  let testElement;

  beforeEach(() => {
    // Create a test element
    testElement = document.createElement('div');
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    // Clean up
    if (testElement && testElement.parentNode) {
      testElement.parentNode.removeChild(testElement);
    }
  });

  describe('CSS Custom Properties for Breakpoints', () => {
    it('should define breakpoint custom properties', () => {
      const rootStyles = getComputedStyle(document.documentElement);
      
      // Verify breakpoint values are defined
      expect(rootStyles.getPropertyValue('--breakpoint-mobile').trim()).toBe('0px');
      expect(rootStyles.getPropertyValue('--breakpoint-tablet').trim()).toBe('768px');
      expect(rootStyles.getPropertyValue('--breakpoint-desktop').trim()).toBe('1024px');
      expect(rootStyles.getPropertyValue('--breakpoint-desktop-large').trim()).toBe('1200px');
    });

    it('should define container max-width custom properties', () => {
      const rootStyles = getComputedStyle(document.documentElement);
      
      expect(rootStyles.getPropertyValue('--container-mobile').trim()).toBe('100%');
      expect(rootStyles.getPropertyValue('--container-tablet').trim()).toBe('750px');
      expect(rootStyles.getPropertyValue('--container-desktop').trim()).toBe('1200px');
      expect(rootStyles.getPropertyValue('--container-desktop-large').trim()).toBe('1330px');
    });

    it('should define container padding custom properties', () => {
      const rootStyles = getComputedStyle(document.documentElement);
      
      expect(rootStyles.getPropertyValue('--container-padding-mobile').trim()).toBe('16px');
      expect(rootStyles.getPropertyValue('--container-padding-tablet').trim()).toBe('24px');
      expect(rootStyles.getPropertyValue('--container-padding-desktop').trim()).toBe('32px');
    });

    it('should define grid gap custom properties', () => {
      const rootStyles = getComputedStyle(document.documentElement);
      
      expect(rootStyles.getPropertyValue('--grid-gap-mobile').trim()).toBe('1.5rem');
      expect(rootStyles.getPropertyValue('--grid-gap-tablet').trim()).toBe('2rem');
      expect(rootStyles.getPropertyValue('--grid-gap-desktop').trim()).toBe('2.5rem');
    });

    it('should define minimum touch target size', () => {
      const rootStyles = getComputedStyle(document.documentElement);
      
      expect(rootStyles.getPropertyValue('--touch-target-min').trim()).toBe('44px');
    });
  });

  describe('Mobile-First Base Styles', () => {
    it('should apply mobile-first container styles', () => {
      testElement.className = 'container-responsive';
      const styles = getComputedStyle(testElement);
      
      // Mobile-first: width should be 100%
      expect(styles.width).toBe('100%');
      expect(styles.marginLeft).toBe('auto');
      expect(styles.marginRight).toBe('auto');
    });

    it('should apply mobile-first grid styles', () => {
      testElement.className = 'grid-responsive';
      const styles = getComputedStyle(testElement);
      
      // Mobile-first: should be CSS Grid with 1 column
      expect(styles.display).toBe('grid');
      expect(styles.gridTemplateColumns).toBe('1fr');
    });

    it('should apply mobile-first flexbox styles', () => {
      testElement.className = 'flex-responsive';
      const styles = getComputedStyle(testElement);
      
      // Mobile-first: should be flexbox with wrap
      expect(styles.display).toBe('flex');
      expect(styles.flexWrap).toBe('wrap');
    });
  });

  describe('Progressive Enhancement Media Queries', () => {
    it('should have media query support for tablet breakpoint', () => {
      // Check if CSS contains tablet media query
      const stylesheets = Array.from(document.styleSheets);
      let hasTabletMediaQuery = false;

      stylesheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || sheet.rules || []);
          rules.forEach(rule => {
            if (rule.type === CSSRule.MEDIA_RULE) {
              if (rule.conditionText && rule.conditionText.includes('768px')) {
                hasTabletMediaQuery = true;
              }
            }
          });
        } catch (e) {
          // Skip stylesheets that can't be accessed (CORS)
        }
      });

      expect(hasTabletMediaQuery).toBe(true);
    });

    it('should have media query support for desktop breakpoint', () => {
      const stylesheets = Array.from(document.styleSheets);
      let hasDesktopMediaQuery = false;

      stylesheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || sheet.rules || []);
          rules.forEach(rule => {
            if (rule.type === CSSRule.MEDIA_RULE) {
              if (rule.conditionText && rule.conditionText.includes('1024px')) {
                hasDesktopMediaQuery = true;
              }
            }
          });
        } catch (e) {
          // Skip stylesheets that can't be accessed (CORS)
        }
      });

      expect(hasDesktopMediaQuery).toBe(true);
    });

    it('should have media query support for desktop large breakpoint', () => {
      const stylesheets = Array.from(document.styleSheets);
      let hasDesktopLargeMediaQuery = false;

      stylesheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || sheet.rules || []);
          rules.forEach(rule => {
            if (rule.type === CSSRule.MEDIA_RULE) {
              if (rule.conditionText && rule.conditionText.includes('1200px')) {
                hasDesktopLargeMediaQuery = true;
              }
            }
          });
        } catch (e) {
          // Skip stylesheets that can't be accessed (CORS)
        }
      });

      expect(hasDesktopLargeMediaQuery).toBe(true);
    });
  });

  describe('Responsive Utility Classes', () => {
    it('should provide responsive visibility utilities', () => {
      // Test hide-mobile class
      testElement.className = 'hide-mobile';
      let styles = getComputedStyle(testElement);
      expect(styles.display).toBe('none');

      // Test show-mobile class
      testElement.className = 'show-mobile';
      styles = getComputedStyle(testElement);
      expect(styles.display).toBe('block');
    });

    it('should provide touch-target utility class', () => {
      testElement.className = 'touch-target';
      const styles = getComputedStyle(testElement);
      
      // Should have minimum touch target dimensions
      const minWidth = parseInt(styles.minWidth);
      const minHeight = parseInt(styles.minHeight);
      
      expect(minWidth).toBeGreaterThanOrEqual(44);
      expect(minHeight).toBeGreaterThanOrEqual(44);
    });

    it('should provide responsive image utilities', () => {
      const img = document.createElement('img');
      img.className = 'img-responsive';
      testElement.appendChild(img);
      
      const styles = getComputedStyle(img);
      expect(styles.maxWidth).toBe('100%');
      expect(styles.height).toBe('auto');
      expect(styles.display).toBe('block');
    });
  });

  describe('Consistency Across Components', () => {
    it('should use consistent breakpoint values', () => {
      const rootStyles = getComputedStyle(document.documentElement);
      
      const tablet = rootStyles.getPropertyValue('--breakpoint-tablet').trim();
      const desktop = rootStyles.getPropertyValue('--breakpoint-desktop').trim();
      const desktopLarge = rootStyles.getPropertyValue('--breakpoint-desktop-large').trim();
      
      // Verify breakpoints are in ascending order
      expect(parseInt(tablet)).toBeLessThan(parseInt(desktop));
      expect(parseInt(desktop)).toBeLessThan(parseInt(desktopLarge));
    });

    it('should use consistent spacing scale', () => {
      const rootStyles = getComputedStyle(document.documentElement);
      
      const gapMobile = rootStyles.getPropertyValue('--grid-gap-mobile').trim();
      const gapTablet = rootStyles.getPropertyValue('--grid-gap-tablet').trim();
      const gapDesktop = rootStyles.getPropertyValue('--grid-gap-desktop').trim();
      
      // Verify gaps increase with screen size
      expect(parseFloat(gapMobile)).toBeLessThan(parseFloat(gapTablet));
      expect(parseFloat(gapTablet)).toBeLessThan(parseFloat(gapDesktop));
    });

    it('should use consistent container padding scale', () => {
      const rootStyles = getComputedStyle(document.documentElement);
      
      const paddingMobile = parseInt(rootStyles.getPropertyValue('--container-padding-mobile'));
      const paddingTablet = parseInt(rootStyles.getPropertyValue('--container-padding-tablet'));
      const paddingDesktop = parseInt(rootStyles.getPropertyValue('--container-padding-desktop'));
      
      // Verify padding increases with screen size
      expect(paddingMobile).toBeLessThan(paddingTablet);
      expect(paddingTablet).toBeLessThan(paddingDesktop);
    });
  });

  describe('Requirements Validation', () => {
    it('should satisfy Requirement 1.1: Mobile-first CSS media queries', () => {
      const rootStyles = getComputedStyle(document.documentElement);
      
      // Verify all required breakpoints are defined
      expect(rootStyles.getPropertyValue('--breakpoint-tablet').trim()).toBe('768px');
      expect(rootStyles.getPropertyValue('--breakpoint-desktop').trim()).toBe('1024px');
      expect(rootStyles.getPropertyValue('--breakpoint-desktop-large').trim()).toBe('1200px');
    });

    it('should satisfy Requirement 1.2: Full-width layouts on mobile', () => {
      testElement.className = 'container-responsive';
      const styles = getComputedStyle(testElement);
      
      // Mobile container should be 100% width
      expect(styles.width).toBe('100%');
    });

    it('should satisfy Requirement 1.3: Tablet-optimized layouts', () => {
      // Verify tablet container max-width is defined
      const rootStyles = getComputedStyle(document.documentElement);
      expect(rootStyles.getPropertyValue('--container-tablet').trim()).toBe('750px');
    });

    it('should satisfy Requirement 1.4: Desktop layouts with maximum content width', () => {
      // Verify desktop container max-widths are defined
      const rootStyles = getComputedStyle(document.documentElement);
      expect(rootStyles.getPropertyValue('--container-desktop').trim()).toBe('1200px');
      expect(rootStyles.getPropertyValue('--container-desktop-large').trim()).toBe('1330px');
    });
  });
});
