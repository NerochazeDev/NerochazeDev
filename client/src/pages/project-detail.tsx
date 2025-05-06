import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaExternalLinkAlt, FaTag, FaCalendarAlt } from "react-icons/fa";
import { Link } from "wouter";
import { Breadcrumbs, useBreadcrumbs } from "@/components/breadcrumbs";

// Create a simple date formatter function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  tags: string[];
  category: string;
  price: string;
  liveLink: string;
  createdAt: string;
}

export default function ProjectDetail() {
  const { id } = useParams();
  const [_, navigate] = useLocation();
  const projectId = parseInt(id as string);
  
  // Get breadcrumbs for current path
  const breadcrumbs = useBreadcrumbs();

  // Fetch project data
  const { data, isLoading, isError } = useQuery({
    queryKey: [`/api/projects/${projectId}`],
    select: (data: any) => data.data as Project,
    enabled: !isNaN(projectId)
  });

  // Handle invalid project ID
  useEffect(() => {
    if (isNaN(projectId)) {
      navigate("/not-found");
    }
  }, [projectId, navigate]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-32 pb-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  // Error state
  if (isError || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Project Not Found</h1>
          <p className="text-gray-300 mb-8">The project you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => navigate("/")}
            className="bg-cyan-500 hover:bg-cyan-600"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": data.title,
    "description": data.description,
    "applicationCategory": data.category,
    "offers": {
      "@type": "Offer",
      "price": data.price.replace(/[^\d.]/g, ''),
      "priceCurrency": "USD"
    },
    "image": data.image,
    "datePublished": data.createdAt
  };
  
  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://nerochaze.replit.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projects",
        "item": "https://nerochaze.replit.app/#projects"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": data.title,
        "item": `https://nerochaze.replit.app/project/${data.id}`
      }
    ]
  };

  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>{`${data.title} | Nerochaze Portfolio`}</title>
        <meta name="description" content={data.description} />
        <meta name="author" content="Nerochaze" />
        <meta name="keywords" content={`Nerochaze, ${data.tags?.join(", ")}, ${data.technologies?.join(", ")}`} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://nerochaze.replit.app/project/${data.id}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${data.title} | Nerochaze Portfolio`} />
        <meta property="og:description" content={data.description} />
        <meta property="og:url" content={`https://nerochaze.replit.app/project/${data.id}`} />
        <meta property="og:image" content={data.image} />
        <meta property="og:site_name" content="Nerochaze Portfolio" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${data.title} | Nerochaze Portfolio`} />
        <meta name="twitter:description" content={data.description} />
        <meta name="twitter:image" content={data.image} />
        <meta name="twitter:creator" content="@Nerochaze" />

        {/* Structured Data - Project */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Structured Data - Breadcrumbs */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Breadcrumbs for SEO and navigation */}
          {breadcrumbs.length > 0 && (
            <div className="mb-6">
              <Breadcrumbs items={breadcrumbs} className="text-sm" />
            </div>
          )}
          
          <Link href="/">
            <Button variant="ghost" className="text-cyan-400 hover:text-cyan-500 mb-8 -ml-4 hover:bg-gray-800/50">
              <FaArrowLeft className="mr-2" />
              Back to Projects
            </Button>
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Project Information - Left Side */}
            <div className="lg:col-span-3">
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
                
                <div className="text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                  {data.category}
                </div>
              </div>
              
              <div className="prose prose-invert max-w-none mb-10">
                <p className="text-lg">{data.description}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-white">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {data.technologies.map((tech, index) => (
                    <span key={index} className="bg-gray-800 px-3 py-1 rounded-md text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4 text-white">Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {data.tags && data.tags.map((tag, index) => (
                    <span key={index} className="flex items-center text-gray-400">
                      <FaTag className="mr-1 text-cyan-500/70" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-10">
                <a 
                  href={data.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-md shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  View Live Project
                </a>
              </div>
            </div>
            
            {/* Project Image - Right Side */}
            <div className="lg:col-span-2">
              <motion.div
                className="rounded-xl overflow-hidden shadow-xl shadow-cyan-500/10 h-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img 
                  src={data.image} 
                  alt={data.title} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
          
          <div className="mt-16 pt-10 border-t border-gray-800">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Pricing Information
            </h3>
            <div className="bg-gray-800/50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Starting price:</span>
                <span className="text-2xl font-bold text-cyan-400">{data.price}</span>
              </div>
              <p className="mt-4 text-gray-400">
                Contact us for custom requirements and detailed pricing options.
              </p>
              <div className="mt-6 space-y-2">
                <Button 
                  onClick={() => {
                    // Navigate first, then scroll to contact section after a delay to ensure component is loaded
                    navigate(`/?quote=true&project=${encodeURIComponent(data.title)}&id=${data.id}&price=${encodeURIComponent(data.price)}`);
                    
                    // Allow time for navigation and contact section to load before scrolling
                    setTimeout(() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 500);
                  }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  Get a Quote
                </Button>

                <Button 
                  onClick={() => {
                    // Navigate with interest parameters instead of quote parameters
                    navigate(`/?interest=true&project=${encodeURIComponent(data.title)}&id=${data.id}&price=${encodeURIComponent(data.price)}`);
                    
                    // Allow time for navigation and contact section to load before scrolling
                    setTimeout(() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 500);
                  }}
                  variant="outline"
                  className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                >
                  I'm Interested
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}