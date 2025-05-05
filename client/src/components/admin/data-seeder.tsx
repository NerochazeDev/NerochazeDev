import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, Database, FileText, Folders, RefreshCw, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useQueryClient } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Project templates data
const projectTemplates = [
  {
    title: "Tailor Website Template",
    description: "A professional website template for tailors and fashion designers. Features include portfolio showcase, appointment booking, and custom measurement tracking.",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600",
    technologies: ["React", "Node.js", "TailwindCSS", "Express"],
    tags: ["Fashion", "Tailor", "Website"],
    price: "$499",
    liveLink: "https://tailor-template.example.com",
    category: "Small Business"
  },
  {
    title: "Photographer Portfolio Theme",
    description: "A stunning portfolio theme for photographers with gallery layouts, client area, and booking system. Perfect for showcasing your best work with high-resolution images.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600",
    technologies: ["React", "Firebase", "TailwindCSS", "Framer Motion"],
    tags: ["Photography", "Portfolio", "Creative"],
    price: "$599",
    liveLink: "https://photographer-theme.example.com",
    category: "Creative"
  },
  {
    title: "Hairdresser Booking System",
    description: "Complete website solution for hairdressers and salons with online booking, staff management, and customer reviews. Includes a responsive design that works on all devices.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600",
    technologies: ["React", "Express", "MongoDB", "TailwindCSS"],
    tags: ["Salon", "Booking", "Beauty"],
    price: "$699",
    liveLink: "https://hairdresser-booking.example.com",
    category: "Small Business"
  },
  {
    title: "Freelancer Portfolio",
    description: "Modern portfolio website for freelancers with project showcase, client testimonials, and contact form. Designed to highlight your skills and attract new clients.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600",
    technologies: ["React", "NextJS", "TailwindCSS", "Prisma"],
    tags: ["Freelance", "Portfolio", "Professional"],
    price: "$399",
    liveLink: "https://freelancer-portfolio.example.com",
    category: "Personal"
  },
  {
    title: "Personal Website Theme",
    description: "Clean and minimal personal website theme with about, resume, and contact sections. Perfect for individuals looking to establish their online presence.",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600",
    technologies: ["React", "Gatsby", "TailwindCSS", "Contentful"],
    tags: ["Personal", "Resume", "Minimal"],
    price: "$299",
    liveLink: "https://personal-theme.example.com",
    category: "Personal"
  }
];

// Blog posts data
const blogPosts = [
  {
    title: "Essential Web Design Principles for 2025",
    slug: "essential-web-design-principles-2025",
    content: `# Essential Web Design Principles for 2025

In the ever-evolving landscape of web design, staying ahead of trends and best practices is crucial for creating effective and engaging websites. As we move into 2025, certain design principles have become essential for delivering exceptional user experiences.

## 1. Accessibility-First Design

Accessibility is no longer optional. Websites need to be usable by everyone, regardless of abilities or disabilities. This means:

- Proper contrast ratios for text and background
- Keyboard navigation support
- Semantic HTML structure
- ARIA attributes where necessary
- Screen reader compatibility

## 2. Performance Optimization

With users expecting near-instant loading times, performance has become a critical factor in web design:

- Lazy loading for images and videos
- Code splitting and tree shaking
- Efficient asset delivery and caching
- Server-side rendering where appropriate
- Core Web Vitals optimization

## 3. Responsive and Adaptive Design

With the proliferation of devices, responsive design has evolved to be more sophisticated:

- Container and layout queries
- Fluid typography and spacing
- Context-aware UI components
- Feature detection and progressive enhancement
- Device-specific optimizations

## 4. Minimalism with Personality

Clean designs continue to dominate, but with increased focus on brand personality:

- Strategic use of color and white space
- Purposeful animations and micro-interactions
- Custom illustrations and iconography
- Brand-specific design systems
- Thoughtful typography choices

## 5. Sustainable Web Design

Environmental impact is increasingly important:

- Reduced data transfer
- Green hosting options
- Efficient code and assets
- Optimized user journeys to reduce unnecessary page loads
- Energy-efficient color schemes and designs

By embracing these principles, you'll create websites that not only look great but also perform well, are accessible to all users, and have a reduced environmental impact. The key is finding the right balance between aesthetics, functionality, and sustainability for your specific project needs.`,
    excerpt: "Discover the key web design principles that will define successful websites in 2025, from accessibility to sustainability and everything in between.",
    coverImage: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600",
    tags: ["Web Design", "UX", "Trends"],
    published: "true"
  },
  {
    title: "Optimizing Website Performance for SEO",
    slug: "optimizing-website-performance-seo",
    content: `# Optimizing Website Performance for SEO

Website performance is no longer just about providing a good user experience—it's a critical factor in search engine rankings. Google's Core Web Vitals have made performance metrics a key component of SEO strategy. In this guide, we'll explore practical steps to optimize your website performance for better SEO results.

## Understanding Core Web Vitals

Core Web Vitals are a set of specific metrics that Google considers important for user experience:

- **Largest Contentful Paint (LCP)**: Measures loading performance. Aim for under 2.5 seconds.
- **First Input Delay (FID)**: Measures interactivity. Aim for under 100ms.
- **Cumulative Layout Shift (CLS)**: Measures visual stability. Aim for under 0.1.

## Image Optimization Techniques

Images often account for the largest portion of page weight:

1. **Use modern formats**: Convert images to WebP or AVIF for better compression.
2. **Implement responsive images**: Use srcset and size attributes.
3. **Lazy load images**: Only load images as they enter the viewport.
4. **Properly size images**: Never serve larger images than needed.
5. **Use CDNs**: Deliver images from edge servers closer to users.

## JavaScript Optimization

JavaScript can significantly impact performance:

1. **Code splitting**: Only load the JavaScript needed for the current page.
2. **Tree shaking**: Remove unused code.
3. **Defer non-critical JavaScript**: Use async and defer attributes.
4. **Minimize third-party scripts**: Each external script can impact performance.
5. **Monitor JavaScript execution time**: Identify and optimize slow functions.

## CSS Optimization

Efficient CSS improves rendering performance:

1. **Minimize CSS**: Remove unused styles.
2. **Critical CSS**: Inline critical styles in the head.
3. **Reduce CSS complexity**: Simplify selectors.
4. **Avoid render-blocking CSS**: Load non-critical CSS asynchronously.

## Server-Side Optimization

Backend optimizations are equally important:

1. **Implement caching**: Browser caching, CDN caching, and server caching.
2. **Use HTTP/2 or HTTP/3**: These protocols improve connection efficiency.
3. **Enable compression**: Use Gzip or Brotli compression.
4. **Optimize time to first byte (TTFB)**: Improve server response time.

## Regular Auditing and Monitoring

Maintaining performance requires ongoing attention:

1. **Use Lighthouse**: Regular audits help identify issues.
2. **Monitor real user metrics (RUM)**: Understand actual user experiences.
3. **Set up alerts**: Be notified when performance degrades.
4. **A/B test optimizations**: Verify improvements with data.

Optimizing website performance is an ongoing process, not a one-time task. By regularly implementing these best practices, you'll not only improve your search rankings but also provide a better experience for your users—leading to higher engagement, lower bounce rates, and better conversion metrics.`,
    excerpt: "Learn how website performance impacts SEO and discover practical techniques to optimize Core Web Vitals for better search engine rankings.",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600",
    tags: ["SEO", "Performance", "Web Development"],
    published: "true"
  },
  {
    title: "UX Design Trends Shaping the Future of Web",
    slug: "ux-design-trends-future-web",
    content: `# UX Design Trends Shaping the Future of Web

User experience (UX) design continues to evolve rapidly, driven by technological advancements, changing user expectations, and the need for more intuitive and accessible digital experiences. Here's a look at the UX design trends that are shaping the future of the web.

## 1. Voice User Interfaces (VUI)

As voice technology becomes more sophisticated, VUIs are increasingly integrated into web experiences:

- **Multimodal interfaces**: Combining voice with touch and visual elements
- **Voice-optimized content**: Creating content that works well for both reading and listening
- **Conversational design**: Natural language interactions that feel human-like
- **Voice search optimization**: Adapting UX for voice-based queries

## 2. Immersive Experiences with AR and VR

Augmented and virtual reality are creating new possibilities for web experiences:

- **WebAR**: AR experiences without requiring app downloads
- **Virtual showrooms**: 3D product demonstrations and virtual tours
- **Spatial interfaces**: Designing for three-dimensional space
- **Mixed reality navigation**: Combining the physical and digital worlds`,
    excerpt: "Explore the cutting-edge UX design trends that are transforming the web, from voice interfaces and AR to ethical design principles and biometric integration.",
    coverImage: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600",
    tags: ["UX Design", "Trends", "User Experience"],
    published: "true"
  }
];

export function DataSeeder() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [projectsStatus, setProjectsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [blogStatus, setBlogStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [skillsStatus, setSkillsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const addProjects = async () => {
    try {
      setProjectsStatus('loading');
      setError(null);
      
      // Add projects one by one to avoid timeouts
      for (const project of projectTemplates) {
        await apiRequest('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project),
        });
      }
      
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setProjectsStatus('success');
      toast({
        title: "Success",
        description: `Added ${projectTemplates.length} project templates successfully`,
      });
    } catch (err) {
      console.error('Error adding projects:', err);
      setProjectsStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to add projects');
      toast({
        title: "Error",
        description: "Failed to add projects. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addBlogPosts = async () => {
    try {
      setBlogStatus('loading');
      setError(null);
      
      // Add blog posts one by one to avoid timeouts
      for (const post of blogPosts) {
        await apiRequest('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        });
      }
      
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      setBlogStatus('success');
      toast({
        title: "Success",
        description: `Added ${blogPosts.length} blog posts successfully`,
      });
    } catch (err) {
      console.error('Error adding blog posts:', err);
      setBlogStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to add blog posts');
      toast({
        title: "Error",
        description: "Failed to add blog posts. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const addSkills = async () => {
    try {
      setSkillsStatus('loading');
      setError(null);
      
      const skillsToAdd = [
        { name: "JavaScript", percentage: "95", category: "primary", order: "1" },
        { name: "TypeScript", percentage: "90", category: "primary", order: "2" },
        { name: "React", percentage: "98", category: "primary", order: "3" },
        { name: "Node.js", percentage: "92", category: "primary", order: "4" },
        { name: "Express", percentage: "88", category: "primary", order: "5" },
        { name: "MongoDB", percentage: "85", category: "secondary", order: "1" },
        { name: "PostgreSQL", percentage: "87", category: "secondary", order: "2" },
        { name: "GraphQL", percentage: "80", category: "secondary", order: "3" },
        { name: "Docker", percentage: "78", category: "tools", order: "1" },
        { name: "AWS", percentage: "75", category: "tools", order: "2" }
      ];
      
      // Add skills one by one
      for (const skill of skillsToAdd) {
        await apiRequest('/api/skills', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(skill),
        });
      }
      
      queryClient.invalidateQueries({ queryKey: ['/api/skills'] });
      setSkillsStatus('success');
      toast({
        title: "Success",
        description: `Added 10 skills successfully`,
      });
    } catch (err) {
      console.error('Error adding skills:', err);
      setSkillsStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to add skills');
      toast({
        title: "Error",
        description: "Failed to add skills. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Add render UI for the data seeder
  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Projects Seeder */}
        <Card className="bg-gray-900 border-gray-800">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3">
                <Folders className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Project Templates</h3>
                <p className="text-sm text-gray-400">Add 5 professional project templates</p>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <Badge variant="outline" className="mr-2 bg-gray-800 text-gray-300 border-gray-700">
                  {projectTemplates.length} templates
                </Badge>
                <span>Tailor, Photographer, Hairdresser...</span>
              </div>
              
              <Button 
                className="w-full" 
                variant={projectsStatus === 'success' ? "outline" : "default"}
                disabled={projectsStatus === 'loading'}
                onClick={addProjects}
              >
                {projectsStatus === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {projectsStatus === 'success' && <CheckCircle className="mr-2 h-4 w-4" />}
                {projectsStatus === 'idle' && "Add Project Templates"}
                {projectsStatus === 'loading' && "Adding Projects..."}
                {projectsStatus === 'success' && "Projects Added"}
                {projectsStatus === 'error' && "Try Again"}
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Blog Posts Seeder */}
        <Card className="bg-gray-900 border-gray-800">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center mr-3">
                <FileText className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Blog Posts</h3>
                <p className="text-sm text-gray-400">Add professional blog content</p>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <Badge variant="outline" className="mr-2 bg-gray-800 text-gray-300 border-gray-700">
                  {blogPosts.length} posts
                </Badge>
                <span>Web Design, SEO, UX Trends...</span>
              </div>
              
              <Button 
                className="w-full" 
                variant={blogStatus === 'success' ? "outline" : "default"}
                disabled={blogStatus === 'loading'}
                onClick={addBlogPosts}
              >
                {blogStatus === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {blogStatus === 'success' && <CheckCircle className="mr-2 h-4 w-4" />}
                {blogStatus === 'idle' && "Add Blog Posts"}
                {blogStatus === 'loading' && "Adding Posts..."}
                {blogStatus === 'success' && "Posts Added"}
                {blogStatus === 'error' && "Try Again"}
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Skills Seeder */}
        <Card className="bg-gray-900 border-gray-800">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mr-3">
                <Database className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Professional Skills</h3>
                <p className="text-sm text-gray-400">Add 10 developer skills</p>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <Badge variant="outline" className="mr-2 bg-gray-800 text-gray-300 border-gray-700">
                  10 skills
                </Badge>
                <span>JavaScript, React, Node.js...</span>
              </div>
              
              <Button 
                className="w-full" 
                variant={skillsStatus === 'success' ? "outline" : "default"}
                disabled={skillsStatus === 'loading'}
                onClick={addSkills}
              >
                {skillsStatus === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {skillsStatus === 'success' && <CheckCircle className="mr-2 h-4 w-4" />}
                {skillsStatus === 'idle' && "Add Skills"}
                {skillsStatus === 'loading' && "Adding Skills..."}
                {skillsStatus === 'success' && "Skills Added"}
                {skillsStatus === 'error' && "Try Again"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}