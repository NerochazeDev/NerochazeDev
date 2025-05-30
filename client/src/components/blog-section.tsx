import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaTags, FaClock } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

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

const BlogSection = () => {
  // Fetch only published blog posts
  const { data, isLoading, isError } = useQuery({
    queryKey: ['/api/blog/published'],
    select: (data: any) => data?.data as BlogPost[] || [],
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const blogPosts = data || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <section id="blog" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Blog & Insights</span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded"></div>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Insights, tutorials, and thoughts about technology, development, and industry trends.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
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
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-10 bg-gray-800 rounded-lg border border-gray-700 p-8">
            <p className="text-gray-400 mb-4">No blog posts have been published yet.</p>
            <p className="text-cyan-400 font-semibold">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
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
                            className="text-xs border-cyan-500/30 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors"
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
    </section>
  );
};

export default BlogSection;