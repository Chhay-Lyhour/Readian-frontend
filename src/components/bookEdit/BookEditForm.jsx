import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { showErrorToast, showWarningToast } from '../../services/utils/errorHandler';

const BookEditForm = ({
  title, setTitle,
  description, setDescription,
  status, setStatus,
  bookStatus, setBookStatus,
  tags, setTags,
  genre, setGenre,
  premiumStatus, setPremiumStatus,
  contentType, setContentType,
  coverImageUrl,
  onImageUpload,
  uploadingImage,
  onSave,
  saving,
  user, // User prop to check age
  onDelete, // Delete handler
  isNew // Check if creating new book
}) => {
  const [tagInput, setTagInput] = useState('');
  const [genreInput, setGenreInput] = useState('');
  const [errors, setErrors] = useState({});

  // Check if user is underage (less than 18)
  const isUnderage = user?.age !== null && user?.age !== undefined && user?.age < 18;

  useEffect(() => {
    if (premiumStatus === undefined) {
      setPremiumStatus(false);
    }
  }, [premiumStatus, setPremiumStatus]);

  // If user is underage and contentType is set to adult, force it to kids
  useEffect(() => {
    if (isUnderage && contentType === 'adult') {
      console.log('⚠️ Underage author detected - forcing content type to kids');
      setContentType('kids');
    }
  }, [isUnderage, contentType, setContentType]);

  // Validate form according to backend schema
  const validateForm = () => {
    const newErrors = {};

    // Title validation (required, min 1 character)
    if (!title || title.trim().length === 0) {
      newErrors.title = '📝 Title is required';
      showErrorToast('📝 Title is required');
      return false;
    }

    // Description validation (min 10, max 1000 characters if provided)
    if (description && description.trim().length > 0) {
      if (description.trim().length < 10) {
        newErrors.description = '📄 Description must be at least 10 characters';
        showErrorToast('📄 Description must be at least 10 characters');
        return false;
      }
      if (description.trim().length > 1000) {
        newErrors.description = '📄 Description cannot exceed 1000 characters';
        showErrorToast('📄 Description cannot exceed 1000 characters');
        return false;
      }
    }

    // Content type validation (must be kids or adult)
    if (!contentType || !['kids', 'adult'].includes(contentType)) {
      newErrors.contentType = '🔞 Content type must be either Kids Friendly or Adult (18+)';
      showErrorToast('🔞 Content type must be either Kids Friendly or Adult (18+)');
      return false;
    }

    // Age restriction validation
    if (isUnderage && contentType === 'adult') {
      newErrors.contentType = '⚠️ Authors under 18 cannot create Adult (18+) content';
      showErrorToast('⚠️ Authors under 18 cannot create Adult (18+) content');
      return false;
    }

    // Book status validation
    if (!bookStatus) {
      newErrors.bookStatus = '📖 Please select a book status (Ongoing or Finished)';
      showWarningToast('📖 Please select a book status (Ongoing or Finished)');
      return false;
    }

    // Tags validation (optional but if provided, should be valid)
    if (tags && tags.length > 0) {
      const invalidTags = tags.filter(tag => !tag || tag.trim().length === 0);
      if (invalidTags.length > 0) {
        newErrors.tags = '🏷️ All tags must have valid content';
        showErrorToast('🏷️ All tags must have valid content');
        return false;
      }
    }

    // Genre validation (optional but if provided, should be valid)
    if (genre && genre.length > 0) {
      const invalidGenres = genre.filter(g => !g || g.trim().length === 0);
      if (invalidGenres.length > 0) {
        newErrors.genre = '📚 All genres must have valid content';
        showErrorToast('📚 All genres must have valid content');
        return false;
      }
    }

    // Premium status validation (must be boolean)
    if (premiumStatus !== true && premiumStatus !== false) {
      newErrors.premiumStatus = '💎 Premium status must be selected';
      showWarningToast('💎 Premium status must be selected');
      return false;
    }

    // Publication status validation
    if (!status || !['draft', 'published'].includes(status)) {
      newErrors.status = '📤 Publication status must be either Draft or Published';
      showErrorToast('📤 Publication status must be either Draft or Published');
      return false;
    }

    setErrors({});
    return true;
  };

  // Enhanced save handler with validation
  const handleSaveWithValidation = (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate form
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    // If validation passes, call the original onSave
    onSave(e);
  };

  const handleAddTag = () => {
    const newTag = tagInput.trim().toLowerCase();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setTagInput('');
  };

  const handleDeleteTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddGenre = () => {
    const newGenre = genreInput.trim();
    if (newGenre && !genre.includes(newGenre)) {
      setGenre([...genre, newGenre]);
    }
    setGenreInput('');
  };

  const handleDeleteGenre = (genreToRemove) => {
    setGenre(genre.filter(g => g !== genreToRemove));
  };

  const handleKeyPress = (e, handler) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handler();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-[50px] w-full max-w-[910px] px-4 lg:px-0">
      {/* Cover Image - Same pattern as profile image */}
      <div className="w-full lg:w-[220px]">
        <div className="relative w-full h-[330px] bg-gray-300 rounded-[15px] flex items-center justify-center overflow-hidden mb-[20px]">
          {coverImageUrl ? (
            <img
              src={coverImageUrl}
              alt="Book Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <svg className="w-16 h-16 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-center">No Cover Image</span>
            </div>
          )}
          {uploadingImage && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent"></div>
            </div>
          )}
        </div>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic"
          onChange={onImageUpload}
          disabled={uploadingImage}
          className="hidden"
          id="cover-upload"
        />
        <label
          htmlFor="cover-upload"
          className={`w-full px-4 py-3 bg-[#1A5632] text-white rounded-lg cursor-pointer block text-center font-semibold transition-all duration-300 ${
            uploadingImage
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-[#00A819] hover:scale-105 focus-within:ring-2 focus-within:ring-[#00A819] focus-within:ring-offset-2'
          }`}
        >
          {uploadingImage ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Uploading...
            </span>
          ) : 'Upload Cover'}
        </label>
        <p className="text-xs text-gray-500 mt-2 text-center">
          JPEG, PNG, WebP or HEIC (Max 5MB)
        </p>
      </div>

      {/* Story Details Form */}
      <form
        className="w-full lg:w-[640px] bg-[#C0FFB3] p-4 sm:p-6 rounded-[20px] border-b-2 border-r-2 border-black"
        onSubmit={handleSaveWithValidation}
      >
        <h2 className="geist text-xl sm:text-2xl font-bold mb-4">Story Details</h2>

        {/* Title */}
        <label className="block text-sm font-semibold text-gray-800 mb-2">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors({...errors, title: null});
          }}
          className={`w-full px-4 py-3 border-2 rounded-lg mb-4 bg-white transition-all ${
            errors.title
              ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20'
              : 'border-gray-300 focus:border-[#00A819] focus:ring-2 focus:ring-[#00A819] focus:ring-opacity-20'
          } focus:outline-none`}
          placeholder="Enter book title..."
          required
        />
        {errors.title && (
          <p className="text-red-600 text-sm -mt-3 mb-3 flex items-center gap-1">
            <span>⚠️</span> {errors.title}
          </p>
        )}

        {/* Description */}
        <label className="block text-sm font-semibold text-gray-800 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors({...errors, description: null});
          }}
          className={`w-full px-4 py-3 border-2 rounded-lg mb-2 h-32 bg-white resize-none transition-all ${
            errors.description
              ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20'
              : 'border-gray-300 focus:border-[#00A819] focus:ring-2 focus:ring-[#00A819] focus:ring-opacity-20'
          } focus:outline-none`}
          placeholder="Describe your book (10-1000 characters)..."
        />
        {description && (
          <p className={`text-xs mb-2 ${description.length > 1000 ? 'text-red-600' : 'text-gray-600'}`}>
            {description.length}/1000 characters {description.length < 10 && '(minimum 10)'}
          </p>
        )}
        {errors.description && (
          <p className="text-red-600 text-sm -mt-1 mb-3">⚠️ {errors.description}</p>
        )}

        {/* Tags */}
        <label className="geist block font-semibold mb-1">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => {
              setTagInput(e.target.value);
              if (errors.tags) setErrors({...errors, tags: null});
            }}
            onKeyPress={(e) => handleKeyPress(e, handleAddTag)}
            className={`w-full p-2 border rounded-[10px] bg-white ${errors.tags ? 'border-red-500 border-2' : ''}`}
            placeholder="Add a tag and press Enter"
          />
          <button type="button" onClick={handleAddTag} className="bg-gray-700 text-[#FFD7DF] px-4 rounded-[10px]">
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span key={tag} className="bg-white px-2 py-1 rounded-full text-sm border-2 border-white hover:border-black">
              {tag}
              <button type="button" onClick={() => handleDeleteTag(tag)} className="ml-1 font-bold">X</button>
            </span>
          ))}
        </div>
        {errors.tags && (
          <p className="text-red-600 text-sm mb-3">⚠️ {errors.tags}</p>
        )}

        {/* Genre */}
        <label className="geist block font-semibold mb-1">Genre</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={genreInput}
            onChange={(e) => {
              setGenreInput(e.target.value);
              if (errors.genre) setErrors({...errors, genre: null});
            }}
            onKeyPress={(e) => handleKeyPress(e, handleAddGenre)}
            className={`w-full p-2 border rounded-[10px] bg-white ${errors.genre ? 'border-red-500 border-2' : ''}`}
            placeholder="Add a genre and press Enter"
          />
          <button type="button" onClick={handleAddGenre} className="bg-gray-700 text-[#FFD7DF] px-4 rounded-[10px]">
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {genre.map((g) => (
            <span key={g} className="bg-white px-2 py-1 rounded-full text-sm border-2 border-white hover:border-black">
              {g}
              <button type="button" onClick={() => handleDeleteGenre(g)} className="ml-1 font-bold">X</button>
            </span>
          ))}
        </div>
        {errors.genre && (
          <p className="text-red-600 text-sm mb-3">⚠️ {errors.genre}</p>
        )}

        {/* Book Status */}
        <label className="block font-semibold mb-1">Book Status *</label>
        <div className={`mb-2 ${errors.bookStatus ? 'p-2 border-2 border-red-500 rounded-lg' : ''}`}>
          <label className="mr-4">
            <input
              type="radio"
              value="ongoing"
              checked={bookStatus === 'ongoing'}
              onChange={(e) => {
                setBookStatus(e.target.value);
                if (errors.bookStatus) setErrors({...errors, bookStatus: null});
              }}
              className="mr-1"
            />
            Ongoing
          </label>
          <label className="mr-4">
            <input
              type="radio"
              value="finished"
              checked={bookStatus === 'finished'}
              onChange={(e) => {
                setBookStatus(e.target.value);
                if (errors.bookStatus) setErrors({...errors, bookStatus: null});
              }}
              className="mr-1"
            />
            Finished
          </label>
{/*           <label className="mr-4"> */}
{/*             <input type="radio" value="hiatus" checked={bookStatus === 'hiatus'} onChange={(e) => setBookStatus(e.target.value)} className="mr-1" /> */}
{/*             Hiatus */}
{/*           </label> */}
        </div>
        {errors.bookStatus && (
          <p className="text-red-600 text-sm mb-3">⚠️ {errors.bookStatus}</p>
        )}

        {/* Content Type (Age Restriction) */}
        <label className="block font-semibold mb-1">Content Type *</label>
        {isUnderage && (
          <div className="mb-2 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 text-sm rounded">
            <p className="font-semibold">⚠️ Age Restriction Notice</p>
            <p>Authors under 18 years old can only create Kids Friendly content. You must be 18 or older to create Adult (18+) content.</p>
          </div>
        )}
        <div className={`mb-2 ${errors.contentType ? 'p-2 border-2 border-red-500 rounded-lg' : ''}`}>
          <label className="mr-4">
            <input
              type="radio"
              value="kids"
              checked={contentType === 'kids'}
              onChange={(e) => {
                setContentType(e.target.value);
                if (errors.contentType) setErrors({...errors, contentType: null});
              }}
              className="mr-1"
            />
            Kids Friendly
          </label>
          <label className={isUnderage ? 'opacity-50 cursor-not-allowed' : ''}>
            <input
              type="radio"
              value="adult"
              checked={contentType === 'adult'}
              onChange={(e) => {
                setContentType(e.target.value);
                if (errors.contentType) setErrors({...errors, contentType: null});
              }}
              className="mr-1"
              disabled={isUnderage}
            />
            Adult (18+)
            {isUnderage && <span className="text-xs text-red-600 ml-1">(Restricted)</span>}
          </label>
        </div>
        {errors.contentType && (
          <p className="text-red-600 text-sm mb-3">⚠️ {errors.contentType}</p>
        )}

        {/* Premium Status */}
        <label className="block font-semibold mb-1 mt-4">Premium Status</label>
        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              value={false}
              checked={premiumStatus === false}
              onChange={() => setPremiumStatus(false)}
              className="mr-1"
            />
            Free
          </label>
          <label>
            <input
              type="radio"
              value={true}
              checked={premiumStatus === true}
              onChange={() => setPremiumStatus(true)}
              className="mr-1"
            />
            Premium
          </label>
        </div>

        {/* Publication Status (for manual control) */}
        <label className="block font-semibold mb-1 mt-4">Publication Status</label>
        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              value="draft"
              checked={status === 'draft'}
              onChange={(e) => setStatus(e.target.value)}
              className="mr-1"
            />
            Draft
          </label>
          <label>
            <input
              type="radio"
              value="published"
              checked={status === 'published'}
              onChange={(e) => setStatus(e.target.value)}
              className="mr-1"
            />
            Published
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 items-center">
          <button
            type="submit"
            disabled={saving || uploadingImage}
            className="flex-1 bg-[#1A5632] text-[#FFD7DF] p-3 rounded-lg font-bold hover:bg-[#FFD7DF] hover:text-[#1A5632] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Book'}
          </button>

          {/* Delete button - only show for existing books */}
          {onDelete && !isNew && (
            <button
              type="button"
              onClick={onDelete}
              disabled={saving}
              className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Delete Book"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookEditForm;
