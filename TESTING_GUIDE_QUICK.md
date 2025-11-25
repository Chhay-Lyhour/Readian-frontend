# Quick Testing Guide

## Recent Changes to Test

### 1. Browse Sidebar Search (Enter Key) ✅
**How to test**:
1. Go to Browse page
2. Type in Title field (e.g., "fantasy")
3. Notice: Nothing happens while typing ✓
4. Press **Enter** key
5. Results should filter ✓

**Same behavior for**:
- Author field
- Genre field
- Tags field

### 2. Likes Filter Range ✅
**How to test**:
1. Go to Browse page
2. Scroll to "Likes more than" slider
3. Drag slider - should go from 0 to 100
4. Each step is 1 like (not 50)
5. Books filter immediately as you slide

### 3. Password Change with Visibility Toggle ✅
**How to test**:
1. Go to Profile page
2. Click "Edit Profile"
3. Scroll to password section
4. Type in Current Password
5. Click the 🔒 icon - password should become visible (👁️)
6. Click again - password should hide (🔒)

### 4. Book Creation/Edit Status Options ✅
**How to test**:
1. Go to Author Dashboard → My Drafts
2. Click "Create New" or edit existing book
3. Check Status options:
   - Ongoing ✓
   - Finished ✓
   - Hiatus ✓

### 5. Premium Status (Boolean) ✅
**How to test**:
1. Create or edit a book
2. Check Premium Status section:
   - Free (radio button)
   - Premium (radio button)
3. Save and verify it saves correctly

## Full Feature Testing

### Authentication Flow
```
1. Register new account → Verify email
2. Login → Check session persists on refresh
3. Logout → Verify redirected to landing
4. Login again → Profile data intact
```

### Profile Management
```
1. Update name → Save → Verify updated
2. Update bio → Save → Verify updated
3. Update age → Save → Verify updated
4. Upload profile image → Verify appears
5. Change password → Logout → Login with new password
```

### Browse & Search
```
1. Browse page → See all books
2. Type in Title → Press Enter → Filtered results
3. Select Status → Immediate filter
4. Select Premium filter → Immediate filter
5. Adjust likes slider → Immediate filter
6. Click on book card → View details
```

### Book Details
```
1. View book information
2. See author card with bio (if available)
3. View table of contents
4. Click on chapter → Read chapter
5. Rate book (1-5 stars)
6. Like/unlike book
```

### Chapter Reading
```
1. Read chapter content
2. Use Previous/Next buttons at bottom
3. Click "Chapters" dropdown in navbar
4. Select different chapter from dropdown
5. Click "Back to Book" to return
```

### Author Dashboard

#### My Works (Published Books Only)
```
1. Should only show published books
2. No drafts should appear here
3. Click book → Edit page
```

#### My Drafts (Draft Books Only)
```
1. Should only show draft books
2. No published books here
3. Click "Create New" → New book page
4. Fill details → Save → Appears in drafts
5. Publish book → Moves to My Works
```

#### My Liked
```
1. See all liked books
2. Click book → View details
3. Unlike from card → Removes from list
```

### Book CRUD Operations

#### Create Book
```
1. My Drafts → "Create New"
2. Fill: Title, Description, Tags, Genre
3. Select Status (ongoing/finished/hiatus)
4. Select Premium (Free/Premium)
5. Upload cover image
6. Add chapters (title + content)
7. Click Save → Book created
```

#### Update Book
```
1. Click on book card in My Works/Drafts
2. Edit any field
3. Change cover image
4. Modify chapters
5. Click Save → Updates applied
```

#### Publish Book
```
1. Edit draft book
2. Click "Publish" button
3. Book moves from Drafts to My Works
```

#### Delete Book
```
1. Edit book
2. Click "Delete" button
3. Confirm deletion
4. Book removed
```

### Admin Dashboard

#### All Works
```
1. See all published books
2. Filter by title
3. Filter by author
4. Click book → View details
5. Hover over book → Click "Remove"
6. Provide reason → Confirm → Book deleted
```

#### All Users
```
1. See all registered users
2. View user details
3. Filter users
```

### Subscription Features
```
1. View subscription status
2. Non-premium user tries to read premium book → Blocked
3. Premium user reads premium book → Access granted
4. Free books accessible to all users (even non-logged in)
```

## Edge Cases to Test

### 1. Empty States
- No books in browse
- No chapters in book
- No drafts for author
- No liked books

### 2. Long Text
- Very long book title
- Very long description
- Many tags
- Long chapter content

### 3. Permissions
- Non-author tries to edit someone else's book
- Non-admin tries to access admin dashboard
- Non-premium user tries premium book

### 4. Mobile Responsiveness
- Browse sidebar collapses
- Settings sidebar collapses
- Admin sidebar collapses
- All buttons touch-friendly
- Text readable on small screens

## Expected Behavior Summary

| Action | Expected Result |
|--------|----------------|
| Type in search | No immediate search |
| Press Enter in search | Triggers search |
| Change status filter | Immediate filter |
| Change premium filter | Immediate filter |
| Drag likes slider | Immediate filter |
| Upload image | Shows preview + uploads to Cloudinary |
| Save book | Creates/updates in database |
| Publish book | Moves from drafts to works |
| Rate book | Updates rating display |
| Like book | Adds to liked books |
| Unlike book | Removes from liked books |
| Logout | Clears session |
| Refresh page | Session persists |

## Common Issues & Solutions

### Issue: Can't log in
- Check credentials
- Verify email is confirmed
- Check backend is running

### Issue: Images not uploading
- Check file size (max 5MB)
- Check file type (JPEG, PNG, WebP, HEIC)
- Verify Cloudinary credentials

### Issue: Books not showing
- Check pubStatus filter
- Verify books are published (not drafts)
- Check API response in console

### Issue: Can't access premium book
- Verify user has premium subscription
- Check subscription status endpoint
- Confirm book is marked as premium

### Issue: Rating not working
- Must be logged in
- Must send {"rating": 4} format
- Check API endpoint

---

## Quick Commands

**Start Dev Server**:
```bash
npm run dev
```

**Check for Errors**:
```bash
npm run lint
```

**Build for Production**:
```bash
npm run build
```

**Preview Production Build**:
```bash
npm run preview
```

---

**Last Updated**: January 23, 2025
**Version**: 1.0
**Status**: All features tested and working ✅

