# Quick Implementation Guide - Design System

This guide helps developers apply consistent UI/UX patterns when creating or modifying components.

## 🎨 Using the Design System

### Import Design Tokens
```javascript
import designSystem from '../styles/designSystem';

// Use colors
const primaryColor = designSystem.colors.primary.dark; // #1A5632
const accentColor = designSystem.colors.primary.main; // #00A819
```

## 🔘 Button Patterns

### Primary Button
```jsx
<button className="px-6 py-3 bg-[#1A5632] text-white rounded-lg font-semibold hover:bg-[#00A819] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00A819] focus:ring-offset-2">
  Click Me
</button>
```

### Secondary Button
```jsx
<button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
  Cancel
</button>
```

### Danger Button
```jsx
<button className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
  Delete
</button>
```

### Using Button Component
```jsx
import Button from '../components/ui/Button';

<Button variant="primary" size="md" loading={isLoading}>
  Submit
</Button>
```

## 📝 Input Field Patterns

### Text Input
```jsx
<input
  type="text"
  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#00A819] focus:ring-2 focus:ring-[#00A819] focus:ring-opacity-20 transition-all"
  placeholder="Enter text..."
/>
```

### With Label
```jsx
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Username
  </label>
  <input
    type="text"
    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#00A819] focus:ring-2 focus:ring-[#00A819] focus:ring-opacity-20 transition-all"
  />
</div>
```

### With Icon
```jsx
<div className="relative">
  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
  <input
    type="text"
    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#00A819] focus:ring-2 focus:ring-[#00A819] focus:ring-opacity-20 transition-all"
    placeholder="Username..."
  />
</div>
```

### Error State
```jsx
<input
  type="text"
  className="w-full px-4 py-3 border-2 border-red-500 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20 transition-all"
/>
<p className="text-red-600 text-sm mt-1">This field is required</p>
```

## 🎭 Modal Patterns

### Modal Structure
```jsx
<>
  {/* Backdrop */}
  <div 
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in"
    onClick={onClose}
  >
    {/* Modal Container */}
    <div 
      className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 animate-scale-in"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Modal Title</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Your content here */}
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <button className="...">Save</button>
        <button className="...">Cancel</button>
      </div>
    </div>
  </div>
</>
```

### Bottom-Left Modal (Guards)
```jsx
<>
  <div 
    className="fixed inset-0 bg-black/30 z-40 animate-fade-in"
    onClick={onClose}
    aria-hidden="true"
  />
  <div className="fixed bottom-4 left-4 z-50 animate-slide-up">
    <div className="bg-white rounded-lg shadow-2xl p-6 border-2 border-red-500 max-w-sm">
      {/* Content */}
    </div>
  </div>
</>
```

## 🔄 Loading States

### Inline Spinner
```jsx
<div className="flex items-center justify-center gap-4">
  <div className="w-16 h-16 border-4 border-[#1A5632] border-t-transparent rounded-full animate-spin"></div>
  <p className="text-xl font-semibold text-gray-700">Loading...</p>
</div>
```

### Using LoadingSpinner Component
```jsx
import LoadingSpinner from '../components/common/LoadingSpinner';

<LoadingSpinner size="lg" text="Loading data..." />

// Full screen
<LoadingSpinner size="xl" text="Loading..." fullScreen />
```

### Page Loading
```jsx
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-[#1A5632] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl font-semibold text-gray-700">Loading page...</p>
      </div>
    </div>
  );
}
```

## 🎴 Card Patterns

### Basic Card
```jsx
<div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-xl hover:border-[#00A819] transition-all duration-300">
  {/* Card content */}
</div>
```

### Interactive Card
```jsx
<Link
  to="/path"
  className="block bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-xl hover:border-[#00A819] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00A819] focus:ring-offset-2"
>
  {/* Card content */}
</Link>
```

### Card with Animation
```jsx
<div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 animate-fade-in">
  {/* Card content */}
</div>
```

## 🎯 Focus States

### Any Interactive Element
```jsx
className="focus:outline-none focus:ring-2 focus:ring-[#00A819] focus:ring-offset-2"
```

### Buttons
```jsx
className="focus:outline-none focus:ring-2 focus:ring-[#00A819] focus:ring-offset-2 rounded-lg"
```

### Inputs
```jsx
className="focus:outline-none focus:border-[#00A819] focus:ring-2 focus:ring-[#00A819] focus:ring-opacity-20"
```

## 🎬 Animations

### Available Animations
```jsx
// Fade in (opacity 0 → 1)
className="animate-fade-in"

// Slide up (from bottom)
className="animate-slide-up"

// Scale in (scale 0.95 → 1)
className="animate-scale-in"

// Slide in from left
className="animate-slide-in-left"

// Pulse (for skeletons)
className="animate-pulse-skeleton"
```

### Hover Effects
```jsx
// Scale up slightly
className="hover:scale-105 transition-all duration-300"

// Scale up more
className="hover:scale-110 transition-all duration-300"

// Shadow elevation
className="shadow-md hover:shadow-xl transition-all duration-300"
```

## 📱 Responsive Patterns

### Grid Layout
```jsx
// 1 column mobile, 2 on tablet, 3 on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>

// 1 column mobile, 2 on xl screens
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
  {/* Items */}
</div>
```

### Flex Responsive
```jsx
// Stack on mobile, row on desktop
<div className="flex flex-col lg:flex-row gap-4">
  {/* Items */}
</div>

// Reverse on mobile
<div className="flex flex-col-reverse lg:flex-row gap-4">
  {/* Items */}
</div>
```

### Responsive Padding
```jsx
// Small padding mobile, larger on desktop
className="px-4 sm:px-6 lg:px-8"
className="py-4 sm:py-6 lg:py-12"

// Full pattern
className="px-4 sm:px-8 md:px-16 lg:px-[100px]"
```

### Responsive Text
```jsx
// Heading
className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"

// Body
className="text-sm sm:text-base md:text-lg"
```

### Hide/Show by Breakpoint
```jsx
// Hide on mobile
className="hidden md:block"

// Show only on mobile
className="md:hidden"

// Show on large screens only
className="hidden lg:block"
```

## 🎨 Color Usage

### Text Colors
```jsx
// Headings
className="text-[#1A5632]"

// Body text
className="text-gray-700"

// Secondary text
className="text-gray-500"

// Success
className="text-[#00A819]"

// Error
className="text-red-600"
```

### Background Colors
```jsx
// Primary
className="bg-[#1A5632]"

// Accent background
className="bg-[#C0FFB3]"

// Page background
className="bg-[#FFFDEE]"

// Card background
className="bg-white"
```

## 🏷️ Badge Patterns

### Status Badges
```jsx
// Premium
<span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
  <Crown size={12} /> PREMIUM
</span>

// Adult Content
<span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
  <Shield size={12} /> ADULT
</span>

// Ongoing
<span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
  <BookOpen size={12} /> ONGOING
</span>

// Completed
<span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
  <CheckCircle size={12} /> COMPLETED
</span>
```

## ✅ Checklist for New Components

When creating a new component, ensure:

- [ ] Uses design system colors (#1A5632, #00A819, etc.)
- [ ] Has proper focus states (ring-2, ring-[#00A819])
- [ ] Responsive on mobile, tablet, desktop
- [ ] Includes hover effects with transitions
- [ ] Has loading states if async
- [ ] Uses consistent spacing (gap-4, gap-6, p-6, etc.)
- [ ] Includes proper ARIA labels for accessibility
- [ ] Animations use existing classes (animate-fade-in, etc.)
- [ ] Buttons match design system variants
- [ ] Inputs have consistent styling
- [ ] Typography uses Geist Mono (headings) or Outfit (body)

## 🚨 Common Mistakes to Avoid

❌ **Don't**: Mix different button styles
```jsx
<button className="bg-blue-500...">
```

✅ **Do**: Use design system colors
```jsx
<button className="bg-[#1A5632]...">
```

---

❌ **Don't**: Forget focus states
```jsx
<button className="...">
```

✅ **Do**: Include focus rings
```jsx
<button className="... focus:outline-none focus:ring-2 focus:ring-[#00A819]">
```

---

❌ **Don't**: Use inline styles for colors
```jsx
<div style={{ backgroundColor: '#1A5632' }}>
```

✅ **Do**: Use Tailwind classes
```jsx
<div className="bg-[#1A5632]">
```

---

❌ **Don't**: Forget mobile responsiveness
```jsx
<div className="flex-row">
```

✅ **Do**: Stack on mobile
```jsx
<div className="flex flex-col lg:flex-row">
```

## 📚 Resources

- **Design System**: `/src/styles/designSystem.js`
- **Button Component**: `/src/components/ui/Button.jsx`
- **LoadingSpinner**: `/src/components/common/LoadingSpinner.jsx`
- **Example Modals**: Check `ContentGuardModal.jsx`, `EditUserModal.jsx`
- **Example Cards**: Check `BookCard.jsx`, `AllUsers.jsx`
- **Example Forms**: Check `EditProfileModal.jsx`, `BrowseSidebar.jsx`

---

**Last Updated**: December 16, 2025  
**Maintained By**: Development Team

