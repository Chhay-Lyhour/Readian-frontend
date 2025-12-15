import React from 'react';
import { Link } from 'react-router-dom';
import { useDashboardAnalytics } from '../../hooks/useAnalytics';
import UserGrowthChart from './UserGrowthChart';
import RevenueGrowthChart from './RevenueGrowthChart';
import { Users, BookOpen, Eye, Heart, Star, Download, FileText, TrendingUp } from 'lucide-react';

const AdminAnalytics = () => {
  const { data, loading, error, refresh } = useDashboardAnalytics();

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#1A5632] border-t-transparent"></div>
          <p className="mt-4 text-lg text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <span className="text-6xl mb-4">⚠️</span>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refresh}
            className="px-6 py-3 bg-[#1A5632] text-[#FFD7DF] rounded-lg font-semibold hover:bg-[#00A819] transition-all"
          >
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = data?.currentStats;
  const detailed = data?.currentStats?.detailed;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold text-[#1A5632] flex items-center gap-3">
            <TrendingUp size={40} />
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Overview of your platform performance
          </p>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="px-6 py-3 bg-[#1A5632] text-[#FFD7DF] rounded-lg font-semibold hover:bg-[#00A819] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🔄 Refresh Data
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users Card with Roles Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#C0FFB3] p-3 rounded-lg">
              <Users size={32} className="text-[#1A5632]" />
            </div>
          </div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-[#1A5632]">{stats?.totalUsers?.toLocaleString() || '0'}</p>
          <div className="mt-2 text-xs text-gray-500">
            <div>Admins: {stats?.users?.roles?.ADMIN || 0}</div>
            <div>Authors: {stats?.users?.roles?.AUTHOR || 0}</div>
            <div>Readers: {stats?.users?.roles?.READER || 0}</div>
          </div>
        </div>

        {/* Active Subscriptions Card with Revenue */}
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#FFD7DF] p-3 rounded-lg">
              <Star size={32} className="text-[#FF1493]" />
            </div>
          </div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Active Subscriptions</h3>
          <p className="text-3xl font-bold text-[#FF1493]">
            {((stats?.basicSubscribers || 0) + (stats?.premiumSubscribers || 0)).toLocaleString()}
          </p>
          <div className="mt-2 text-xs text-gray-500">
            <div>{stats?.basicSubscribers || 0} Basic, {stats?.premiumSubscribers || 0} Premium</div>
            <div className="mt-1 font-semibold text-[#00A819]">Revenue: ${stats?.revenueThisMonth || 0}</div>
          </div>
        </div>

        {/* Total Books Card with Chapters */}
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#FFFDEE] p-3 rounded-lg">
              <BookOpen size={32} className="text-[#00A819]" />
            </div>
          </div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Books</h3>
          <p className="text-3xl font-bold text-[#00A819]">{stats?.totalBooks?.toLocaleString() || '0'}</p>
          <div className="mt-2 text-xs text-gray-500">
            <div>{stats?.publishedBooks || 0} Published</div>
            <div>{stats?.totalChapters?.toLocaleString() || 0} Chapters</div>
          </div>
        </div>

        {/* Total Views Card with Likes */}
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gray-100 p-3 rounded-lg">
              <Eye size={32} className="text-gray-700" />
            </div>
          </div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Views</h3>
          <p className="text-3xl font-bold text-gray-700">{stats?.books?.totalViews?.toLocaleString() || '0'}</p>
          <div className="mt-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Heart size={12} className="text-[#FF1493]" />
              {stats?.books?.totalLikes?.toLocaleString() || 0} Likes
            </div>
            <div>⭐ {stats?.books?.averageRating?.toFixed(1) || '0.0'} Avg Rating</div>
          </div>
        </div>
      </div>

      {/* Growth Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <UserGrowthChart />
        <RevenueGrowthChart />
      </div>

      {/* Top Books Table */}
      {detailed?.topBooks && detailed.topBooks.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
          <h2 className="text-2xl font-bold text-[#1A5632] mb-6">📚 Top Books</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-[#1A5632]">
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Book</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Author</th>
                  <th className="text-center py-3 px-4 font-bold text-gray-700">Views</th>
                  <th className="text-center py-3 px-4 font-bold text-gray-700">Likes</th>
                  <th className="text-center py-3 px-4 font-bold text-gray-700">Rating</th>
                  <th className="text-center py-3 px-4 font-bold text-gray-700">Downloads</th>
                </tr>
              </thead>
              <tbody>
                {detailed.topBooks.map((book) => (
                  <tr key={book._id} className="border-b hover:bg-[#C0FFB3]/20 transition-colors">
                    <td className="py-3 px-4">
                      <Link to={`/book/${book._id}`} className="block hover:underline">
                        <div className="font-semibold text-[#1A5632]">{book.title}</div>
                        <div className="text-xs text-gray-500">{book.genre}</div>
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-sm">{book.author.name}</td>
                    <td className="py-3 px-4 text-center font-semibold">{book.viewCount?.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center font-semibold text-[#FF1493]">{book.totalLikes?.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">
                      {book.averageRating > 0 ? (
                        <span className="font-semibold text-[#00A819]">⭐ {book.averageRating.toFixed(1)}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center font-semibold">{book.downloadCount?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top Authors Table */}
      {detailed?.topAuthors && detailed.topAuthors.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
          <h2 className="text-2xl font-bold text-[#1A5632] mb-6">✍️ Top Authors</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-[#1A5632]">
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Author</th>
                  <th className="text-center py-3 px-4 font-bold text-gray-700">Books</th>
                  <th className="text-center py-3 px-4 font-bold text-gray-700">Views</th>
                  <th className="text-center py-3 px-4 font-bold text-gray-700">Likes</th>
                  <th className="text-center py-3 px-4 font-bold text-gray-700">Avg Rating</th>
                  <th className="text-center py-3 px-4 font-bold text-gray-700">Downloads</th>
                </tr>
              </thead>
              <tbody>
                {detailed.topAuthors.map((author) => (
                  <tr key={author.authorId} className="border-b hover:bg-[#C0FFB3]/20 transition-colors">
                    <td className="py-3 px-4">
                      <Link to={`/author/${author.authorId}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        {author.authorAvatar ? (
                          <img
                            src={author.authorAvatar}
                            alt={author.authorName}
                            className="w-10 h-10 rounded-full object-cover border-2 border-[#1A5632]"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#C0FFB3] flex items-center justify-center border-2 border-[#1A5632]">
                            <Users size={20} className="text-[#1A5632]" />
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-[#1A5632] hover:underline">{author.authorName}</div>
                          <div className="text-xs text-gray-500">{author.authorEmail}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-center font-semibold">{author.bookCount}</td>
                    <td className="py-3 px-4 text-center font-semibold">{author.totalViews?.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center font-semibold text-[#FF1493]">{author.totalLikes?.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">
                      {author.averageRating > 0 ? (
                        <span className="font-semibold text-[#00A819]">⭐ {author.averageRating.toFixed(1)}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center font-semibold">{author.totalDownloads?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;

