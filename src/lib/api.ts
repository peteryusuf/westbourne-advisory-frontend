const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN || '';

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: unknown; // Strapi rich text format
  author: string;
  category: string;
  tags: string;
  seoTitle: string;
  seoDescription: string;
  status: 'draft' | 'published';
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  featuredImage?: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
}

export interface Testimonial {
  id: number;
  attributes: {
    name: string;
    role: string;
    location: string;
    quote: string;
    rating: number;
    featured: boolean;
    avatar: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
  };
}

export interface FAQ {
  id: number;
  attributes: {
    question: string;
    answer: string;
    category: string;
    order: number;
  };
}

class StrapiAPI {
  private baseURL: string;
  private token: string;

  constructor() {
    this.baseURL = STRAPI_URL;
    this.token = STRAPI_TOKEN;
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}/api${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  // Blog Posts
  async getBlogPosts(params?: {
    page?: number;
    pageSize?: number;
    category?: string;
    search?: string;
  }) {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString());
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString());
    if (params?.category) searchParams.append('filters[category][$eq]', params.category);
    if (params?.search) searchParams.append('filters[$or][0][title][$containsi]', params.search);
    if (params?.search) searchParams.append('filters[$or][1][content][$containsi]', params.search);
    
    searchParams.append('filters[status][$eq]', 'published');
    searchParams.append('sort[publishedAt]', 'desc');
    searchParams.append('populate[featuredImage]', 'true');

    return this.fetch(`/blog-posts?${searchParams.toString()}`);
  }

  async getBlogPost(slug: string) {
    const searchParams = new URLSearchParams();
    searchParams.append('filters[slug][$eq]', slug);
    searchParams.append('filters[status][$eq]', 'published');
    searchParams.append('populate[featuredImage]', 'true');

    const response = await this.fetch(`/blog-posts?${searchParams.toString()}`);
    return response.data?.[0] || null;
  }

  async getBlogCategories() {
    const response = await this.fetch('/blog-posts?filters[status][$eq]=published');
    const categories = new Set(response.data?.map((post: BlogPost) => post.category) || []);
    return Array.from(categories).filter(Boolean);
  }

  // Testimonials
  async getTestimonials(featured?: boolean) {
    const searchParams = new URLSearchParams();
    searchParams.append('sort[createdAt]', 'desc');
    searchParams.append('populate[avatar]', 'true');
    
    if (featured) {
      searchParams.append('filters[featured][$eq]', 'true');
    }

    return this.fetch(`/testimonials?${searchParams.toString()}`);
  }

  // FAQs
  async getFAQs(category?: string) {
    const searchParams = new URLSearchParams();
    searchParams.append('sort[order]', 'asc');
    
    if (category) {
      searchParams.append('filters[category][$eq]', category);
    }

    return this.fetch(`/faqs?${searchParams.toString()}`);
  }
}

export const strapiAPI = new StrapiAPI(); 