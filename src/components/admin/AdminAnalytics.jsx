import React from 'react';
import { Link } from 'react-router-dom';
import { useDashboardAnalytics } from '../../hooks/useAnalytics';
import UserGrowthChart from './UserGrowthChart';
import RevenueGrowthChart from './RevenueGrowthChart';
import { Users, BookOpen, Eye, Heart, Star, Download, FileText, TrendingUp, RefreshCw, Crown, Pen, BookMarked, Gem, BookCheck, Edit3, FileEdit } from 'lucide-react';

const AdminAnalytics = () => {
  const { data, loading, error, refresh } = useDashboardAnalytics();

  if (loading) {
    return (
      <div className="p-6">
        <div className="space-y-6 animate-pulse">
          {/* Skeleton for stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-lg"></div>
                  <div className="w-12 h-6 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center text-gray-600">Loading dashboard data...</div>
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
            Retry
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
          className="px-6 py-3 bg-[#1A5632] text-white rounded-lg font-semibold hover:bg-[#00A819] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-[#00A819] focus:ring-offset-2 flex items-center gap-2"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Refresh Data
        </button>
      </div>

{/*        */}{/* Quick Actions */}
{/*       <div className="bg-gradient-to-r from-[#C0FFB3] to-[#00A819]/20 rounded-xl p-6 border-2 border-[#00A819]/20"> */}
{/*         <div className="flex items-center justify-between flex-wrap gap-4"> */}
{/*           <div> */}
{/*             <h2 className="text-xl font-bold text-[#1A5632] mb-1">Quick Actions</h2> */}
{/*             <p className="text-sm text-gray-600">Manage your platform efficiently</p> */}
{/*           </div> */}
{/*           <div className="flex gap-3 flex-wrap"> */}
{/*             <Link */}
{/*               to="/admindash/allusers" */}
{/*               className="px-4 py-2 bg-white text-[#1A5632] rounded-lg font-semibold hover:bg-[#1A5632] hover:text-white transition-all shadow-sm flex items-center gap-2" */}
{/*             > */}
{/*               <Users size={18} /> */}
{/*               Manage Users */}
{/*             </Link> */}
{/*             <Link */}
{/*               to="/admindash/all-works" */}
{/*               className="px-4 py-2 bg-white text-[#1A5632] rounded-lg font-semibold hover:bg-[#1A5632] hover:text-white transition-all shadow-sm flex items-center gap-2" */}
{/*             > */}
{/*               <BookOpen size={18} /> */}
{/*               Manage Books */}
{/*             </Link> */}
{/*           </div> */}
{/*         </div> */}
{/*       </div> */}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users Card with Roles Breakdown */}
        <div className="group bg-white rounded-xl p-6 shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-[#1A5632] transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-[#C0FFB3] to-[#00A819]/20 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Users size={32} className="text-[#1A5632]" />
            </div>
            <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
              Live
            </div>
          </div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Total Users</h3>
          <p className="text-4xl font-bold text-[#1A5632] mb-3 group-hover:text-[#00A819] transition-colors">
            {stats?.totalUsers?.toLocaleString() || '0'}
          </p>
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 flex items-center gap-1">
                <Crown size={14} className="text-purple-600" />
                Admins
              </span>
              <span className="font-semibold text-purple-600">{stats?.users?.roles?.ADMIN || 0}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 flex items-center gap-1">
                <Pen size={14} className="text-blue-600" />
                Authors
              </span>
              <span className="font-semibold text-blue-600">{stats?.users?.roles?.AUTHOR || 0}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 flex items-center gap-1">
                <BookMarked size={14} className="text-green-600" />
                Readers
              </span>
              <span className="font-semibold text-green-600">{stats?.users?.roles?.READER || 0}</span>
            </div>
          </div>
        </div>

        {/* Active Subscriptions Card with Revenue */}
        <div className="group bg-white rounded-xl p-6 shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-[#FF1493] transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-[#FFD7DF] to-[#FF1493]/20 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Star size={32} className="text-[#FF1493]" />
            </div>
            <div className="bg-pink-100 text-pink-700 text-xs font-bold px-2 py-1 rounded-full">
              Active
            </div>
          </div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Subscriptions</h3>
          <p className="text-4xl font-bold text-[#FF1493] mb-3 group-hover:text-[#FF1493]/80 transition-colors">
            {((stats?.basicSubscribers || 0) + (stats?.premiumSubscribers || 0)).toLocaleString()}
          </p>
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 flex items-center gap-1">
                <Star size={14} className="text-blue-600" />
                Basic
              </span>
              <span className="font-semibold text-blue-600">{stats?.basicSubscribers || 0}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 flex items-center gap-1">
                <Gem size={14} className="text-purple-600" />
                Premium
              </span>
              <span className="font-semibold text-purple-600">{stats?.premiumSubscribers || 0}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Monthly Revenue</span>
                <span className="text-lg font-bold text-[#00A819]">${stats?.revenueThisMonth || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total Books Card with Chapters */}
        <div className="group bg-white rounded-xl p-6 shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-[#00A819] transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-[#FFFDEE] to-[#00A819]/20 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <BookOpen size={32} className="text-[#00A819]" />
            </div>
            <div className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
              Library
            </div>
          </div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Total Books</h3>
          <p className="text-4xl font-bold text-[#00A819] mb-3 group-hover:text-[#1A5632] transition-colors">
            {stats?.totalBooks?.toLocaleString() || '0'}
          </p>
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 flex items-center gap-1">
                <BookCheck size={14} className="text-green-600" />
                Published
              </span>
              <span className="font-semibold text-green-600">{stats?.publishedBooks || 0}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 flex items-center gap-1">
                <Edit3 size={14} className="text-orange-600" />
                Drafts
              </span>
              <span className="font-semibold text-orange-600">{stats?.draftBooks || 0}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 flex items-center gap-1">
                <FileEdit size={14} className="text-blue-600" />
                Chapters
              </span>
              <span className="font-semibold text-blue-600">{stats?.totalChapters?.toLocaleString() || 0}</span>
            </div>
          </div>
        </div>

        {/* Total Views Card with Engagement */}
        <div className="group bg-white rounded-xl p-6 shadow-md border-2 border-gray-100 hover:shadow-xl hover:border-gray-500 transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Eye size={32} className="text-gray-700" />
            </div>
            <div className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded-full">
              Trending
            </div>
          </div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Total Views</h3>
          <p className="text-4xl font-bold text-gray-700 mb-3 group-hover:text-gray-900 transition-colors">
            {stats?.books?.totalViews?.toLocaleString() || '0'}
          </p>
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 flex items-center gap-1">
                <Heart size={12} className="text-[#FF1493]" />
                Likes
              </span>
              <span className="font-semibold text-pink-600">{stats?.books?.totalLikes?.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600 flex items-center gap-1">
                <Download size={12} className="text-blue-600" />
                Downloads
              </span>
              <span className="font-semibold text-blue-600">{stats?.totalDownloads?.toLocaleString() || 0}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">Engagement</span>
                <span className="font-semibold text-green-600">
                  {stats?.books?.totalViews > 0
                    ? ((stats?.books?.totalLikes / stats?.books?.totalViews) * 100).toFixed(1)
                    : '0.0'}%
                </span>
              </div>
            </div>
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
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border-2 border-gray-100 hover:shadow-lg transition-all">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1A5632] mb-4 sm:mb-6 flex items-center gap-2">
            <BookOpen size={24} />
            Top Books
          </h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
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
                  <tr key={book._id} className="border-b hover:bg-[#C0FFB3]/20 transition-colors group">
                    <td className="py-3 px-4">
                      <Link to={`/book/${book._id}`} className="block group-hover:translate-x-1 transition-transform">
                        <div className="flex items-center gap-3">
                          {book.image && (
                            <img
                              src={book.image}
                              alt={book.title}
                              className="w-10 h-14 object-cover rounded shadow-sm"
                            />
                          )}
                          <div>
                            <div className="font-semibold text-[#1A5632] group-hover:text-[#00A819]">{book.title}</div>
                            <div className="text-xs text-gray-500">{book.genre}</div>
                          </div>
                        </div>
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

      {/* Empty State for Top Books */}
      {detailed?.topBooks && detailed.topBooks.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-md border-2 border-dashed border-gray-300 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen size={40} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No Books Yet</h3>
          <p className="text-gray-500 mb-4">Start creating content to see your top performers here</p>
        </div>
      )}

      {/* Top Authors Table */}
      {detailed?.topAuthors && detailed.topAuthors.length > 0 && (
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border-2 border-gray-100 hover:shadow-lg transition-all">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1A5632] mb-4 sm:mb-6 flex items-center gap-2">
            <Users size={24} />
            Top Authors
          </h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
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
                  <tr key={author.authorId} className="border-b hover:bg-[#C0FFB3]/20 transition-colors group">
                    <td className="py-3 px-4">
                      <Link to={`/author/${author.authorId}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity group-hover:translate-x-1 transition-transform">
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
                          <div className="font-semibold text-[#1A5632] group-hover:text-[#00A819]">{author.authorName}</div>
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

      {/* Empty State for Top Authors */}
      {detailed?.topAuthors && detailed.topAuthors.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-md border-2 border-dashed border-gray-300 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={40} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No Authors Yet</h3>
          <p className="text-gray-500">Authors will appear here once they start publishing content</p>
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;

