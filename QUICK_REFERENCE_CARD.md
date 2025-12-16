# 🚀 Quick Start - Design System Reference Card

**For**: Readian Development Team  
**Purpose**: Quick reference for common patterns  
**Last Updated**: December 16, 2025

---

## 🎨 Colors

```javascript
// Primary
#1A5632  // Dark green (buttons, headings)
#00A819  // Bright green (hover, focus)
#C0FFB3  // Light green (backgrounds)

// Secondary
#FFFDEE  // Cream (page backgrounds)
#FFD7DF  // Pink (accents)

// Status
✅ #00A819  // Success
⚠️  #FFA500  // Warning
❌ #DC2626  // Error
ℹ️  #3B82F6  // Info

// Neutral
#FFFFFF  // White
#F3F4F6  // Gray 100
#6B7280  // Gray 500
#374151  // Gray 700
#000000  // Black
```

---

## 🔘 Buttons

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

### Button with Loading
```jsx
<button disabled={loading} className="...">
  {loading ? (
    <span className="flex items-center justify-center gap-2">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Loading...
    </span>
  ) : 'Submit'}
</button>
```

---

## 📝 Inputs

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
  <label className="block text-sm font-semibold text-gray-800 mb-2">
    Username
  </label>
  <input className="..." />
</div>
```

### Error State
```jsx
<input className="... border-red-500 focus:border-red-600 focus:ring-red-500" />
<p className="text-red-600 text-sm mt-1">⚠️ This field is required</p>
```

---

## 🔄 Loading States

### Page Loading
```jsx
<div className="min-h-screen flex items-center justify-center">
  <div className="flex flex-col items-center gap-4">
    <div className="w-16 h-16 border-4 border-[#1A5632] border-t-transparent rounded-full animate-spin"></div>
    <p className="text-xl font-semibold text-gray-700">Loading...</p>
  </div>
</div>
```

### Inline Loading (on dark background)
```jsx
<div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
```

---

## 🎭 Modals

### Standard Modal
```jsx
<>
  {/* Backdrop */}
  <div 
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in"
    onClick={onClose}
  >
    {/* Modal */}
    <div 
      className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-scale-in"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <h2 className="text-2xl font-bold mb-4">Title</h2>
      
      {/* Content */}
      <div className="mb-6">Content here</div>
      
      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 ...">Confirm</button>
        <button className="flex-1 ...">Cancel</button>
      </div>
    </div>
  </div>
</>
```

### Bottom-Left Modal (Guards)
```jsx
<>
  <div className="fixed inset-0 bg-black/30 z-40 animate-fade-in" onClick={onClose} />
  <div className="fixed bottom-4 left-4 z-50 animate-slide-up">
    <div className="bg-white rounded-lg shadow-2xl p-6 border-2 border-red-500 max-w-sm">
      {/* Content */}
    </div>
  </div>
</>
```

---

## 🎴 Cards

### Basic Card
```jsx
<div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-xl hover:border-[#00A819] transition-all duration-300">
  {/* Content */}
</div>
```

### Interactive Card
```jsx
<Link
  to="/path"
  className="block bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 hover:shadow-xl hover:border-[#00A819] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00A819] focus:ring-offset-2"
>
  {/* Content */}
</Link>
```

---

## 📱 Responsive

### Breakpoints
```jsx
sm:640px   md:768px   lg:1024px   xl:1280px
```

### Common Patterns
```jsx
// Stack on mobile, row on desktop
className="flex flex-col lg:flex-row gap-4"

// Hide on mobile
className="hidden md:block"

// Different padding
className="px-4 sm:px-6 lg:px-8"

// Grid responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

---

## 🎬 Animations

### Available Classes
```jsx
animate-fade-in       // Opacity 0 → 1
animate-slide-up      // Slide from bottom
animate-scale-in      // Scale 0.95 → 1
animate-slide-in-left // Slide from left
animate-spin          // Continuous rotation
```

### Hover Effects
```jsx
hover:scale-105       // Slight scale up
hover:scale-110       // More scale up
hover:shadow-xl       // Shadow elevation
```

---

## ✅ Focus States

### Always Include
```jsx
focus:outline-none 
focus:ring-2 
focus:ring-[#00A819] 
focus:ring-offset-2
```

---

## 🎯 Common Combinations

### Form Field
```jsx
<div>
  <label className="block text-sm font-semibold text-gray-800 mb-2">
    Field Name
  </label>
  <input
    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#00A819] focus:ring-2 focus:ring-[#00A819] focus:ring-opacity-20 transition-all"
    placeholder="Enter value..."
  />
</div>
```

### Button Group
```jsx
<div className="flex flex-col sm:flex-row gap-3">
  <button className="flex-1 bg-[#1A5632] ...">Primary</button>
  <button className="flex-1 bg-gray-200 ...">Secondary</button>
</div>
```

### Success Message
```jsx
<div className="bg-green-100 border-2 border-green-500 rounded-lg p-4">
  <p className="text-green-700 flex items-center gap-2">
    <svg className="w-5 h-5">...</svg>
    Success message
  </p>
</div>
```

### Error Message
```jsx
<div className="bg-red-100 border-2 border-red-500 rounded-lg p-4">
  <p className="text-red-700 flex items-center gap-2">
    ⚠️ Error message
  </p>
</div>
```

---

## 📚 Documentation

- **Full Guide**: `DESIGN_SYSTEM_GUIDE.md`
- **Implementation Log**: `UI_UX_IMPROVEMENTS.md`
- **Project Summary**: `PROJECT_COMPLETE_SUMMARY.md`

---

## 💡 Pro Tips

1. **Mobile First**: Start with mobile layout, enhance for desktop
2. **Focus States**: Always include for accessibility
3. **Loading States**: Show feedback for async operations
4. **Animations**: Keep them subtle (300ms standard)
5. **Consistency**: Copy patterns from existing components

---

## ⚠️ Don't Forget

- [ ] Add `focus:` states to all interactive elements
- [ ] Include `aria-label` on icon buttons
- [ ] Test keyboard navigation
- [ ] Verify mobile layout
- [ ] Add loading states to async buttons
- [ ] Use consistent spacing (gap-4, gap-6)
- [ ] Include hover effects (hover:scale-105)
- [ ] Add transitions (transition-all duration-300)

---

**Print this card and keep it handy!** 📌

**Questions?** Check the full guides in the docs folder.

