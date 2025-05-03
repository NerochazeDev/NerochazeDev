import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaTags, FaArrowLeft } from 'react-icons/fa';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  published: string;
  createdAt: string;
  updatedAt: string;
};

const BlogPost = () => {
  const [, params] = useRoute('/blog/:slug');
  const slug = params?.slug || '';

  const { data, isLoading, isError } = useQuery({
    queryKey: [`/api/blog/slug/${slug}`],
    select: (data: any) => data?.data as BlogPost,
    enabled: !!slug,
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8">
            <Skeleton className="h-12 w-3/4 mb-4 bg-gray-800" />
            <div className="flex gap-4 mb-8">
              <Skeleton className="h-6 w-32 bg-gray-800" />
              <Skeleton className="h-6 w-32 bg-gray-800" />
            </div>
            <Skeleton className="h-80 w-full mb-8 bg-gray-800" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full bg-gray-800" />
              <Skeleton className="h-6 w-full bg-gray-800" />
              <Skeleton className="h-6 w-3/4 bg-gray-800" />
              <Skeleton className="h-6 w-5/6 bg-gray-800" />
              <Skeleton className="h-6 w-full bg-gray-800" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-6 text-white">Post Not Found</h1>
          <p className="text-gray-400 mb-8">Sorry, the blog post you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-gray-900">
              <FaArrowLeft className="mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="text-cyan-400 hover:text-cyan-500 mb-8 -ml-4 hover:bg-gray-800/50">
              <FaArrowLeft className="mr-2" />
              Back to Blog
            </Button>
          </Link>
          
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {data.title}
          </motion.h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-8">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-cyan-400" />
              <span>{formatDate(data.createdAt)}</span>
            </div>
            
            {data.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <FaTags className="text-cyan-400" />
                {data.tags.map((tag, idx) => (
                  <Badge 
                    key={idx} 
                    variant="outline" 
                    className="text-xs border-cyan-500/30 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {data.coverImage && (
            <motion.div 
              className="w-full h-80 md:h-96 overflow-hidden rounded-lg mb-10 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50 z-10"></div>
              <img 
                src={data.coverImage} 
                alt={data.title} 
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
          
          <motion.div
            className="prose prose-lg prose-invert max-w-none prose-headings:text-cyan-400 prose-a:text-blue-400 prose-strong:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;