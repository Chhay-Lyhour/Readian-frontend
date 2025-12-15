import axiosInstance from './axiosConfig';

const analyticsApi = {
  // Get public analytics (for landing page - top books and authors)
  getPublicAnalytics: async () => {
    const response = await axiosInstance.get('/analytics/public');
    return response.data;
  },

  // Get admin analytics (Admin only - comprehensive platform statistics)
  getAdminAnalytics: async () => {
    const response = await axiosInstance.get('/admin/analytics');
    return response.data;
  },

  // Get author download analytics (Author only - their book download statistics)
  getAuthorDownloads: async () => {
    const response = await axiosInstance.get('/author/downloads/analytics');
    return response.data;
  },

  /**
   * Get complete admin dashboard with all analytics
   * Includes: current stats, user growth (week/month/year), revenue growth (week/month/year)
   */
  getAdminDashboard: async () => {
    const response = await axiosInstance.get('/analytics/admin/dashboard');
    return response.data.data;
  },

  /**
   * Get user growth for specific period
   * @param {string} period - 'week' | 'month' | 'year'
   */
  getUserGrowth: async (period = 'week') => {
    const response = await axiosInstance.get('/analytics/admin/user-growth', {
      params: { period }
    });
    return response.data.data;
  },

  /**
   * Get revenue growth for specific period
   * @param {string} period - 'week' | 'month' | 'year'
   */
  getRevenueGrowth: async (period = 'week') => {
    const response = await axiosInstance.get('/analytics/admin/revenue-growth', {
      params: { period }
    });
    return response.data.data;
  },
};

export default analyticsApi;

