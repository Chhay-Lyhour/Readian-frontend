import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Info, Shield, FileText } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [openSection, setOpenSection] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "Can I start writing immediately?",
      answer: "No, you must have an account in order to access the writing feature. After creating an account, go to Settings and click 'Become an Author' to unlock writing capabilities. Please remember to keep your content within our community guidelines."
    },
    {
      id: 2,
      question: "Is Readian free?",
      answer: "Yes, Readian is free to use! When newcomers arrive, they can immediately pick a story to read. However, some actions like liking works, following authors, or writing require you to register for an account. You can also subscribe to a monthly subscription for additional benefits like downloading books and accessing premium content."
    },
    {
      id: 3,
      question: "What's the difference between free, basic, and premium subscriptions?",
      answer: "Free users can browse and read free books. Basic subscribers ($4.99/mo) can read completed premium books with an ad-free experience. Premium subscribers ($9.99/mo) get all Basic features PLUS access to ongoing stories (books still being written), 10 downloads per day, early access to new releases, and priority support."
    },
    {
      id: 4,
      question: "Can I download books for offline reading?",
      answer: "Yes, but only with a Premium subscription. Premium subscribers can download up to 10 books per day in PDF format for offline reading. You can view your download history in Settings → Download History."
    },
    {
      id: 5,
      question: "How do I become an author?",
      answer: "First, create an account and verify your email. Then go to Settings → Become an Author. Once approved, you'll have access to the Author Dashboard where you can create books, write chapters, and track your analytics."
    },
    {
      id: 6,
      question: "Are there age restrictions for content?",
      answer: "Yes. Adult content requires you to be 18 or older to read. Authors under 18 can only create kids content. All adult content must be properly marked as 'Adult' when creating or editing a book."
    },
    {
      id: 7,
      question: "Can I edit or delete my published books?",
      answer: "Yes, as an author you can edit your books anytime from your Author Dashboard. You can update the title, description, cover image, tags, and chapters. You can also unpublish or delete books if needed."
    },
    {
      id: 8,
      question: "How do I follow my favorite authors?",
      answer: "Visit an author's profile page and click the 'Follow' button. You'll be notified when they publish new books or chapters. You can view all your followed authors in your profile."
    },
    {
      id: 9,
      question: "What file formats are supported for book covers?",
      answer: "We support JPEG, PNG, HEIC, and WebP image formats. The maximum file size is 5MB. For best results, use images with a 2:3 aspect ratio (e.g., 400x600 pixels)."
    },
    {
      id: 10,
      question: "How do I cancel my subscription?",
      answer: "Go to Settings → Manage Subscription. From there, you can cancel your subscription anytime. You'll retain access to premium features until the end of your current billing period."
    },
    {
      id: 11,
      question: "Can I get a refund?",
      answer: "Refunds are handled on a case-by-case basis. Please contact our support team at ReadianSupport@gmail.com with your subscription details and reason for the refund request."
    },
    {
      id: 12,
      question: "How do ratings work?",
      answer: "Registered users can rate books on a 5-star scale after reading them. The average rating is displayed on each book's detail page. Ratings help other readers discover quality content."
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className='max-w-6xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20 py-16 border-t-4 border-[#1A5632]'>

      {/* FAQs Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C0FFB3] to-[#00A819]/20 px-6 py-3 rounded-full mb-4">
            <HelpCircle size={24} className="text-[#1A5632]" />
            <h1 className='text-3xl md:text-4xl font-bold text-[#1A5632]'>
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Find answers to common questions about Readian
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-xl shadow-md border-2 border-gray-100 overflow-hidden hover:shadow-lg transition-all"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg text-gray-800 pr-4">
                  {faq.id}. {faq.question}
                </span>
                {openFAQ === faq.id ? (
                  <ChevronUp size={24} className="text-[#00A819] flex-shrink-0" />
                ) : (
                  <ChevronDown size={24} className="text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openFAQ === faq.id && (
                <div className="px-6 pb-6 text-gray-700 leading-relaxed animate-slide-up">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-[#C0FFB3]/20 rounded-xl border-l-4 border-[#00A819]">
          <p className="text-gray-700">
            <strong>Still have questions?</strong> Contact us at{' '}
            <a href="mailto:ReadianSupport@gmail.com" className="text-[#00A819] font-semibold hover:underline">
              ReadianSupport@gmail.com
            </a>
            {' '}or call us at{' '}
            <a href="tel:069283535" className="text-[#00A819] font-semibold hover:underline">
              069 283 535
            </a>
          </p>
        </div>
      </div>

      {/* About Us Section */}
      <div className="mb-16">
        <div
          onClick={() => toggleSection('about')}
          className="bg-gradient-to-r from-[#1A5632] to-[#00A819] rounded-xl p-8 shadow-lg cursor-pointer hover:shadow-xl transition-all mb-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Info size={32} className="text-white" />
              <h2 className='text-3xl font-bold text-white'>About Readian</h2>
            </div>
            {openSection === 'about' ? (
              <ChevronUp size={28} className="text-white" />
            ) : (
              <ChevronDown size={28} className="text-white" />
            )}
          </div>
        </div>
        {openSection === 'about' && (
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-100 animate-slide-up">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Readian</strong> is a modern online reading platform designed to connect readers with captivating stories and empower authors to share their creativity with the world.
              </p>
              <p>
                Founded in 2025, our mission is to make quality literature accessible to everyone while providing authors with the tools and audience they need to succeed.
              </p>

              <h3 className="text-xl font-bold text-[#1A5632] mt-6 mb-3">Our Vision</h3>
              <p>
                We envision a world where anyone can discover their next favorite story and where every aspiring author has the opportunity to share their voice. Readian bridges the gap between readers and writers, creating a vibrant community of storytellers and story lovers.
              </p>

              <h3 className="text-xl font-bold text-[#1A5632] mt-6 mb-3">What We Offer</h3>
              <ul className="space-y-2 ml-4">
                <li>• <strong>Free Access:</strong> Browse and read thousands of free books</li>
                <li>• <strong>Author Tools:</strong> Easy-to-use writing and publishing platform</li>
                <li>• <strong>Community Features:</strong> Like, follow, and engage with your favorite authors</li>
                <li>• <strong>Premium Content:</strong> Subscribe for exclusive books and features</li>
                <li>• <strong>Safe Environment:</strong> Age-appropriate content filters and moderation</li>
              </ul>

              <h3 className="text-xl font-bold text-[#1A5632] mt-6 mb-3">Our Team</h3>
              <p>
                Readian is built by a passionate team of developers, designers, and book lovers based in Kirirom Mountain, Kampong Speu, Cambodia. We're dedicated to creating the best reading and writing experience possible.
              </p>

              <div className="mt-6 p-4 bg-[#C0FFB3]/20 rounded-lg border-l-4 border-[#00A819]">
                <p className="font-semibold text-gray-800">
                  Join thousands of readers and hundreds of authors on Readian today!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Privacy Policy Section */}
      <div className="mb-16">
        <div
          onClick={() => toggleSection('privacy')}
          className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-8 shadow-lg cursor-pointer hover:shadow-xl transition-all mb-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={32} className="text-white" />
              <h2 className='text-3xl font-bold text-white'>Privacy Policy</h2>
            </div>
            {openSection === 'privacy' ? (
              <ChevronUp size={28} className="text-white" />
            ) : (
              <ChevronDown size={28} className="text-white" />
            )}
          </div>
        </div>
        {openSection === 'privacy' && (
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-100 animate-slide-up">
            <p className="text-sm text-gray-500 mb-6">Last Updated: December 16, 2025</p>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">1. Information We Collect</h3>
                <p className="mb-2">We collect the following information:</p>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>Account Information:</strong> Name, email, password (encrypted), date of birth</li>
                  <li>• <strong>Profile Information:</strong> Avatar, bio, author details (optional)</li>
                  <li>• <strong>Content:</strong> Books, chapters, comments, and ratings you create</li>
                  <li>• <strong>Usage Data:</strong> Pages viewed, time spent, books read</li>
                  <li>• <strong>Payment Information:</strong> Processed securely through third-party payment processors</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">2. How We Use Your Information</h3>
                <ul className="space-y-1 ml-4">
                  <li>• To provide and improve our services</li>
                  <li>• To personalize your reading experience</li>
                  <li>• To process subscriptions and payments</li>
                  <li>• To communicate updates and important information</li>
                  <li>• To enforce our terms and community guidelines</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">3. Data Sharing</h3>
                <p>
                  We do <strong>NOT</strong> sell your personal information to third parties. We may share data with:
                </p>
                <ul className="space-y-1 ml-4 mt-2">
                  <li>• Service providers (hosting, payment processing)</li>
                  <li>• Legal authorities when required by law</li>
                  <li>• Other users (only public profile information you choose to share)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">4. Your Rights</h3>
                <p>You have the right to:</p>
                <ul className="space-y-1 ml-4 mt-2">
                  <li>• Access your personal data</li>
                  <li>• Correct inaccurate information</li>
                  <li>• Delete your account and data</li>
                  <li>• Export your content</li>
                  <li>• Opt-out of marketing communications</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">5. Security</h3>
                <p>
                  We use industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">6. Cookies</h3>
                <p>
                  We use cookies to improve your experience, remember your preferences, and analyze site usage. You can disable cookies in your browser settings, but this may limit functionality.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-3">7. Children's Privacy</h3>
                <p>
                  Users under 13 must have parental consent. We do not knowingly collect personal information from children under 13 without parental consent. Users under 18 have restricted access to adult content.
                </p>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p>
                  <strong>Questions about privacy?</strong> Contact us at{' '}
                  <a href="mailto:ReadianSupport@gmail.com" className="text-blue-600 font-semibold hover:underline">
                    ReadianSupport@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Terms of Service Section */}
      <div className="mb-8">
        <div
          onClick={() => toggleSection('terms')}
          className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl p-8 shadow-lg cursor-pointer hover:shadow-xl transition-all mb-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText size={32} className="text-white" />
              <h2 className='text-3xl font-bold text-white'>Terms of Service</h2>
            </div>
            {openSection === 'terms' ? (
              <ChevronUp size={28} className="text-white" />
            ) : (
              <ChevronDown size={28} className="text-white" />
            )}
          </div>
        </div>
        {openSection === 'terms' && (
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-100 animate-slide-up">
            <p className="text-sm text-gray-500 mb-6">Last Updated: December 16, 2025</p>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">1. Acceptance of Terms</h3>
                <p>
                  By accessing or using Readian, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our platform.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">2. User Accounts</h3>
                <ul className="space-y-1 ml-4">
                  <li>• You must be at least 13 years old to create an account</li>
                  <li>• You are responsible for maintaining account security</li>
                  <li>• One person may only have one account</li>
                  <li>• You must provide accurate information</li>
                  <li>• We reserve the right to suspend or terminate accounts that violate our terms</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">3. Content Guidelines</h3>
                <p className="mb-2">You agree NOT to post content that:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Contains hate speech, harassment, or discrimination</li>
                  <li>• Infringes on copyrights or intellectual property rights</li>
                  <li>• Contains explicit sexual content (unless properly marked as adult)</li>
                  <li>• Promotes illegal activities or violence</li>
                  <li>• Contains malware, viruses, or harmful code</li>
                  <li>• Impersonates others or misrepresents your identity</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">4. Intellectual Property</h3>
                <p>
                  You retain ownership of content you create on Readian. By publishing content, you grant Readian a non-exclusive, worldwide license to display and distribute your content on our platform. You represent that you have the right to publish all content you upload.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">5. Subscriptions and Payments</h3>
                <ul className="space-y-1 ml-4">
                  <li>• Subscriptions are billed monthly or annually</li>
                  <li>• Prices are subject to change with 30 days notice</li>
                  <li>• Refunds are handled on a case-by-case basis</li>
                  <li>• You can cancel anytime; access continues until period end</li>
                  <li>• Failed payments may result in subscription cancellation</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">6. Prohibited Activities</h3>
                <p className="mb-2">You may not:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Use automated tools to scrape or download content</li>
                  <li>• Attempt to hack or compromise our security</li>
                  <li>• Spam, advertise, or solicit users</li>
                  <li>• Create multiple accounts to manipulate ratings or views</li>
                  <li>• Resell or redistribute content without permission</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">7. Disclaimer</h3>
                <p>
                  Readian is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted, error-free, or completely secure. We are not responsible for user-generated content.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">8. Limitation of Liability</h3>
                <p>
                  Readian shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount you paid for subscription services in the past 12 months.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">9. Termination</h3>
                <p>
                  We reserve the right to terminate or suspend your account at any time for violations of these terms. Upon termination, your right to use Readian will immediately cease.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">10. Changes to Terms</h3>
                <p>
                  We may update these terms at any time. We will notify users of significant changes via email or platform notification. Continued use after changes constitutes acceptance of new terms.
                </p>
              </div>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <p>
                  <strong>Legal questions?</strong> Contact us at{' '}
                  <a href="mailto:ReadianSupport@gmail.com" className="text-purple-600 font-semibold hover:underline">
                    ReadianSupport@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default FAQ;
