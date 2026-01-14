import { useState, useRef, useEffect, useMemo } from 'react';
import { posts } from './data';
import { formatDate } from './lib/utils';
import { ModeToggle } from '@/components/mode-toggle';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  const handleSortChange = (value: 'latest' | 'oldest') => {
    setSortOrder(value);
    setDisplayedPosts(POSTS_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-accent">
      <div className="max-w-4xl mx-auto px-4 py-8 ">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 uppercase">
            My LinkedIn Posts
          </h1>
          <p>
            Explore my professional insights and thoughts
          </p>
        </div>

        {/* Filters */}
        <div className="rounded-lg shadow-md p-6 mb-8 bg-white dark:bg-background">
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto md:items-center md:justify-between">
              <Select
                value={sortOrder}
                onValueChange={handleSortChange}
              >
                <SelectTrigger 
                  className="w-full md:w-45 h-10! dark:bg-background"
                >
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="latest">Latest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            <ModeToggle />
          </div>

        </div>

        {visiblePosts.length === 0 ? (
          <div className="text-center py-12">
            No posts found.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6">
              {visiblePosts.map(post => (
                <div
                  key={post.id}
                  className="rounded-lg transition bg-white dark:bg-background"
                >
                  <div className="p-6">
                    <span className="text-sm text-gray-400">
                      {formatDate(post.date)}
                    </span>

                    <h3 className="text-xl font-bold mt-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 mt-2">
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
