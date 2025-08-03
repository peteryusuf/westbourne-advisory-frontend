"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/lib/api";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const readingTime = Math.ceil(post.attributes.content.split(' ').length / 200);

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
      <Link href={`/blog/${post.attributes.slug}`}>
        <CardHeader className="p-0">
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg overflow-hidden">
            {post.attributes.featuredImage?.data?.attributes?.url ? (
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.attributes.featuredImage.data.attributes.url}`}
                alt={post.attributes.featuredImage.data.attributes.alternativeText || post.attributes.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-blue-600 text-4xl font-bold">W</div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            {post.attributes.category && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                {post.attributes.category}
              </Badge>
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.attributes.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.attributes.excerpt}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.attributes.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>
            {post.attributes.author && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.attributes.author}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
} 