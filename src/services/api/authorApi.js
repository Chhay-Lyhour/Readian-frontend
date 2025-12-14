import axiosInstance from './axiosConfig';

const authorApi = {
  // Get author profile by ID (public endpoint)
  getAuthorProfile: async (authorId, params = {}) => {
    const { page = 1, limit = 10 } = params;
    const response = await axiosInstance.get(`/authors/${authorId}`, {
      params: { page, limit }
    });
    return response.data;
  },
};

export default authorApi;

