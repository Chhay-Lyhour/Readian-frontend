# Book API Quick Reference - Image Upload Edition

**Last Updated:** December 14, 2025

---

## Book Creation with Image

### Frontend Code:
```javascript
import { bookApi } from '../services/api';

// Prepare book data
const bookData = {
  title: 'My Amazing Book',
  description: 'A wonderful story...',
  genre: 'Fiction, Adventure',
  tags: 'fantasy, magic',
  isPremium: false,
  status: 'draft',
  contentType: 'kids',
  bookStatus: 'ongoing',
  chapters: [] // optional
};

// Get image file from input
const imageFile = document.getElementById('imageInput').files[0];

// Create book with image
try {
  const response = await bookApi.createBook(bookData, imageFile);
  console.log('Book created:', response.data);
  // response.data will have:
  // - _id: book ID
  // - image: Cloudinary URL
  // - createdAt: timestamp
  // - all other book fields
} catch (error) {
  console.error('Failed to create book:', error);
}
```

---

## Book Update with Image

### Update Book and Image:
```javascript
// Prepare update data
const updateData = {
  title: 'Updated Title',
  description: 'New description'
};

// Get new image file (optional)
const newImageFile = document.getElementById('imageInput').files[0];

// Update book
try {
  const response = await bookApi.updateBook(bookId, updateData, newImageFile);
  console.log('Book updated:', response.data);
} catch (error) {
  console.error('Failed to update book:', error);
}
```

### Update Only Image:
```javascript
// Update just the image, no other fields
try {
  const response = await bookApi.updateBook(bookId, {}, imageFile);
  console.log('Image updated:', response.data);
} catch (error) {
  console.error('Failed to update image:', error);
}
```

### Update Without Image:
```javascript
// Update book data without changing image
const updateData = {
  title: 'New Title',
  description: 'New description'
};

try {
  const response = await bookApi.updateBook(bookId, updateData);
  // Don't pass imageFile parameter (or pass null)
  console.log('Book updated:', response.data);
} catch (error) {
  console.error('Failed to update book:', error);
}
```

---

## Complete bookApi Methods

### Book CRUD:
```javascript
// Get all books
const books = await bookApi.getAllBooks({ page: 1, limit: 10 });

// Get book by ID
const book = await bookApi.getBookById(bookId);

// Create book (with optional image)
const newBook = await bookApi.createBook(bookData, imageFile);

// Update book (with optional image)
const updatedBook = await bookApi.updateBook(bookId, bookData, imageFile);

// Delete book
await bookApi.deleteBook(bookId);

// Publish book (change status from draft to published)
await bookApi.publishBook(bookId);
```

### Book Actions:
```javascript
// Like book
await bookApi.likeBook(bookId);

// Unlike book
await bookApi.unlikeBook(bookId);

// Rate book (1-5 stars)
await bookApi.rateBook(bookId, 5);

// Download book as PDF
await bookApi.downloadBook(bookId);
```

### Book Status:
```javascript
// Toggle premium status
await bookApi.togglePremium(bookId);

// Update content type (kids/adult)
await bookApi.updateContentType(bookId, 'adult');

// Update book status (ongoing/finished)
await bookApi.updateBookStatus(bookId, 'finished');
```

### Chapter Management:
```javascript
// Get book chapters
const chapters = await bookApi.getBookChapters(bookId, { page: 1, limit: 10 });

// Get specific chapter
const chapter = await bookApi.getChapterByNumber(bookId, chapterNumber);

// Create chapter
const newChapter = await bookApi.createChapter(bookId, {
  title: 'Chapter 1',
  content: 'Once upon a time...'
});

// Update chapter
const updatedChapter = await bookApi.updateChapter(bookId, chapterId, {
  title: 'New Title',
  content: 'Updated content...'
});

// Delete chapter
await bookApi.deleteChapter(bookId, chapterId);
```

### Search & Filter:
```javascript
// Search books
const results = await bookApi.searchBooks({
  title: 'dragon',
  genre: 'fantasy',
  tags: 'magic',
  page: 1,
  limit: 20
});

// Get books by genre
const fantasyBooks = await bookApi.getBooksByGenre('Fantasy');

// Get books by author
const authorBooks = await bookApi.getBooksByAuthor(authorId);

// Get trending books
const trending = await bookApi.getTrendingBooks();

// Get popular books
const popular = await bookApi.getPopularBooks();
```

---

## React Component Example

### Complete Book Edit Form:
```jsx
import React, { useState } from 'react';
import { bookApi } from '../services/api';

function BookEditForm({ bookId, initialData, onSuccess }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    genre: '',
    tags: '',
    isPremium: false,
    contentType: 'kids',
    bookStatus: 'ongoing'
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      setError('Invalid file type');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File too large (max 5MB)');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let response;
      if (bookId) {
        // Update existing book
        response = await bookApi.updateBook(bookId, formData, imageFile);
      } else {
        // Create new book
        response = await bookApi.createBook(formData, imageFile);
      }

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      {/* Image Upload */}
      <div>
        <label>Book Cover</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={loading}
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" style={{ maxWidth: 200 }} />
        )}
      </div>

      {/* Title */}
      <div>
        <label>Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          disabled={loading}
        />
      </div>

      {/* Description */}
      <div>
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          disabled={loading}
        />
      </div>

      {/* Submit */}
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : (bookId ? 'Update Book' : 'Create Book')}
      </button>
    </form>
  );
}

export default BookEditForm;
```

---

## Image File Handling Tips

### Get File from Input:
```javascript
// HTML
<input type="file" id="imageInput" accept="image/*" />

// JavaScript
const fileInput = document.getElementById('imageInput');
const file = fileInput.files[0];
```

### Get File from React Event:
```javascript
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Use file
  }
};
```

### Create Preview URL:
```javascript
const file = event.target.files[0];
const previewUrl = URL.createObjectURL(file);

// Display preview
setImagePreview(previewUrl);

// Clean up when done (important!)
URL.revokeObjectURL(previewUrl);
```

### Validate File:
```javascript
const validateImage = (file) => {
  // Check type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
  if (!allowedTypes.includes(file.type.toLowerCase())) {
    throw new Error('Invalid file type');
  }

  // Check size (5MB max)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('File too large');
  }

  return true;
};
```

---

## FormData Construction

### What bookApi Does Internally:
```javascript
// For createBook:
const formData = new FormData();
formData.append('title', bookData.title);
formData.append('description', bookData.description);
formData.append('genre', bookData.genre);
formData.append('tags', bookData.tags);
formData.append('isPremium', bookData.isPremium);
formData.append('contentType', bookData.contentType);
formData.append('bookStatus', bookData.bookStatus);
formData.append('chapters', JSON.stringify(bookData.chapters));

// Add image if provided
if (imageFile) {
  formData.append('image', imageFile);
}

// Send with multipart/form-data
await axiosInstance.post('/books', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

---

## Error Handling

### Common Errors:
```javascript
try {
  await bookApi.createBook(bookData, imageFile);
} catch (error) {
  if (error.response) {
    // Backend error
    switch (error.response.status) {
      case 400:
        console.error('Validation error:', error.response.data.message);
        break;
      case 401:
        console.error('Not authenticated');
        break;
      case 403:
        console.error('Not authorized');
        break;
      case 413:
        console.error('File too large');
        break;
      default:
        console.error('Server error:', error.response.data.message);
    }
  } else if (error.request) {
    // Network error
    console.error('Network error - check connection');
  } else {
    // Other error
    console.error('Error:', error.message);
  }
}
```

---

## Best Practices

### 1. Always Validate Before Upload:
```javascript
const handleImageSelect = (file) => {
  // Validate first
  if (!validateImage(file)) return;
  
  // Then proceed
  setImageFile(file);
};
```

### 2. Show Loading States:
```javascript
const [uploading, setUploading] = useState(false);

const handleUpload = async () => {
  setUploading(true);
  try {
    await bookApi.createBook(data, file);
  } finally {
    setUploading(false);
  }
};
```

### 3. Handle Errors Gracefully:
```javascript
const [error, setError] = useState(null);

try {
  await bookApi.createBook(data, file);
  setError(null);
} catch (err) {
  setError(err.response?.data?.message || 'Upload failed');
}
```

### 4. Clean Up Preview URLs:
```javascript
useEffect(() => {
  return () => {
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
  };
}, [imagePreview]);
```

---

## Common Pitfalls to Avoid

❌ **Don't upload to Cloudinary directly from frontend**
```javascript
// WRONG - exposes API keys
await uploadToCloudinary(file);
```

✅ **Do send file to backend**
```javascript
// RIGHT - backend handles Cloudinary
await bookApi.createBook(bookData, file);
```

❌ **Don't send base64 strings**
```javascript
// WRONG - inefficient
const base64 = await fileToBase64(file);
await bookApi.createBook({ ...data, image: base64 });
```

✅ **Do send actual File object**
```javascript
// RIGHT - efficient multipart upload
await bookApi.createBook(data, file);
```

❌ **Don't forget Content-Type header**
```javascript
// WRONG - bookApi handles this now
// But if you're making raw axios calls:
axios.post('/books', formData); // Missing header!
```

✅ **Do set proper Content-Type**
```javascript
// RIGHT - bookApi does this automatically
await bookApi.createBook(data, file);

// Or if making raw call:
axios.post('/books', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

---

## Debugging Checklist

When image upload fails:

1. ✅ Check file is selected: `console.log(file)`
2. ✅ Check file passes validation
3. ✅ Check FormData is constructed: `console.log([...formData.entries()])`
4. ✅ Check network request in DevTools (multipart/form-data?)
5. ✅ Check backend receives file
6. ✅ Check backend Cloudinary config
7. ✅ Check response has image URL

---

**Need Help?**
- Check `BOOK_IMAGE_UPLOAD_COMPLETE.md` for full implementation details
- Check `BOOK_IMAGE_UPLOAD_TESTING.md` for testing guide
- Check `API_DOCUMENTATION.md` for backend API reference

