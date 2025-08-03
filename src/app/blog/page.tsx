"use client";

import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { BlogCard } from '@/components/blog-card';
import { strapiAPI, BlogPost } from '@/lib/api';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, categoriesResponse] = await Promise.all([
          strapiAPI.getBlogPosts({
            page: currentPage,
            pageSize: 9,
            category: selectedCategory || undefined,
            search: searchTerm || undefined,
          }),
          strapiAPI.getBlogCategories(),
        ]);

        setPosts(postsResponse.data || []);
        setCategories(categoriesResponse as string[]);
        setTotalPages(postsResponse.meta?.pagination?.pageCount || 1);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        // Fallback to default posts if API fails
        setPosts([
          {
            id: 1,
            attributes: {
              title: "Understanding Parental Orders in UK Surrogacy",
              slug: "understanding-parental-orders",
              excerpt: "A comprehensive guide to parental orders and their importance in the surrogacy process.",
              content: "Full content here...",
              author: "Westbourne Advisory",
              category: "Legal Process",
              tags: "parental orders, surrogacy, legal",
              seoTitle: "Parental Orders UK Surrogacy",
              seoDescription: "Learn about parental orders in UK surrogacy",
              status: "published",
              publishedAt: "2024-01-15",
              featuredImage: {
                data: {
                  attributes: {
                    url: "",
                    alternativeText: "Parental Orders"
                  }
                }
              }
            }
          },
          {
            id: 2,
            attributes: {
              title: "The Legal Timeline of Surrogacy in the UK",
              slug: "legal-timeline-surrogacy",
              excerpt: "What to expect at each stage of your surrogacy legal journey.",
              content: "Full content here...",
              author: "Westbourne Advisory",
              category: "Timing",
              tags: "timeline, legal process, surrogacy",
              seoTitle: "Surrogacy Legal Timeline UK",
              seoDescription: "UK surrogacy legal timeline guide",
              status: "published",
              publishedAt: "2024-01-10",
              featuredImage: {
                data: {
                  attributes: {
                    url: "",
                    alternativeText: "Legal Timeline"
                  }
                }
              }
            }
          }
        ]);
        setCategories(["Legal Process", "Timing", "Requirements"]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, selectedCategory, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl font-bold text-gray-900">Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert insights and guidance on surrogacy law in the UK.
            </p>
          </div>
          
          {/* Search and Filter Skeleton */}
          <div className="max-w-4xl mx-auto mb-12 space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-32 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-24 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Posts Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl font-bold text-gray-900">Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights and guidance on surrogacy law in the UK.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </button>
          </form>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === '' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No blog posts found.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 