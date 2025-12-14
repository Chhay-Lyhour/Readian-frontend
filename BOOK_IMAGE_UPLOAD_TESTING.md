# Book Image Upload - Testing Guide

**Date:** December 14, 2025

---

## Quick Start Testing

### Prerequisites
1. ✅ Backend is running with Cloudinary configured
2. ✅ Frontend is running (`npm run dev`)
3. ✅ You are logged in as an author

---

## Test 1: Create New Book with Image

### Steps:
1. Go to Author Dashboard
2. Click "Create New Book" or navigate to `/edit/new`
3. Fill in book details:
   - **Title:** "Test Book with Image"
   - **Description:** "This is a test book"
   - **Genre:** "Fiction"
   - **Tags:** "test, demo"
4. Click **"Upload Cover"** button
5. Select an image file (JPEG, PNG, WebP, HEIC - under 5MB)
6. You should see:
   - ✅ Image preview appears immediately
   - ✅ Toast message: "Image selected! It will be uploaded when you save the book."
7. Click **"Save"** button
8. You should see:
   - ✅ Loading state while saving
   - ✅ Success toast: "Book created successfully!"
   - ✅ Redirected to edit page for new book
9. Navigate to browse page or author dashboard
10. Find your new book card
11. Verify:
    - ✅ Book cover image displays correctly
    - ✅ Creation date shows (NOT "N/A")
    - ✅ All book details are correct

### Expected Result:
✅ Book created with image uploaded to Cloudinary  
✅ Image URL stored in database  
✅ Image displays on book cards  
✅ Date displays correctly

---

## Test 2: Create New Book without Image

### Steps:
1. Navigate to `/edit/new`
2. Fill in book details (no image)
3. Click **"Save"**
4. Navigate to browse page
5. Find your book

### Expected Result:
✅ Book created successfully  
✅ "No Preview" placeholder shows on card  
✅ Date displays correctly (NOT "N/A")

---

## Test 3: Update Existing Book - Add Image

### Steps:
1. Find a book without an image
2. Click edit button (or navigate to `/edit/{bookId}`)
3. Click **"Upload Cover"**
4. Select an image file
5. You should see:
   - ✅ Image preview appears immediately
   - ✅ Loading spinner over image
   - ✅ Toast: "Cover image updated successfully!"
   - ✅ Image URL updates automatically
6. Click **"Save"** (optional - image is already saved)
7. Go back to browse page
8. Verify image now displays on book card

### Expected Result:
✅ Image uploaded immediately when selected  
✅ No need to click Save for image  
✅ Image displays correctly on cards

---

## Test 4: Update Existing Book - Change Image

### Steps:
1. Find a book that already has an image
2. Navigate to edit page
3. Click **"Upload Cover"**
4. Select a different image
5. You should see:
   - ✅ New image preview replaces old one
   - ✅ Loading spinner
   - ✅ Success toast
6. Go to browse page
7. Verify new image displays

### Expected Result:
✅ Old image replaced with new one  
✅ Old Cloudinary image may be replaced (check backend logic)  
✅ New image displays everywhere

---

## Test 5: Error Handling - Invalid File Type

### Steps:
1. Navigate to book edit page
2. Try to upload a PDF or text file
3. You should see:
   - ❌ Error toast: "Please upload a valid image file (JPEG, PNG, HEIC or WebP)"
   - ❌ Image not uploaded

### Expected Result:
✅ Clear error message  
✅ Upload prevented  
✅ Original image (if any) unchanged

---

## Test 6: Error Handling - File Too Large

### Steps:
1. Navigate to book edit page
2. Try to upload an image larger than 5MB
3. You should see:
   - ❌ Error toast: "Image size must be less than 5MB"
   - ❌ Image not uploaded

### Expected Result:
✅ Clear error message  
✅ Upload prevented

---

## Test 7: Network Error Handling

### Steps:
1. Open browser DevTools > Network tab
2. Throttle network to "Offline"
3. Try to upload an image
4. You should see:
   - ❌ Error message displayed
   - ❌ Upload fails gracefully

### Expected Result:
✅ Error handled gracefully  
✅ User notified of failure  
✅ Can retry when online

---

## Debugging Tips

### If Image Upload Fails:

1. **Check Browser Console:**
```javascript
// Look for these logs:
"📸 File selected: ..."
"✅ File validation passed"
"📝 Uploading image for existing book..." or "💾 Image will be uploaded..."
```

2. **Check Network Tab:**
- Look for POST/PATCH request to `/api/books` or `/api/books/:id`
- Content-Type should be `multipart/form-data`
- Check if image file is in FormData payload

3. **Check Backend Logs:**
- Look for Cloudinary upload logs
- Check for any errors in backend console

### If Date Shows "N/A":

1. **Check API Response:**
```javascript
// In browser console after creating book:
// Look at the response in Network tab
// Should contain: createdAt: "2025-12-14T..."
```

2. **Add Debug Logs:**
```javascript
// In BookCard.jsx, add:
console.log('Book dates:', { 
  publishedDate, 
  createdAt, 
  displayDate 
});
```

3. **Verify Backend:**
- Check if backend returns `createdAt` in response
- Verify timestamp is in ISO format
- Check database schema has timestamps enabled

---

## Common Issues & Solutions

### Issue: "Unknown API key" Error
**Solution:** Backend Cloudinary configuration is incorrect. Check backend `.env` file for proper Cloudinary credentials.

### Issue: Image Preview Shows but Upload Fails
**Solution:** 
- Check network connectivity
- Verify backend is running
- Check backend Cloudinary configuration

### Issue: Image Uploads but Doesn't Display
**Solution:**
- Check if Cloudinary URL is returned in API response
- Verify BookCard is using correct image field name
- Clear browser cache

### Issue: Date Always Shows "N/A"
**Solution:**
- Backend not returning `createdAt` timestamp
- Check book model schema
- Verify timestamps are enabled in backend

### Issue: Can't Upload HEIC Files
**Solution:**
- HEIC support depends on backend image processing
- Try converting to JPEG/PNG first
- Check backend multer/cloudinary configuration

---

## API Endpoints Being Used

### Create Book:
```
POST /api/books
Content-Type: multipart/form-data
Body: FormData with image file
```

### Update Book:
```
PATCH /api/books/:id
Content-Type: multipart/form-data
Body: FormData with image file (optional)
```

---

## Success Criteria

✅ Can create book with image  
✅ Can create book without image  
✅ Can add image to existing book  
✅ Can update/change image  
✅ Images upload to Cloudinary (not local storage)  
✅ Images display on book cards  
✅ Creation date displays correctly (not "N/A")  
✅ File validation works (type, size)  
✅ Error messages are clear and helpful  
✅ Loading states show during upload  
✅ Backend handles all Cloudinary operations

---

## Next Steps After Testing

If all tests pass:
1. ✅ Implementation is complete
2. ✅ Document any issues found
3. ✅ Consider adding image cropping/resizing on frontend
4. ✅ Consider adding image optimization on backend

If tests fail:
1. 🔍 Use debugging tips above
2. 🔍 Check browser console and network tab
3. 🔍 Check backend logs
4. 🔍 Review API documentation
5. 🔍 Contact support if needed

---

**Happy Testing! 🚀**

