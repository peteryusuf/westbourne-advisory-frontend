import { NavigationBar } from "@/components/navigation-bar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User, ArrowLeft, Share2, BookOpen } from "lucide-react";
import Link from "next/link";

// This would be replaced with actual Strapi API calls
async function getBlogPost(slug: string) {
  // Placeholder data - replace with actual Strapi API call
  const posts = {
    "understanding-parental-orders": {
      id: "1",
      attributes: {
        title: "Understanding Parental Orders: A Complete Guide",
        excerpt: "Learn everything you need to know about applying for a Parental Order in the UK, including requirements, timelines, and what to expect.",
        content: `
          <h2>What is a Parental Order?</h2>
          <p>A Parental Order is a legal order made by the court that transfers legal parenthood from the surrogate (and her partner, if she has one) to the intended parents. This is the legal mechanism that allows intended parents to become the legal parents of a child born through surrogacy.</p>
          
          <h2>Who Can Apply for a Parental Order?</h2>
          <p>To apply for a Parental Order, you must meet the following criteria:</p>
          <ul>
            <li>You must be over 18 years old</li>
            <li>You must be married, in a civil partnership, or living as partners in an enduring family relationship</li>
            <li>At least one of you must be genetically related to the child</li>
            <li>You must apply within 6 months of the child's birth</li>
            <li>The surrogate must consent to the order</li>
          </ul>
          
          <h2>The Application Process</h2>
          <p>The process of applying for a Parental Order involves several steps:</p>
          <ol>
            <li><strong>Initial Consultation:</strong> Meet with a legal advisor to discuss your situation</li>
            <li><strong>Documentation:</strong> Gather all necessary documents and evidence</li>
            <li><strong>Court Application:</strong> Submit your application to the Family Court</li>
            <li><strong>Court Hearing:</strong> Attend a hearing where the judge will consider your application</li>
            <li><strong>Final Order:</strong> Receive the Parental Order if approved</li>
          </ol>
          
          <h2>Required Documents</h2>
          <p>You will need to provide various documents including:</p>
          <ul>
            <li>Birth certificate of the child</li>
            <li>Marriage certificate or evidence of your relationship</li>
            <li>Medical evidence of the surrogacy arrangement</li>
            <li>Consent forms from the surrogate</li>
            <li>Financial records showing any payments made</li>
          </ul>
          
          <h2>Timeline and Costs</h2>
          <p>The Parental Order process typically takes 6-12 months from application to final order. Costs can vary depending on the complexity of your case, but you should budget for:</p>
          <ul>
            <li>Legal fees for your solicitor</li>
            <li>Court fees</li>
            <li>Any additional expert reports required</li>
          </ul>
          
          <h2>Common Challenges</h2>
          <p>Some common challenges in the Parental Order process include:</p>
          <ul>
            <li>Delays in court processing</li>
            <li>Complex financial arrangements</li>
            <li>International surrogacy complications</li>
            <li>Disputes over consent</li>
          </ul>
          
          <h2>Getting Legal Support</h2>
          <p>Given the complexity of Parental Order applications, it's highly recommended to seek professional legal advice. Our team at Westbourne Advisory has extensive experience in surrogacy law and can guide you through every step of the process.</p>
        `,
        slug: "understanding-parental-orders",
        publishedAt: "2024-01-15T10:00:00.000Z",
        author: {
          data: {
            attributes: {
              name: "Sarah Johnson",
              bio: "Senior Legal Advisor specializing in family law and surrogacy"
            }
          }
        },
        category: {
          data: {
            attributes: {
              name: "Legal Guide"
            }
          }
        }
      }
    }
  };
  
  return posts[slug as keyof typeof posts] || null;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50">
        <NavigationBar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-baby-blue hover:bg-blue-600 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const readingTime = Math.ceil(post.attributes.content.split(' ').length / 200);

  return (
    <main className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/blog" className="text-baby-blue hover:text-blue-600 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </nav>

        {/* Article Meta */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {post.attributes.category?.data?.attributes?.name && (
              <Badge variant="secondary" className="bg-baby-blue/20 text-baby-blue">
                {post.attributes.category.data.attributes.name}
              </Badge>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.attributes.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.attributes.excerpt}
          </p>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.attributes.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
            {post.attributes.author?.data?.attributes?.name && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.attributes.author.data.attributes.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.attributes.content }}
          />
          
          {/* Share and Author */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share Article
              </Button>
              
              {post.attributes.author?.data?.attributes?.name && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">Written by</p>
                  <p className="font-semibold text-gray-900">
                    {post.attributes.author.data.attributes.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Badge variant="secondary" className="bg-baby-blue/20 text-baby-blue mb-3">
                  Surrogate Rights
                </Badge>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  The Legal Rights of Surrogates in the UK
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore the legal protections and rights available to surrogates under UK law.
                </p>
                <Link href="/blog/legal-rights-surrogates-uk" className="text-baby-blue hover:text-blue-600 font-medium">
                  Read More →
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Badge variant="secondary" className="bg-baby-blue/20 text-baby-blue mb-3">
                  International Law
                </Badge>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  International Surrogacy: Legal Considerations
                </h3>
                <p className="text-gray-600 mb-4">
                  Important legal considerations for UK residents considering international surrogacy.
                </p>
                <Link href="/blog/international-surrogacy-legal-considerations" className="text-baby-blue hover:text-blue-600 font-medium">
                  Read More →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 