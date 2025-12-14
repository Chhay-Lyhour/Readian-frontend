# Book Update Flow - Before vs After

## ❌ BEFORE (Broken)

```
User updates book title
         ↓
BookEditPage calls:
  bookApi.updateBook(bookId, { title: 'New Title' }, null)
         ↓
bookApi.updateBook() ALWAYS creates FormData
         ↓
FormData with only text fields (no image)
         ↓
PATCH /api/books/:id
Content-Type: multipart/form-data
Body: FormData { title: 'New Title' }
         ↓
Backend receives empty/text-only FormData
         ↓
❌ ERROR: Backend rejects or fails to parse
```

---

## ✅ AFTER (Fixed)

### Scenario 1: Update Without Image

```
User updates book title
         ↓
BookEditPage calls:
  bookApi.updateBook(bookId, { title: 'New Title' }, null)
         ↓
bookApi checks: imageFile is null
         ↓
Uses JSON payload (NOT FormData)
         ↓
PATCH /api/books/:id
Content-Type: application/json
Body: { "title": "New Title" }
         ↓
Backend receives clean JSON
         ↓
✅ SUCCESS: Book updated
```

### Scenario 2: Update With Image

```
User uploads new image
         ↓
BookEditPage calls:
  bookApi.updateBook(bookId, { title: 'New Title' }, imageFile)
         ↓
bookApi checks: imageFile exists
         ↓
Creates FormData with text + image
         ↓
PATCH /api/books/:id
Content-Type: multipart/form-data
Body: FormData {
  title: 'New Title',
  image: File {...}
}
         ↓
Backend receives FormData with file
         ↓
Backend uploads image to Cloudinary
         ↓
✅ SUCCESS: Book updated with new image
```

---

## Code Comparison

### ❌ OLD CODE (Broken)
```javascript
updateBook: async (bookId, bookData, imageFile = null) => {
  const formData = new FormData();
  
  // Always FormData, even when imageFile is null!
  if (bookData.title !== undefined) formData.append('title', bookData.title);
  // ... more fields
  
  if (imageFile) {
    formData.append('image', imageFile);
  }
  
  // Always multipart/form-data
  const response = await axiosInstance.patch(`/books/${bookId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
}
```

**Problem:** Creates FormData even when there's no file!

---

### ✅ NEW CODE (Fixed)
```javascript
updateBook: async (bookId, bookData, imageFile = null) => {
  // Smart decision: use FormData ONLY if there's a file
  if (imageFile) {
    // Path A: With image file
    const formData = new FormData();
    if (bookData.title !== undefined) formData.append('title', bookData.title);
    // ... more fields
    formData.append('image', imageFile);
    
    return await axiosInstance.patch(`/books/${bookId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  } else {
    // Path B: Without image file (text-only update)
    const payload = {};
    if (bookData.title !== undefined) payload.title = bookData.title;
    // ... more fields
    
    return await axiosInstance.patch(`/books/${bookId}`, payload);
    // Content-Type: application/json (automatic)
  }
}
```

**Solution:** Uses JSON for text-only updates, FormData only when file exists!

---

## Why This Matters

### Performance
- **JSON:** ~500 bytes for text update
- **Empty FormData:** ~2KB+ overhead

### Compatibility
- **JSON:** Universal support for text updates
- **FormData:** Required only for file uploads

### Error Prevention
- **JSON:** Clean, predictable
- **Empty FormData:** Can cause parsing errors

---

## Real World Example

### Updating Book Title

**Before (❌):**
```javascript
await bookApi.updateBook(bookId, { title: 'My New Title' });

// Request:
// Content-Type: multipart/form-data; boundary=----WebKitFormBoundary...
// Body: 
// ------WebKitFormBoundary...
// Content-Disposition: form-data; name="title"
// 
// My New Title
// ------WebKitFormBoundary...--
// 
// ❌ Backend might reject this!
```

**After (✅):**
```javascript
await bookApi.updateBook(bookId, { title: 'My New Title' });

// Request:
// Content-Type: application/json
// Body: {"title":"My New Title"}
// 
// ✅ Backend accepts this easily!
```

---

## Test Cases

### ✅ Test 1: Update Title Only
```javascript
await bookApi.updateBook('book123', { title: 'New Title' });
// Uses JSON ✓
```

### ✅ Test 2: Update Multiple Fields
```javascript
await bookApi.updateBook('book123', {
  title: 'New Title',
  description: 'New description',
  genre: 'Fantasy'
});
// Uses JSON ✓
```

### ✅ Test 3: Update With Image
```javascript
const file = new File(['...'], 'cover.jpg', { type: 'image/jpeg' });
await bookApi.updateBook('book123', { title: 'New Title' }, file);
// Uses FormData ✓
```

### ✅ Test 4: Update Only Image
```javascript
const file = new File(['...'], 'cover.jpg', { type: 'image/jpeg' });
await bookApi.updateBook('book123', {}, file);
// Uses FormData ✓
```

---

## Summary Table

| Operation | imageFile | Content-Type | Method Used |
|-----------|-----------|--------------|-------------|
| Update title | `null` | `application/json` | JSON payload |
| Update description | `null` | `application/json` | JSON payload |
| Update with image | `File` | `multipart/form-data` | FormData |
| Update only image | `File` | `multipart/form-data` | FormData |

---

## Bottom Line

**The fix is simple:** 
- 📄 **No file?** → Use JSON
- 📎 **Has file?** → Use FormData

This makes the API more robust, efficient, and compatible! ✅

