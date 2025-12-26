# Spacing Guidelines for MoodNote

This guide explains the semantic spacing system used throughout the MoodNote application.

## Overview

The spacing system is organized into semantic groups that make it clear what each value should be used for. All spacing values follow an 8-point grid system and should be used with responsive scaling functions.

## Quick Reference

### Padding (Internal Component Spacing)
Use for spacing **inside** components (padding, internal gaps):

- `xs` (8px) - Small components (chips, tags)
- `sm` (12px) - Compact components (icon buttons)
- `md` (16px) - Standard components (buttons, inputs) ← **Most common**
- `lg` (20px) - Large components (cards)
- `xl` (24px) - Extra large (containers)
- `xxl` (32px) - Screen sections

**Example:**
```typescript
padding: scale(SPACING.padding.md)
paddingHorizontal: scale(SPACING.padding.lg)
```

### Margin (Spacing Between Elements)
Use for spacing **between** elements (margins, gaps between components):

- `xs` (8px) - Tight spacing (inline elements)
- `sm` (12px) - Small spacing (related elements)
- `md` (16px) - Standard spacing (list items) ← **Most common**
- `lg` (20px) - Large spacing (sections)
- `xl` (24px) - Extra large (major sections)
- `xxl` (32px) - Between major sections
- `xxxl` (40px) - Screen-level sections

**Example:**
```typescript
marginBottom: verticalScale(SPACING.margin.md)
marginVertical: verticalScale(SPACING.margin.xl)
```

### Gap (Flexbox/Grid Spacing)
Use for `gap` properties in flexbox and grid layouts:

- `xs` (4px) - Icon + text in buttons
- `sm` (8px) - Button content ← **Most common**
- `md` (12px) - Form fields
- `lg` (16px) - Grid items
- `xl` (24px) - Card grids

**Example:**
```typescript
gap: scale(SPACING.gap.sm)
columnGap: scale(SPACING.gap.md)
```

### Screen/Layout Constants
Use for screen-level padding and major sections:

- `horizontal` (24px) - Standard horizontal screen padding
- `vertical` (20px) - Standard vertical screen padding
- `section` (40px) - Between major screen sections

**Example:**
```typescript
paddingHorizontal: scale(SPACING.screen.horizontal)
paddingVertical: verticalScale(SPACING.screen.vertical)
```

### Component Shortcuts
Pre-defined spacing patterns for common components:

#### Button
```typescript
SPACING.button = {
  paddingHorizontal: 24,
  paddingVertical: 16,
  gap: 12,
}
```

**Example:**
```typescript
paddingVertical: verticalScale(SPACING.button.paddingVertical)
paddingHorizontal: scale(SPACING.button.paddingHorizontal)
gap: scale(SPACING.button.gap)
```

#### Input
```typescript
SPACING.input = {
  padding: 16,
  marginBottom: 16,
}
```

**Example:**
```typescript
padding: scale(SPACING.input.padding)
marginBottom: verticalScale(SPACING.input.marginBottom)
```

#### Card
```typescript
SPACING.card = {
  padding: 20,
  margin: 16,
  gap: 16,
}
```

**Example:**
```typescript
padding: scale(SPACING.card.padding)
marginBottom: verticalScale(SPACING.card.margin)
```

### Micro Values (Fine-tuning)
Use for very small adjustments and fine details:

- `xxs` (2px) - Label offsets, fine details
- `xs` (4px) - Error message spacing, small adjustments

**Example:**
```typescript
marginTop: verticalScale(SPACING.micro.xs)
paddingVertical: verticalScale(SPACING.micro.xxs)
```

### Large Values (Special Cases)
Use for exceptionally large spacing needs:

- `sm` (40px) - Icon containers, slide padding
- `md` (60px) - Logo containers, splash screens
- `lg` (80px) - Extra large containers

**Example:**
```typescript
paddingVertical: moderateScale(SPACING.large.md)
marginBottom: moderateScale(SPACING.large.sm)
```

## Responsive Scaling

**CRITICAL:** Always use responsive scaling functions with SPACING values:

- `scale()` - For horizontal spacing (width, paddingHorizontal, marginHorizontal)
- `verticalScale()` - For vertical spacing (height, paddingVertical, marginVertical)
- `moderateScale()` - For balanced scaling (works well for most cases)

### Examples

```typescript
// ✅ CORRECT
paddingHorizontal: scale(SPACING.padding.md)
marginBottom: verticalScale(SPACING.margin.lg)
gap: scale(SPACING.gap.sm)

// ❌ WRONG - Missing responsive scaling
paddingHorizontal: SPACING.padding.md
marginBottom: SPACING.margin.lg
```

## Common Usage Patterns

### Button Component
```typescript
const styles = StyleSheet.create({
  button: {
    paddingVertical: verticalScale(SPACING.button.paddingVertical),
    paddingHorizontal: scale(SPACING.button.paddingHorizontal),
    // ...
  },
  content: {
    gap: scale(SPACING.button.gap),
  },
});
```

### Card Component
```typescript
const styles = StyleSheet.create({
  card: {
    padding: scale(SPACING.card.padding),
    marginBottom: verticalScale(SPACING.card.margin),
    gap: scale(SPACING.card.gap),
  },
});
```

### Screen Layout
```typescript
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(SPACING.screen.horizontal),
    paddingVertical: verticalScale(SPACING.screen.vertical),
  },
  section: {
    marginBottom: verticalScale(SPACING.screen.section),
  },
});
```

### Form Layout
```typescript
const styles = StyleSheet.create({
  form: {
    gap: scale(SPACING.gap.md),
  },
  input: {
    marginBottom: verticalScale(SPACING.input.marginBottom),
  },
  submitButton: {
    marginTop: verticalScale(SPACING.margin.xl),
  },
});
```

## Migration from Old Structure

If you're updating code that uses the old flat SPACING structure:

| Old Pattern | New Pattern |
|-------------|-------------|
| `SPACING.md` for padding | `SPACING.padding.md` |
| `SPACING.lg` for margin | `SPACING.margin.lg` |
| `SPACING.sm` for gap | `SPACING.gap.sm` |
| `SPACING.xl` for screen padding | `SPACING.screen.horizontal` |
| `SPACING.xxxs` for micro spacing | `SPACING.micro.xxs` |
| `SPACING.huge` for large spacing | `SPACING.large.md` |

## TypeScript Support

Type helpers are available for better IntelliSense:

```typescript
import type {
  PaddingSize,
  MarginSize,
  GapSize
} from '@/constants/theme';

// Use in your component props
interface MyComponentProps {
  padding?: PaddingSize;
  margin?: MarginSize;
}
```

## Best Practices

1. **Be Semantic**: Choose spacing values based on their purpose, not just their size
2. **Always Scale**: Never use SPACING values without responsive scaling functions
3. **Use Shortcuts**: Prefer component shortcuts (button, input, card) when available
4. **Be Consistent**: Use the same spacing values for similar UI elements
5. **Follow the Grid**: Stick to the defined values - avoid custom spacing unless absolutely necessary

## Questions?

If you're unsure which spacing value to use:
1. Look at similar components in the codebase
2. Check if there's a component shortcut available
3. Default to `md` for most standard cases
4. Use `screen.*` constants for screen-level layouts
