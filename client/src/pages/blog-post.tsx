import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaTags, FaArrowLeft } from 'react-icons/fa';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { marked } from 'marked';
import { Helmet } from 'react-helmet-async';

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
  const [htmlContent, setHtmlContent] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: [`/api/blog/slug/${slug}`],
    select: (data: any) => data?.data as BlogPost,
    enabled: !!slug,
  });
  
  useEffect(() => {
    if (data?.content) {
      // Convert markdown to HTML
      try {
        const renderedContent = marked.parse(data.content);
        if (typeof renderedContent === 'string') {
          setHtmlContent(renderedContent);
        } else if (renderedContent instanceof Promise) {
          renderedContent.then(content => setHtmlContent(content));
        } else {
          setHtmlContent(data.content);
        }
      } catch (error) {
        console.error('Error parsing markdown:', error);
        setHtmlContent(data.content);
      }
    }
  }, [data?.content]);

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

  // Format the date to ISO format for structured data
  const getISODate = (dateString: string) => {
    if (!dateString) return new Date().toISOString();
    return new Date(dateString).toISOString();
  };

  // Prepare structured data for the blog post
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": data.title,
    "name": data.title,
    "description": data.excerpt,
    "datePublished": getISODate(data.createdAt),
    "dateModified": getISODate(data.updatedAt),
    "author": {
      "@type": "Person",
      "name": "Nerochaze",
      "url": "https://nerochaze.replit.app/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nerochaze Tech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nerochaze.replit.app/favicon.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://nerochaze.replit.app/blog/${data.slug}`
    },
    "image": data.coverImage || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "keywords": data.tags?.join(", ") || "",
    "url": `https://nerochaze.replit.app/blog/${data.slug}`
  };

  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>{`${data.title} | Nerochaze Blog`}</title>
        <meta name="description" content={data.excerpt} />
        <meta name="author" content="Nerochaze" />
        <meta name="keywords" content={`Nerochaze, ${data.tags?.join(", ")}`} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://nerochaze.replit.app/blog/${data.slug}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.excerpt} />
        <meta property="og:url" content={`https://nerochaze.replit.app/blog/${data.slug}`} />
        <meta property="og:image" content={data.coverImage} />
        <meta property="og:site_name" content="Nerochaze Blog" />
        <meta property="article:published_time" content={getISODate(data.createdAt)} />
        <meta property="article:modified_time" content={getISODate(data.updatedAt)} />
        {data.tags?.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.excerpt} />
        <meta name="twitter:image" content={data.coverImage} />
        <meta name="twitter:creator" content="@Nerochaze" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
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
              className="prose prose-lg prose-invert max-w-none prose-headings:text-cyan-400 prose-a:text-blue-400 prose-strong:text-white prose-code:bg-gray-800 prose-code:text-cyan-300 prose-pre:bg-gray-800/80 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-lg prose-blockquote:border-cyan-500 prose-blockquote:bg-gray-800/50 prose-blockquote:rounded-r-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;