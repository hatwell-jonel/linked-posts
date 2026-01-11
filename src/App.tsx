import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Filter } from "lucide-react";

/* ----------------------------- Types ----------------------------- */

interface Post {
  id: number;
  title: string;
  url: string;
  description: string;
  category: string;
  date: string; // ISO string
}

type SortOrder = "latest" | "oldest";

/* ----------------------------- Data ------------------------------ */

const POSTS_PER_PAGE = 6;

const posts: Post[] = [
  {
    id: 1,
    title: "Building Scalable Web Applications",
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7416126955407843328?collapsed=1",
    description:
      "Exploring best practices for creating scalable and maintainable web applications using modern frameworks.",
    category: "Web Development",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "The Future of AI in Development",
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7416126955407843329",
    description:
      "How artificial intelligence is transforming the way we write code and build software.",
    category: "AI & ML",
    date: "2024-01-10",
  },
  {
    id: 3,
    title: "React Performance Optimization",
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7416126955407843330",
    description:
      "Tips and tricks for optimizing React applications for better performance and user experience.",
    category: "Web Development",
    date: "2024-01-05",
  },
  {
    id: 4,
    title: "Understanding TypeScript Generics",
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7416126955407843331",
    description:
      "Deep dive into TypeScript generics and how they improve code reusability and type safety.",
    category: "TypeScript",
    date: "2023-12-28",
  },
  {
    id: 5,
    title: "Cloud Architecture Patterns",
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7416126955407843332",
    description:
      "Common patterns and best practices for designing cloud-native applications.",
    category: "Cloud Computing",
    date: "2023-12-20",
  },
  {
    id: 6,
    title: "Mobile-First Design Principles",
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7416126955407843333",
    description:
      "Why mobile-first design is crucial in today's multi-device world.",
    category: "UI/UX",
    date: "2023-12-15",
  },
];

/* ---------------------------- Component --------------------------- */

export default function LinkedInShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const [visibleCount, setVisibleCount] = useState<number>(POSTS_PER_PAGE);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);

  /* ------------------------- Derived Data ------------------------- */

  const categories = useMemo<string[]>(() => {
    return ["All", ...new Set(posts.map((p) => p.category))];
  }, []);

  const filteredPosts = useMemo<Post[]>(() => {
    return posts
      .filter(
        (post) =>
          selectedCategory === "All" || post.category === selectedCategory
      )
      .sort((a, b) => {
        const aTime = new Date(a.date).getTime();
        const bTime = new Date(b.date).getTime();
        return sortOrder === "latest" ? bTime - aTime : aTime - bTime;
      });
  }, [selectedCategory, sortOrder]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  /* ---------------------- Infinite Scrolling ---------------------- */

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + POSTS_PER_PAGE, filteredPosts.length)
          );
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [filteredPosts.length]);

  useEffect(() => {
    setVisibleCount(POSTS_PER_PAGE);
  }, [selectedCategory, sortOrder]);

  /* ------------------------------ UI ------------------------------ */

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">LinkedIn Posts</h1>
          <p className="text-gray-600 mt-2">
            Explore my professional insights and thoughts
          </p>
        </header>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-5 mb-8 flex flex-wrap gap-4">
          <div className="relative w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 w-full h-10 border rounded-md"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="h-10 w-48 border rounded-md px-3"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {visiblePosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition"
            >
              <div className="flex justify-between mb-2">
                <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">{post.date}</span>
              </div>

              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-600 mt-2 line-clamp-3">
                {post.description}
              </p>
            </article>
          ))}
        </div>

        {visibleCount < filteredPosts.length && (
          <div ref={observerRef} className="h-16 flex justify-center items-center">
            <div className="animate-spin h-6 w-6 border-b-2 border-blue-600 rounded-full" />
          </div>
        )}

        {/* Dialog */}
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-2xl">
            {selectedPost && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedPost.title}</DialogTitle>
                </DialogHeader>

                <p className="text-gray-600 mt-4">
                  {selectedPost.description}
                </p>

                <iframe
                  src={selectedPost.url}
                  title={selectedPost.title}
                  className="w-full h-[550px] rounded-lg mt-6"
                  allowFullScreen
                />
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
