import React from 'react';
import { BookOpen, UserPlus, Edit3, Heart, Download, Search, Crown, User, BookMarked, Shield } from 'lucide-react';

const Guide = () => {
  return (
    <div className='max-w-6xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20 py-16'>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className='geist text-4xl md:text-5xl font-bold text-[#1A5632] mb-4'>
          Guide to Using Readian
        </h1>
        <p className="text-lg text-gray-600">
          Everything you need to know to get started with our platform
        </p>
      </div>

      {/* Guide Sections */}
      <div className="space-y-8">

        {/* Getting Started */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-[#C0FFB3] to-[#00A819]/20 p-3 rounded-lg">
              <BookOpen size={28} className="text-[#1A5632]" />
            </div>
            <h2 className='text-2xl font-bold text-[#1A5632]'>Getting Started</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            For newcomers, you can immediately start reading a story that interests you by selecting one from the <span className="font-semibold text-[#00A819]">trending section</span> on the homepage, or click on <span className="font-semibold text-[#00A819]">"Browse"</span> in the navigation bar to explore our full catalog and find stories by genre, tags, or author.
          </p>
          <div className="mt-4 p-4 bg-[#C0FFB3]/20 rounded-lg border-l-4 border-[#00A819]">
            <p className="text-sm text-gray-700">
              <strong>💡 Tip:</strong> Use the search bar to quickly find specific books or authors you're interested in!
            </p>
          </div>
        </div>

        {/* Creating an Account */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-[#FFD7DF] to-[#FF1493]/20 p-3 rounded-lg">
              <UserPlus size={28} className="text-[#FF1493]" />
            </div>
            <h2 className='text-2xl font-bold text-[#1A5632]'>Creating an Account</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            You can sign up for an account by clicking the <span className="font-semibold text-[#00A819]">"Sign Up"</span> button in the navigation bar. Simply fill in your details on the registration form. Having an account unlocks many features:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <Heart size={18} className="text-red-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Like and save your favorite books</span>
            </li>
            <li className="flex items-start gap-2">
              <Edit3 size={18} className="text-blue-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Write and publish your own stories</span>
            </li>
            <li className="flex items-start gap-2">
              <User size={18} className="text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Follow your favorite authors</span>
            </li>
            <li className="flex items-start gap-2">
              <Download size={18} className="text-purple-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Download books for offline reading (with subscription)</span>
            </li>
          </ul>
        </div>

        {/* Browsing & Searching */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-[#FFFDEE] to-[#00A819]/20 p-3 rounded-lg">
              <Search size={28} className="text-[#00A819]" />
            </div>
            <h2 className='text-2xl font-bold text-[#1A5632]'>Browsing & Searching for Books</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our browse page offers powerful filtering options to help you discover the perfect book:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Filter by:</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Genre (Romance, Fantasy, Sci-Fi, etc.)</li>
                <li>• Tags (Adventure, Mystery, Comedy, etc.)</li>
                <li>• Book Status (Completed or Ongoing)</li>
                <li>• Content Type (Kids or Adult)</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Search by:</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Book Title</li>
                <li>• Author Name</li>
                <li>• Keyword or Description</li>
                <li>• Minimum Likes (Popular books)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Becoming an Author */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-lg">
              <Edit3 size={28} className="text-blue-600" />
            </div>
            <h2 className='text-2xl font-bold text-[#1A5632]'>Becoming an Author</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ready to share your stories? Here's how to become an author:
          </p>
          <ol className="space-y-3 ml-4">
            <li className="text-gray-700">
              <span className="font-semibold text-[#00A819]">1.</span> Create an account and verify your email
            </li>
            <li className="text-gray-700">
              <span className="font-semibold text-[#00A819]">2.</span> Go to Settings → <strong>Become an Author</strong>
            </li>
            <li className="text-gray-700">
              <span className="font-semibold text-[#00A819]">3.</span> Access your Author Dashboard to create your first book
            </li>
            <li className="text-gray-700">
              <span className="font-semibold text-[#00A819]">4.</span> Write chapters, add cover images, and publish!
            </li>
          </ol>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-gray-700">
              <strong>📝 Note:</strong> Authors under 18 can only create kids content. Adult content requires age verification.
            </p>
          </div>
        </div>

        {/* Subscriptions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-lg">
              <Crown size={28} className="text-purple-600" />
            </div>
            <h2 className='text-2xl font-bold text-[#1A5632]'>Subscription Plans</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            While Readian is free to use, subscriptions unlock premium features:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Free Plan */}
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Free</h3>
              <p className="text-2xl font-bold text-gray-700 mb-3">$0</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✓ Browse all books</li>
                <li>✓ Read free content</li>
                <li>✓ Like & follow authors</li>
                <li>✓ Write your own stories</li>
              </ul>
            </div>
            {/* Basic Plan */}
            <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
              <h3 className="font-bold text-blue-800 mb-2">Basic</h3>
              <p className="text-2xl font-bold text-blue-700 mb-3">$4.99/mo</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✓ All Free features</li>
                <li>✓ Read premium books (completed)</li>
                <li>✓ Ad-free experience</li>
                <li>✓ Support authors</li>
              </ul>
            </div>
            {/* Premium Plan */}
            <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-400">
              <h3 className="font-bold text-purple-800 mb-2">Premium</h3>
              <p className="text-2xl font-bold text-purple-700 mb-3">$9.99/mo</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✓ All Basic features</li>
                <li>✓ Read ongoing stories</li>
                <li>✓ Download books (10/day)</li>
                <li>✓ Early access to new releases</li>
                <li>✓ Priority support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content Guidelines */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-red-100 to-red-200 p-3 rounded-lg">
              <Shield size={28} className="text-red-600" />
            </div>
            <h2 className='text-2xl font-bold text-[#1A5632]'>Content Guidelines</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            To maintain a safe and welcoming community, please follow these guidelines:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span className="text-gray-700">No hate speech, harassment, or discrimination</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span className="text-gray-700">No plagiarism or copyright infringement</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span className="text-gray-700">Adult content must be marked appropriately</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-700">Respect other users and their work</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-gray-700">Provide constructive feedback</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Guide;
