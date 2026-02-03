# Mochi Glass Design System - Agent Reference

This document provides the core design tokens, logic, and component structures to replicate the "Mochi Glass" (Warmth in Technology) aesthetic.

## 1. Core Concept: "Mochi Glass"
A fusion of **Claymorphism (40%)**, **Glassmorphism (30%)**, and **Modern Minimal (20%)**.
- **Visual Goal:** Tactile, squishy, and warm. Avoid "cold" digital aesthetics.
- **Physical Logic:** "Low rebound" behavior. Elements should feel like pressing into a soft pillow or high-end vinyl art toy.

## 2. Design System Tokens (Tailwind v4 / CSS Variables)

```css
:root {
  /* Colors: "Hidamari" Palette */
  --color-background: hsl(48 25% 93%);      /* Warm Sand #F3F1E9 */
  --color-foreground: hsl(32 12% 31%);      /* Cocoa Gray #595046 */
  --color-primary: hsl(16 100% 83%);         /* Soft Coral #FFBFA8 */
  --color-card: hsl(0 0% 100% / 0.5);       /* Translucent White */

  /* Typography */
  --font-sans: "Zen Maru Gothic", "Nunito", sans-serif;
  
  /* Radius: Large and pill-shaped */
  --radius-lg: 2rem;
  --radius-xl: 3rem;
}
```

## 3. Component Architecture

### A. The Mochi Card (Clay + Glass)
Combine `backdrop-blur` with complex shadows for depth.
- **Background:** `bg-white/50`
- **Blur:** `backdrop-blur-3xl`
- **Outer Shadow:** Double layers (Soft depth + Sharp contact).
- **Inner Shadow:** Top-left white highlight (`inset`) + Bottom-right subtle dark shadow.

### B. The Squishy Button
- **Interaction:** `active:scale-90` with `transition-duration: 500ms`.
- **Ease:** `cubic-bezier(0.34, 1.56, 0.64, 1)` (Back out effect).
- **Tactile Feedback:** Deep inner shadow on active state to simulate being "pushed in."

## 4. Motion & Animation

### Floating Animation
Used to give elements a "suspended in liquid" feel.
```css
@keyframes floating {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(1deg); }
  66% { transform: translateY(-5px) rotate(-1deg); }
}
```

### Textural Detail
Apply a micro-noise overlay (3% opacity) to surfaces to give them a matte, tactile "skin" rather than a perfectly flat digital color.

## 5. UI Implementation Checklist
- [ ] Use `Zen Maru Gothic` for JP and `Nunito` for EN.
- [ ] No sharp corners (Minimum radius `0.75rem`).
- [ ] Use 3D Chibi characters for key visuals.
- [ ] Maintain high transparency (`bg-white/20` to `bg-white/50`).
- [ ] Ensure all interactions have elastic/bouncy transitions.
