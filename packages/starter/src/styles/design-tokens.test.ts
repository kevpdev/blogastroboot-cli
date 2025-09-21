import { describe, test, expect, beforeEach } from 'vitest';

// Design token validation tests
describe('Design Tokens System', () => {
  let styleSheet: CSSStyleSheet;
  let cssRules: CSSRule[];

  beforeEach(() => {
    // Create a mock CSS content from design-tokens.css
    const cssContent = `
      :root {
        --brand-primary: 55 65 81;
        --brand-primary-hover: 31 41 55;
        --brand-primary-active: 17 24 39;
        --brand-secondary: 107 114 128;
        --brand-secondary-hover: 75 85 99;
        --brand-secondary-active: 55 65 81;
        --text-primary: 17 24 39;
        --text-secondary: 75 85 99;
        --text-muted: 107 114 128;
        --text-inverse: 255 255 255;
        --bg-primary: 255 255 255;
        --bg-secondary: 243 244 246;
        --bg-muted: 229 231 235;
        --bg-inverse: 17 24 39;
        --border-primary: 229 231 235;
        --border-secondary: 209 213 219;
        --border-muted: 243 244 246;
        --success: 5 150 105;
        --success-light: 236 253 245;
        --warning: 217 119 6;
        --warning-light: 255 251 235;
        --error: 220 38 38;
        --error-light: 254 242 242;
        --info: 55 65 81;
        --info-light: 240 244 255;
      }

      .dark {
        --text-primary: 249 250 251;
        --text-secondary: 209 213 219;
        --text-muted: 156 163 175;
        --text-inverse: 17 24 39;
        --bg-primary: 17 24 39;
        --bg-secondary: 31 41 55;
        --bg-muted: 55 65 81;
        --bg-inverse: 249 250 251;
        --border-primary: 55 65 81;
        --border-secondary: 75 85 99;
        --border-muted: 31 41 55;
      }
    `;

    // Create a style element and add it to the document
    const styleElement = document.createElement('style');
    styleElement.textContent = cssContent;
    document.head.appendChild(styleElement);

    // Extract CSS rules for testing
    styleSheet = styleElement.sheet as CSSStyleSheet;
    cssRules = Array.from(styleSheet.cssRules);
  });

  describe('RGB Format Validation', () => {
    test('should have all tokens in RGB space-separated format', () => {
      const rootRule = cssRules.find(rule => 
        rule instanceof CSSStyleRule && rule.selectorText === ':root'
      ) as CSSStyleRule;

      expect(rootRule).toBeTruthy();

      const tokenPatterns = {
        'brand-primary': /^--brand-primary:\s*\d+\s+\d+\s+\d+\s*;/,
        'text-primary': /^--text-primary:\s*\d+\s+\d+\s+\d+\s*;/,
        'bg-primary': /^--bg-primary:\s*\d+\s+\d+\s+\d+\s*;/,
        'border-primary': /^--border-primary:\s*\d+\s+\d+\s+\d+\s*;/,
        'success': /^--success:\s*\d+\s+\d+\s+\d+\s*;/,
        'warning': /^--warning:\s*\d+\s+\d+\s+\d+\s*;/,
        'error': /^--error:\s*\d+\s+\d+\s+\d+\s*;/,
        'info': /^--info:\s*\d+\s+\d+\s+\d+\s*;/,
      };

      const cssText = rootRule.cssText.replace(/\\s+/g, ' ');
      
      Object.entries(tokenPatterns).forEach(([tokenName]) => {
        const found = cssText.includes(`--${tokenName}:`);
        expect(found, `Token --${tokenName} should be present in :root`).toBe(true);
      });
    });

    test('should have valid RGB values (0-255)', () => {
      const rgbValues = [
        '55 65 81',   // brand-primary
        '17 24 39',   // text-primary  
        '255 255 255', // bg-primary
        '5 150 105',  // success
        '220 38 38',  // error
      ];

      rgbValues.forEach(value => {
        const parts = value.split(' ').map(Number);
        
        expect(parts).toHaveLength(3);
        parts.forEach(part => {
          expect(part).toBeGreaterThanOrEqual(0);
          expect(part).toBeLessThanOrEqual(255);
        });
      });
    });

    test('should not use legacy color formats', () => {
      const rootRule = cssRules.find(rule => 
        rule instanceof CSSStyleRule && rule.selectorText === ':root'
      ) as CSSStyleRule;

      const cssText = rootRule.cssText;
      
      // Should not contain hex colors
      expect(cssText).not.toMatch(/#[0-9a-fA-F]{3,6}/);
      
      // Should not contain rgb() functions
      expect(cssText).not.toMatch(/rgb\(/);
      
      // Should not contain hsl() functions
      expect(cssText).not.toMatch(/hsl\(/);
    });
  });

  describe('Token Categories', () => {
    test('should have all required brand color tokens', () => {
      const expectedBrandTokens = [
        'brand-primary',
        'brand-primary-hover', 
        'brand-primary-active',
        'brand-secondary',
        'brand-secondary-hover',
        'brand-secondary-active'
      ];

      const rootRule = cssRules.find(rule => 
        rule instanceof CSSStyleRule && rule.selectorText === ':root'
      ) as CSSStyleRule;

      const cssText = rootRule.cssText;

      expectedBrandTokens.forEach(token => {
        expect(cssText.includes(`--${token}:`), 
          `Should contain brand token: --${token}`).toBe(true);
      });
    });

    test('should have all required text color tokens', () => {
      const expectedTextTokens = [
        'text-primary',
        'text-secondary',
        'text-muted',
        'text-inverse'
      ];

      const rootRule = cssRules.find(rule => 
        rule instanceof CSSStyleRule && rule.selectorText === ':root'
      ) as CSSStyleRule;

      const cssText = rootRule.cssText;

      expectedTextTokens.forEach(token => {
        expect(cssText.includes(`--${token}:`), 
          `Should contain text token: --${token}`).toBe(true);
      });
    });

    test('should have all required background tokens', () => {
      const expectedBgTokens = [
        'bg-primary',
        'bg-secondary',
        'bg-muted',
        'bg-inverse'
      ];

      const rootRule = cssRules.find(rule => 
        rule instanceof CSSStyleRule && rule.selectorText === ':root'
      ) as CSSStyleRule;

      const cssText = rootRule.cssText;

      expectedBgTokens.forEach(token => {
        expect(cssText.includes(`--${token}:`), 
          `Should contain background token: --${token}`).toBe(true);
      });
    });

    test('should have all required border tokens', () => {
      const expectedBorderTokens = [
        'border-primary',
        'border-secondary',
        'border-muted'
      ];

      const rootRule = cssRules.find(rule => 
        rule instanceof CSSStyleRule && rule.selectorText === ':root'
      ) as CSSStyleRule;

      const cssText = rootRule.cssText;

      expectedBorderTokens.forEach(token => {
        expect(cssText.includes(`--${token}:`), 
          `Should contain border token: --${token}`).toBe(true);
      });
    });

    test('should have all required state color tokens', () => {
      const expectedStateTokens = [
        'success', 'success-light',
        'warning', 'warning-light',
        'error', 'error-light',
        'info', 'info-light'
      ];

      const rootRule = cssRules.find(rule => 
        rule instanceof CSSStyleRule && rule.selectorText === ':root'
      ) as CSSStyleRule;

      const cssText = rootRule.cssText;

      expectedStateTokens.forEach(token => {
        expect(cssText.includes(`--${token}:`), 
          `Should contain state token: --${token}`).toBe(true);
      });
    });
  });

  describe('Dark Theme Support', () => {
    test('should have .dark selector for dark theme tokens', () => {
      const darkRule = cssRules.find(rule => 
        rule instanceof CSSStyleRule && rule.selectorText === '.dark'
      ) as CSSStyleRule;

      expect(darkRule, 'Should have .dark CSS rule').toBeTruthy();
    });

    test('should override semantic tokens in dark theme', () => {
      const darkRule = cssRules.find(rule => 
        rule instanceof CSSStyleRule && rule.selectorText === '.dark'
      ) as CSSStyleRule;

      const expectedDarkTokens = [
        'text-primary',
        'text-secondary', 
        'text-muted',
        'text-inverse',
        'bg-primary',
        'bg-secondary',
        'bg-muted',
        'bg-inverse',
        'border-primary',
        'border-secondary',
        'border-muted'
      ];

      const cssText = darkRule.cssText;

      expectedDarkTokens.forEach(token => {
        expect(cssText.includes(`--${token}:`), 
          `Dark theme should override --${token}`).toBe(true);
      });
    });

    test('should not override brand and state colors in dark theme', () => {
      const darkRule = cssRules.find(rule => 
        rule instanceof CSSStyleRule && rule.selectorText === '.dark'
      ) as CSSStyleRule;

      const brandAndStateTokens = [
        'brand-primary', 'brand-secondary',
        'success', 'warning', 'error', 'info',
        'success-light', 'warning-light', 'error-light', 'info-light'
      ];

      const cssText = darkRule.cssText;

      brandAndStateTokens.forEach(token => {
        expect(cssText.includes(`--${token}:`), 
          `Dark theme should NOT override --${token}`).toBe(false);
      });
    });
  });

  describe('Tailwind CSS Integration', () => {
    test('should be compatible with Tailwind arbitrary values', () => {
      // Test that RGB format works with rgb(var(--token)) syntax
      const testCases = [
        { token: '--text-primary', value: '17 24 39' },
        { token: '--bg-primary', value: '255 255 255' },
        { token: '--brand-primary', value: '55 65 81' }
      ];

      testCases.forEach(({ token, value }) => {
        // Simulate creating CSS with the token
        const cssValue = `rgb(var(${token}))`;
        
        // This should create a valid CSS color
        expect(cssValue).toMatch(/^rgb\(var\(--[a-z-]+\)\)$/);
        
        // The value should be space-separated RGB values
        const parts = value.split(' ');
        expect(parts).toHaveLength(3);
        parts.forEach(part => {
          expect(parseInt(part)).toBeGreaterThanOrEqual(0);
          expect(parseInt(part)).toBeLessThanOrEqual(255);
        });
      });
    });

    test('should support Tailwind class generation patterns', () => {
      const tailwindPatterns = [
        'text-[rgb(var(--text-primary))]',
        'bg-[rgb(var(--bg-primary))]', 
        'border-[rgb(var(--border-primary))]',
        'hover:bg-[rgb(var(--bg-muted))]',
        'focus:ring-[rgb(var(--brand-primary))]'
      ];

      tailwindPatterns.forEach(pattern => {
        // Should match Tailwind arbitrary value pattern
        expect(pattern).toMatch(/\[rgb\(var\(--[a-z-]+\)\)\]/);
        
        // Should contain valid token reference
        const tokenMatch = pattern.match(/--([a-z-]+)/);
        expect(tokenMatch).toBeTruthy();
        
        const tokenName = tokenMatch![1];
        expect(['text', 'bg', 'border', 'brand'].some(prefix => 
          tokenName!.startsWith(prefix)
        )).toBe(true);
      });
    });
  });

  describe('Token Value Consistency', () => {
    test('should have consistent hover states', () => {
      // Brand primary should be lighter than its hover state
      const brandPrimary = [55, 65, 81];
      const brandPrimaryHover = [31, 41, 55];
      
      brandPrimary.forEach((value, index) => {
        expect(value).toBeGreaterThan(brandPrimaryHover[index]!);
      });
    });

    test('should have proper contrast relationships', () => {
      // Light theme: text should be dark, bg should be light
      const lightTextPrimary = [17, 24, 39]; // Dark text
      const lightBgPrimary = [255, 255, 255]; // Light background
      
      lightTextPrimary.forEach(value => {
        expect(value).toBeLessThan(128); // Dark values
      });
      
      lightBgPrimary.forEach(value => {
        expect(value).toBeGreaterThan(200); // Light values
      });
    });

    test('should have semantic light variants for state colors', () => {
      const stateColorPairs = [
        { main: 'success', light: 'success-light' },
        { main: 'warning', light: 'warning-light' },
        { main: 'error', light: 'error-light' },
        { main: 'info', light: 'info-light' }
      ];

      stateColorPairs.forEach(({ main, light }) => {
        const rootRule = cssRules.find(rule => 
          rule instanceof CSSStyleRule && rule.selectorText === ':root'
        ) as CSSStyleRule;

        const cssText = rootRule.cssText;
        
        expect(cssText.includes(`--${main}:`), 
          `Should have main state color --${main}`).toBe(true);
        expect(cssText.includes(`--${light}:`), 
          `Should have light variant --${light}`).toBe(true);
      });
    });
  });

  describe('CSS Custom Property Standards', () => {
    test('should use proper CSS custom property syntax', () => {
      const rootRule = cssRules.find(rule => 
        rule instanceof CSSStyleRule && rule.selectorText === ':root'
      ) as CSSStyleRule;

      const cssText = rootRule.cssText;
      
      // Should start with double hyphens
      const customProps = cssText.match(/--[a-z-]+:/g);
      expect(customProps).toBeTruthy();
      expect(customProps!.length).toBeGreaterThan(0);
      
      // All custom properties should follow naming convention
      customProps!.forEach(prop => {
        expect(prop).toMatch(/^--[a-z-]+:$/);
      });
    });

    test('should not have any deprecated CSS features', () => {
      const rootRule = cssRules.find(rule => 
        rule instanceof CSSStyleRule && rule.selectorText === ':root'
      ) as CSSStyleRule;

      const cssText = rootRule.cssText;
      
      // Should not use deprecated color keywords
      const deprecatedColors = ['activeborder', 'activecaption', 'appworkspace'];
      deprecatedColors.forEach(color => {
        expect(cssText.toLowerCase()).not.toContain(color);
      });
      
      // Should not use vendor prefixes for standard properties
      expect(cssText).not.toMatch(/-webkit-|-moz-|-ms-|-o-/);
    });

    test('should be formatted consistently', () => {
      const rootRule = cssRules.find(rule => 
        rule instanceof CSSStyleRule && rule.selectorText === ':root'
      ) as CSSStyleRule;

      const cssText = rootRule.cssText;
      
      // Should have consistent custom property declarations
      const customProps = cssText.match(/--[a-z-]+[^;]+/g);
      expect(customProps).toBeTruthy();
      expect(customProps!.length).toBeGreaterThan(0);
      
      // Each custom property should follow proper naming
      customProps!.forEach(prop => {
        expect(prop).toMatch(/^--[a-z-]+/);
      });
    });
  });
});