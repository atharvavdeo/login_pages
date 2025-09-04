# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a futuristic login page featuring glassmorphism design, animated neon wave backgrounds, and interactive elements. Built with vanilla HTML, CSS, and JavaScript without any build system or dependencies.

## Development Commands

### Running the Application
```bash
# Start a local development server (recommended for CORS and proper loading)
python3 -m http.server 8000
# or using npx
npx serve .

# Access at http://localhost:8000
```

### File Structure Commands
```bash
# Open main files for development
code index.html styles.css script.js

# View project structure
tree . -I 'node_modules|.git'
```

## Architecture and Code Organization

### Core Architecture Pattern
The codebase follows a modular class-based ES6+ JavaScript architecture with three main components:

1. **InteractiveWaves** - Manages dynamic wave background animations that respond to mouse movement and login box hover states
2. **LoginForm** - Handles all form functionality including validation, password toggle, social buttons, and notifications
3. **PerformanceOptimizer** - Implements performance optimizations like event throttling and accessibility features

### Key Technical Implementation Details

**Wave Animation System:**
- 5 layered wave elements with different gradients, sizes, and animation timings
- Mouse tracking with throttled events updates CSS custom properties (`--mouse-x`, `--mouse-y`)
- Dynamic transforms and scaling based on mouse position and hover states
- GPU-accelerated animations using `transform3d` and `requestAnimationFrame`

**Glassmorphism Design System:**
- Uses `backdrop-filter: blur(20px)` with fallbacks for browser compatibility
- Layered semi-transparent backgrounds with multiple box-shadow levels
- Dynamic glow effects triggered by user interactions
- CSS custom properties for consistent color theming

**Interactive Form Elements:**
- Real-time validation with visual feedback (green/red border states)
- Custom animated password visibility toggle with emoji icons
- Ripple effect system for button interactions
- Toast notification system with slide-in/out animations

### CSS Architecture

**Custom Properties (CSS Variables):**
- Color scheme uses consistent variables: `--primary-cyan`, `--primary-magenta`, `--primary-green`
- Dynamic mouse position tracking: `--mouse-x`, `--mouse-y`
- All animations respect `prefers-reduced-motion` accessibility setting

**Animation Performance:**
- All animations use `transform` and `opacity` for optimal performance
- Complex animations are disabled automatically for users with motion sensitivity
- Event throttling prevents excessive repaints during mouse movement

**Responsive Design:**
- Mobile-first approach with touch-friendly 48px minimum touch targets
- Breakpoints at 768px (tablet) and 480px (mobile)
- Social login buttons switch to vertical layout on mobile

## Development Guidelines

### Adding New Features
When extending functionality, follow the established patterns:

- Create new ES6 classes for major features
- Initialize all classes in the `DOMContentLoaded` event listener
- Use CSS custom properties for dynamic values
- Implement proper cleanup for event listeners
- Add corresponding CSS animations in the `additionalStyles` string

### Animation Development
- All keyframe animations should be added to the `additionalStyles` template literal in `script.js`
- Use `transform` and `opacity` for performance-critical animations
- Test with `prefers-reduced-motion: reduce` to ensure accessibility
- Implement fallbacks for browsers without `backdrop-filter` support

### Form Enhancement
- New input fields should follow the `.input-wrapper` > `.input-field` + `.input-glow` structure
- Validation logic should be added to the `validateField()` method
- Use the existing `showNotification()` system for user feedback
- Interactive elements should include the `addRippleEffect()` for consistency

### Browser Compatibility Notes
- Glassmorphism effects require modern browsers (Chrome 88+, Firefox 94+, Safari 14+)
- The wave animations use advanced CSS features and may need fallbacks for older browsers
- Social login SVG icons are inline for maximum compatibility

### Performance Considerations
- Mouse tracking is throttled using `requestAnimationFrame`
- Complex animations are automatically disabled for low-power devices
- The notification system auto-cleans up to prevent memory leaks
- All CSS animations use hardware acceleration where possible

## Styling System

The project uses a sophisticated CSS architecture:

- **Glassmorphism**: Semi-transparent elements with backdrop blur effects
- **Neon gradients**: Multi-stop linear gradients with transparency
- **Interactive states**: Hover, focus, and active states with smooth transitions
- **Responsive design**: Fluid layouts that adapt to different screen sizes

Key CSS techniques used:
- `backdrop-filter` for glassmorphism effects
- Complex `box-shadow` stacking for depth
- CSS Grid and Flexbox for layout
- Custom keyframe animations for smooth motion
- CSS custom properties for dynamic theming
