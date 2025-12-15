import { useState, useEffect, useCallback } from 'react';
import { analyticsApi } from '../services/api';

/**
 * Hook for complete dashboard analytics
 * Returns all data at once (current stats + growth for all periods)
 */
export const useDashboardAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await analyticsApi.getAdminDashboard();
      setData(result);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch dashboard analytics';
      setError(errorMessage);
      console.error('Dashboard analytics error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh: fetchData };
};

/**
 * Hook for user growth analytics with period selection
 * @param {string} period - 'week' | 'month' | 'year'
 */
export const useUserGrowth = (period = 'week') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await analyticsApi.getUserGrowth(period);
        setData(result);
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch user growth';
        setError(errorMessage);
        console.error('User growth error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

  return { data, loading, error };
};

/**
 * Hook for revenue growth analytics with period selection
 * @param {string} period - 'week' | 'month' | 'year'
 */
export const useRevenueGrowth = (period = 'week') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await analyticsApi.getRevenueGrowth(period);
        setData(result);
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch revenue growth';
        setError(errorMessage);
        console.error('Revenue growth error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

  return { data, loading, error };
};

