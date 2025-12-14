import axiosInstance from './axiosConfig';

const bookApi = {
  getAllBooks: async (params = {}) => {
    const response = await axiosInstance.get('/books', { params });
    return response.data;
  },

  getBookById: async (bookId) => {
    const response = await axiosInstance.get(`/books/${bookId}`);
    return response.data;
  },

  createBook: async (bookData, imageFile = null) => {
    const formData = new FormData();

    // Add book fields
    formData.append('title', bookData.title);
    if (bookData.description) formData.append('description', bookData.description);
    if (bookData.tags) formData.append('tags', bookData.tags);
    if (bookData.genre) formData.append('genre', bookData.genre);
    formData.append('isPremium', bookData.isPremium || false);
    formData.append('status', bookData.status || 'draft');
    formData.append('contentType', bookData.contentType || 'kids');
    formData.append('bookStatus', bookData.bookStatus || 'ongoing');

    // Add chapters if any
    if (bookData.chapters && bookData.chapters.length > 0) {
      formData.append('chapters', JSON.stringify(bookData.chapters));
    }

    // Add image file if provided
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await axiosInstance.post('/books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateBook: async (bookId, bookData, imageFile = null) => {
    // If there's an image file, use FormData
    if (imageFile) {
      const formData = new FormData();

      // Only append fields that are provided
      if (bookData.title !== undefined) formData.append('title', bookData.title);
      if (bookData.description !== undefined) formData.append('description', bookData.description);
      if (bookData.tags !== undefined) formData.append('tags', bookData.tags);
      if (bookData.genre !== undefined) formData.append('genre', bookData.genre);
      if (bookData.isPremium !== undefined) formData.append('isPremium', bookData.isPremium);
      if (bookData.status !== undefined) formData.append('status', bookData.status);
      if (bookData.contentType !== undefined) formData.append('contentType', bookData.contentType);
      if (bookData.bookStatus !== undefined) formData.append('bookStatus', bookData.bookStatus);

      // Add image file
      formData.append('image', imageFile);

      const response = await axiosInstance.patch(`/books/${bookId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      // No image file, use regular JSON payload
      const payload = {};

      if (bookData.title !== undefined) payload.title = bookData.title;
      if (bookData.description !== undefined) payload.description = bookData.description;
      if (bookData.tags !== undefined) payload.tags = bookData.tags;
      if (bookData.genre !== undefined) payload.genre = bookData.genre;
      if (bookData.isPremium !== undefined) payload.isPremium = bookData.isPremium;
      if (bookData.status !== undefined) payload.status = bookData.status;
      if (bookData.contentType !== undefined) payload.contentType = bookData.contentType;
      if (bookData.bookStatus !== undefined) payload.bookStatus = bookData.bookStatus;

      const response = await axiosInstance.patch(`/books/${bookId}`, payload);
      return response.data;
    }
  },

  deleteBook: async (bookId) => {
    const response = await axiosInstance.delete(`/books/${bookId}`);
    return response.data;
  },

  publishBook: async (bookId) => {
    const response = await axiosInstance.patch(`/books/${bookId}`, { status: 'published' });
    return response.data;
  },

  likeBook: async (bookId) => {
    const response = await axiosInstance.post(`/books/${bookId}/like`);
    return response.data;
  },

  unlikeBook: async (bookId) => {
    const response = await axiosInstance.post(`/books/${bookId}/unlike`);
    return response.data;
  },

  getBookChapters: async (bookId, params = {}) => {
    const response = await axiosInstance.get(`/books/${bookId}/chapters`, { params });

    let chapters = [];
    if (response.data.data?.chapters) {
      chapters = response.data.data.chapters;
    } else if (Array.isArray(response.data.data)) {
      chapters = response.data.data;
    } else if (response.data.chapters) {
      chapters = response.data.chapters;
    }

    chapters = chapters.map((chapter, index) => ({
      ...chapter,
      id: chapter._id || chapter.id,
      chapterNumber: chapter.chapterNumber || index + 1
    }));

    return {
      ...response.data,
      data: {
        chapters,
        pagination: response.data.pagination || response.data.data?.pagination || {}
      }
    };
  },

  getChapterByNumber: async (bookId, chapterNumber) => {
    const response = await axiosInstance.get(`/books/${bookId}/chapters/${chapterNumber}`);
    return response.data;
  },

  searchBooks: async (filters = {}) => {
    const response = await axiosInstance.get('/books/search', { params: filters });
    return response.data;
  },

  getBooksByGenre: async (genre, params = {}) => {
    const response = await axiosInstance.get('/books', {
      params: { genre, ...params },
    });
    return response.data;
  },

  getBooksByAuthor: async (authorId, params = {}) => {
    const response = await axiosInstance.get('/books', {
      params: { authorId, ...params },
    });
    return response.data;
  },

  getTrendingBooks: async (params = {}) => {
    const response = await axiosInstance.get('/books', {
      params: { sort: 'trending', ...params },
    });
    return response.data;
  },

  getPopularBooks: async (params = {}) => {
    const response = await axiosInstance.get('/books', {
      params: { sort: 'popular', ...params },
    });
    return response.data;
  },

  rateBook: async (bookId, rating) => {
    const response = await axiosInstance.post(`/books/${bookId}/rate`, { rating });
    return response.data;
  },

  // Chapter Management
  createChapter: async (bookId, chapterData) => {
    const response = await axiosInstance.post(`/books/${bookId}/chapters`, chapterData);
    return response.data;
  },

  updateChapter: async (bookId, chapterId, chapterData) => {
    const response = await axiosInstance.patch(`/books/${bookId}/chapters/${chapterId}`, chapterData);
    return response.data;
  },

  deleteChapter: async (bookId, chapterId) => {
    const response = await axiosInstance.delete(`/books/${bookId}/chapters/${chapterId}`);
    return response.data;
  },

  // Book Status and Settings
  togglePremium: async (bookId) => {
    const response = await axiosInstance.post(`/books/${bookId}/toggle-premium`);
    return response.data;
  },

  updateContentType: async (bookId, contentType) => {
    const response = await axiosInstance.patch(`/books/${bookId}/content-type`, {
      contentType
    });
    return response.data;
  },

  updateBookStatus: async (bookId, bookStatus) => {
    const response = await axiosInstance.patch(`/books/${bookId}/status`, {
      bookStatus
    });
    return response.data;
  },

  // Download Book
  downloadBook: async (bookId) => {
    const response = await axiosInstance.get(`/books/${bookId}/download`, {
      responseType: 'blob',
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `book-${bookId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return { success: true };
  },
};

export default bookApi;

