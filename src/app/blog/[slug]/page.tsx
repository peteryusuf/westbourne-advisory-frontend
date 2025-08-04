import { NavigationBar } from "@/components/navigation-bar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { strapiAPI, BlogPost } from "@/lib/api";
import { notFound } from 'next/navigation';

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await strapiAPI.getBlogPost(slug);
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

async function getRelatedPosts(currentSlug: string): Promise<BlogPost[]> {
  try {
    const response = await strapiAPI.getBlogPosts({ pageSize: 3 });
    return (response.data || []).filter((post: BlogPost) => post.slug !== currentSlug).slice(0, 2);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Westbourne Advisory',
      description: 'The blog post you\'re looking for doesn\'t exist.'
    };
  }

  return {
    title: post.seoTitle || `${post.title} | Westbourne Advisory`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author || 'Westbourne Advisory'],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, relatedPosts] = await Promise.all([
    getBlogPost(params.slug),
    getRelatedPosts(params.slug)
  ]);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate reading time based on content
  const getTextContent = (content: any): string => {
    if (typeof content === 'string') return content;
    if (Array.isArray(content)) {
      return content.map(getTextContent).join(' ');
    }
    if (content?.children) {
      return getTextContent(content.children);
    }
    if (content?.text) {
      return content.text;
    }
    return '';
  };

  const textContent = getTextContent(post.content);
  const readingTime = Math.ceil(textContent.split(' ').length / 200);

  // Convert Strapi rich text to HTML (basic implementation)
  const renderContent = (content: any): string => {
    if (typeof content === 'string') return content;
    if (Array.isArray(content)) {
      return content.map(renderContent).join('');
    }
    if (content?.type === 'paragraph') {
      const text = content.children?.map((child: any) => child.text || '').join('') || '';
      return `<p>${text}</p>`;
    }
    if (content?.type === 'heading') {
      const level = content.level || 2;
      const text = content.children?.map((child: any) => child.text || '').join('') || '';
      return `<h${level}>${text}</h${level}>`;
    }
    if (content?.text) {
      return content.text;
    }
    return '';
  };

  const htmlContent = Array.isArray(post.content) 
    ? post.content.map(renderContent).join('')
    : post.content;

  return (
    <main className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </nav>

        {/* Article Meta */}
        <div className="mb-8">
          {post.category && (
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {post.category}
              </Badge>
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Buda, serif' }}>
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          
          {/* Share and Author */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share Article
              </Button>
              
              {post.author && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">Written by</p>
                  <p className="font-semibold text-gray-900">
                    {post.author}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Buda, serif' }}>
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    {relatedPost.category && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 mb-3">
                        {relatedPost.category}
                      </Badge>
                    )}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {relatedPost.excerpt}
                    </p>
                    <Link 
                      href={`/blog/${relatedPost.slug}`} 
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Read More →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}