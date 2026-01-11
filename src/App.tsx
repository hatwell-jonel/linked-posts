import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

// Your data structure
const posts = [
  {
    id: 1,
    title: "Building Scalable Web Applications",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7416126955407843328/",
    devToUrl: "https://dev.to/username/building-scalable-web-apps",
    mediumUrl: "https://medium.com/@username/building-scalable-web-apps",
    description: "Exploring best practices for creating scalable and maintainable web applications using modern frameworks.",
    category: "Web Development",
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "The Future of AI in Development",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7416126955407843329/",
    devToUrl: null,
    mediumUrl: "https://medium.com/@username/future-of-ai",
    description: "How artificial intelligence is transforming the way we write code and build software.",
    category: "AI & ML",
    date: "2024-01-10"
  },
  {
    id: 3,
    title: "React Performance Optimization",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7416126955407843330/",
    devToUrl: "https://dev.to/username/react-performance",
    mediumUrl: null,
    description: "Tips and tricks for optimizing React applications for better performance and user experience.",
    category: "Web Development",
    date: "2024-01-05"
  },
  {
    id: 4,
    title: "Understanding TypeScript Generics",
    linkedinUrl: null,
    devToUrl: "https://dev.to/username/typescript-generics",
    mediumUrl: "https://medium.com/@username/typescript-generics",
    description: "Deep dive into TypeScript generics and how they improve code reusability and type safety.",
    category: "TypeScript",
    date: "2023-12-28"
  },
  {
    id: 5,
    title: "Cloud Architecture Patterns",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7416126955407843332/",
    devToUrl: "https://dev.to/username/cloud-architecture",
    mediumUrl: "https://medium.com/@username/cloud-architecture",
    description: "Common patterns and best practices for designing cloud-native applications.",
    category: "Cloud Computing",
    date: "2023-12-20"
  },
  {
    id: 6,
    title: "Mobile-First Design Principles",
    linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7416126955407843333/",
    devToUrl: null,
    mediumUrl: null,
    description: "Why mobile-first design is crucial in today's multi-device world.",
    category: "UI/UX",
    date: "2023-12-15"
  }
];

const POSTS_PER_PAGE = 6;

export default function LinkedInShowcase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('latest');
  const [displayedPosts, setDisplayedPosts] = useState(POSTS_PER_PAGE);
  const observerTarget = useRef(null);

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];

  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
    });

  const visiblePosts = filteredPosts.slice(0, displayedPosts);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && displayedPosts < filteredPosts.length) {
          setDisplayedPosts(prev => Math.min(prev + POSTS_PER_PAGE, filteredPosts.length));
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [displayedPosts, filteredPosts.length]);

  useEffect(() => {
    setDisplayedPosts(POSTS_PER_PAGE);
  }, [searchQuery, selectedCategory, sortOrder]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">LinkedIn Posts</h1>
          <p className="text-gray-600">Explore my professional insights and thoughts</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative sm:w-48">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Date Sort */}
            <div className="relative sm:w-48">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="pl-10 w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {visiblePosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePosts.map(post => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.linkedinUrl && (
                        <a
                          href={post.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                          LinkedIn
                        </a>
                      )}
                      {post.devToUrl && (
                        <a
                          href={post.devToUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold px-3 py-2 rounded transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"/>
                          </svg>
                          Dev.to
                        </a>
                      )}
                      {post.mediumUrl && (
                        <a
                          href={post.mediumUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-black hover:bg-gray-800 text-white text-xs font-semibold px-3 py-2 rounded transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                          </svg>
                          Medium
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Infinite Scroll Trigger */}
            {displayedPosts < filteredPosts.length && (
              <div ref={observerTarget} className="h-20 flex items-center justify-center mt-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}

            {displayedPosts >= filteredPosts.length && filteredPosts.length > POSTS_PER_PAGE && (
              <div className="text-center mt-8 text-gray-500">
                You've reached the end!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}