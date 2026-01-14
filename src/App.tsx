import { useState, useRef, useEffect, useMemo } from 'react';
import { posts } from './data';
import { formatDate } from './lib/utils';

const POSTS_PER_PAGE = 3;

export default function LinkedInShowcase() {
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
  const [displayedPosts, setDisplayedPosts] = useState(POSTS_PER_PAGE);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  /**
   * 1️⃣ Sort posts
   */
  const filteredPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return sortOrder === 'latest'
        ? dateB - dateA
        : dateA - dateB;
    });
  }, [sortOrder]);

  /**
   * 2️⃣ Slice visible posts
   */
  const visiblePosts = useMemo(() => {
    return filteredPosts.slice(0, displayedPosts);
  }, [filteredPosts, displayedPosts]);

  /**
   * 3️⃣ Infinite scroll observer
   */
  useEffect(() => {
    if (!observerTarget.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDisplayedPosts(prev =>
            Math.min(prev + POSTS_PER_PAGE, filteredPosts.length)
          );
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerTarget.current);

    return () => observer.disconnect();
  }, [filteredPosts.length]);

  /**
   * 4️⃣ Reset pagination when sort order changes
   */
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'latest' | 'oldest');
    setDisplayedPosts(POSTS_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 uppercase">
            My LinkedIn Posts
          </h1>
          <p className="text-gray-600">
            Explore my professional insights and thoughts
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative sm:w-48">
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {visiblePosts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No posts found.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6">
              {visiblePosts.map(post => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition"
                >
                  <div className="p-6">
                    <span className="text-xs text-gray-500">
                      {formatDate(post.date)}
                    </span>

                    <h3 className="text-xl font-bold mt-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mt-2">
                      {post.description}
                    </p>

                    {post.linkedinUrl && (
                      <a
                        href={post.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        View on LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Infinite scroll trigger */}
            {displayedPosts < filteredPosts.length && (
              <div
                ref={observerTarget}
                className="h-20 flex items-center justify-center mt-8"
              >
                <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 rounded-full" />
              </div>
            )}

            {displayedPosts >= filteredPosts.length &&
              filteredPosts.length > POSTS_PER_PAGE && (
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
