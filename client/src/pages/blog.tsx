import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaTags, FaClock, FaSearch } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';
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

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Fetch only published blog posts
  const { data, isLoading, isError } = useQuery({
    queryKey: ['/api/blog/published'],
    select: (data: any) => data?.data as BlogPost[] || [],
  });

  const blogPosts = data || [];
  
  // Get all unique tags
  const allTags = blogPosts.reduce<string[]>((tags, post) => {
    post.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
    return tags;
  }, []);
  
  // Filter posts by search query and selected tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Create blog list structured data
  const blogListStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://nerochaze.replit.app/blog"
    },
    "headline": "Nerochaze Blog - Technical Articles on Web Development and More",
    "description": "Technical insights, tutorials, and thoughts on development, blockchain, and technology trends by Nerochaze, a full-stack developer.",
    "publisher": {
      "@type": "Organization",
      "name": "Nerochaze Tech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nerochaze.replit.app/favicon.svg"
      }
    },
    "url": "https://nerochaze.replit.app/blog",
    "itemListElement": filteredPosts.map((post, index) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.coverImage,
      "datePublished": post.createdAt,
      "dateModified": post.updatedAt,
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
      "url": `https://nerochaze.replit.app/blog/${post.slug}`,
      "position": index + 1
    }))
  };

  return (
    <>
      <Helmet>
        <title>Nerochaze Blog | Web Development Articles and Insights</title>
        <meta name="description" content="Technical insights, tutorials, and thoughts on development, blockchain, and technology trends by Nerochaze, a professional full-stack developer." />
        <meta name="keywords" content="Nerochaze, Nerochaze blog, web development blog, programming articles, tech tutorials, software engineering, blockchain, web technologies" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://nerochaze.replit.app/blog" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nerochaze Blog | Web Development Articles and Insights" />
        <meta property="og:description" content="Technical insights, tutorials, and thoughts on development, blockchain, and technology trends." />
        <meta property="og:url" content="https://nerochaze.replit.app/blog" />
        <meta property="og:site_name" content="Nerochaze Blog" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nerochaze Blog | Web Development Articles and Insights" />
        <meta name="twitter:description" content="Technical insights, tutorials, and thoughts on development, blockchain, and technology trends." />
        <meta name="twitter:creator" content="@Nerochaze" />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(blogListStructuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-4 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Blog</span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded"></div>
            </h1>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Technical insights, tutorials, and thoughts on development, blockchain, and technology trends.
            </p>
          </motion.div>
          
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative w-full md:w-1/2 mx-auto">
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white focus-visible:ring-cyan-500"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                <Badge 
                  variant={selectedTag === null ? "default" : "outline"}
                  className={`cursor-pointer bg-gray-800 hover:bg-gray-700 ${selectedTag === null ? 'bg-cyan-500 hover:bg-cyan-600 text-gray-900' : 'text-gray-300'}`}
                  onClick={() => setSelectedTag(null)}
                >
                  All
                </Badge>
                {allTags.map(tag => (
                  <Badge 
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className={`cursor-pointer ${selectedTag === tag ? 'bg-cyan-500 hover:bg-cyan-600 text-gray-900' : 'border-gray-700 hover:bg-gray-700 text-gray-300'}`}
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="bg-gray-800 border-gray-700 overflow-hidden flex flex-col h-full shadow-lg shadow-cyan-500/10">
                  <Skeleton className="h-48 w-full bg-gray-700" />
                  <CardHeader className="border-b border-gray-700">
                    <Skeleton className="h-6 w-3/4 mb-2 bg-gray-700" />
                    <Skeleton className="h-4 w-1/2 bg-gray-700" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2 bg-gray-700" />
                    <Skeleton className="h-4 w-full mb-2 bg-gray-700" />
                    <Skeleton className="h-4 w-3/4 bg-gray-700" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full bg-gray-700" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-10 bg-gray-800 rounded-lg border border-gray-700 p-8">
              <p className="text-gray-400 mb-4">There was an error loading the blog posts.</p>
              <Button variant="outline" className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-gray-900">
                Try Again
              </Button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-10 bg-gray-800 rounded-lg border border-gray-700 p-8">
              {blogPosts.length === 0 ? (
                <>
                  <p className="text-gray-400 mb-4">No blog posts have been published yet.</p>
                  <p className="text-cyan-400 font-semibold">Check back soon for new content!</p>
                </>
              ) : (
                <>
                  <p className="text-gray-400 mb-4">No posts match your search criteria.</p>
                  <Button 
                    variant="outline" 
                    className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-gray-900"
                    onClick={() => {setSearchQuery(''); setSelectedTag(null);}}
                  >
                    Reset Filters
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * Math.min(index, 5) }}
                  className="h-full"
                >
                  <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full flex flex-col shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 group">
                    {post.coverImage && (
                      <div className="h-52 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50 z-10"></div>
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-2 border-b border-gray-700">
                      <Link href={`/blog/${post.slug}`}>
                        <CardTitle className="text-white hover:text-cyan-400 transition-colors line-clamp-2 cursor-pointer">
                          {post.title}
                        </CardTitle>
                      </Link>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1 text-cyan-400" size={12} />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        <div className="flex items-center">
                          <FaClock className="mr-1 text-cyan-400" size={12} />
                          <span>5 min read</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow pt-4">
                      <p className="text-gray-400 line-clamp-3 mb-4">{post.excerpt}</p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {post.tags.map((tag, idx) => (
                            <Badge 
                              key={idx} 
                              variant="outline" 
                              className="text-xs border-cyan-500/30 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedTag(tag);
                              }}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Link href={`/blog/${post.slug}`} className="w-full">
                        <Button 
                          variant="outline" 
                          className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-gray-900 group"
                        >
                          <span>Read Article</span>
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;