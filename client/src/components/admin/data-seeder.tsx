import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, Database, FileText, Folders, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useQueryClient } from "@tanstack/react-query";

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
    content: `
# Essential Web Design Principles for 2025

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

By embracing these principles, you'll create websites that not only look great but also perform well, are accessible to all users, and have a reduced environmental impact. The key is finding the right balance between aesthetics, functionality, and sustainability for your specific project needs.
    `,
    excerpt: "Discover the key web design principles that will define successful websites in 2025, from accessibility to sustainability and everything in between.",
    coverImage: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600",
    tags: ["Web Design", "UX", "Trends"],
    published: "true"
  },
  {
    title: "Optimizing Website Performance for SEO",
    slug: "optimizing-website-performance-seo",
    content: `
# Optimizing Website Performance for SEO

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

Optimizing website performance is an ongoing process, not a one-time task. By regularly implementing these best practices, you'll not only improve your search rankings but also provide a better experience for your users—leading to higher engagement, lower bounce rates, and better conversion metrics.
    `,
    excerpt: "Learn how website performance impacts SEO and discover practical techniques to optimize Core Web Vitals for better search engine rankings.",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600",
    tags: ["SEO", "Performance", "Web Development"],
    published: "true"
  },
  {
    title: "UX Design Trends Shaping the Future of Web",
    slug: "ux-design-trends-future-web",
    content: `
# UX Design Trends Shaping the Future of Web

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
- **Mixed reality navigation**: Combining the physical and digital worlds

## 3. Adaptive and Predictive UX

Using AI to personalize and anticipate user needs:

- **Predictive interfaces**: Anticipating user actions before they occur
- **Adaptive content**: Content that changes based on user behavior and preferences
- **Smart forms**: Forms that adjust based on user inputs
- **Contextual experiences**: Interfaces that adapt to location, time, and user context

## 4. Advanced Micro-interactions

Small animations and feedback mechanisms that enhance usability:

- **State communication**: Clearly indicating system status
- **Guided actions**: Subtle hints about available interactions
- **Playful feedback**: Making routine tasks more engaging
- **Emotional design**: Creating moments of delight

## 5. Ethical and Inclusive Design

Designing with consideration for all users and ethical implications:

- **Accessibility by default**: Building inclusivity into every aspect of design
- **Privacy-conscious UX**: Transparent data practices and user control
- **Reducing cognitive load**: Simplifying complex interactions
- **Cultural inclusivity**: Designing for global audiences

## 6. Biometric Integration

Using biometric data to enhance user experiences:

- **Facial recognition**: For personalization and authentication
- **Emotion detection**: Adapting content based on user emotions
- **Gesture controls**: Intuitive interactions without clicks
- **Health-aware designs**: Interfaces that adapt to user wellness

## 7. Zero UI and Invisible Interfaces

Moving beyond traditional visual interfaces:

- **Ambient computing**: Technology that works in the background
- **Seamless integrations**: Services that connect without visible interfaces
- **IoT interactions**: Web experiences that connect with physical devices
- **Friction-free automation**: Reducing steps needed to complete tasks

The future of UX design is focused on creating more natural, intuitive, and human-centered experiences. By embracing these trends, designers can create web experiences that not only meet current user expectations but also adapt to the rapidly changing technological landscape.
    `,
    excerpt: "Explore the cutting-edge UX design trends that are transforming the web, from voice interfaces and AR to ethical design principles and biometric integration.",
    coverImage: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600",
    tags: ["UX Design", "Trends", "User Experience"],
    published: "true"
  },
  {
    title: "The Impact of AI on Web Development",
    slug: "impact-ai-web-development",
    content: `
# The Impact of AI on Web Development

Artificial Intelligence (AI) is revolutionizing web development, transforming how websites are designed, built, and maintained. From automated coding to intelligent user experiences, AI is reshaping the web development landscape. Here's how AI is making an impact and what developers should know to stay ahead.

## Code Generation and Automation

AI is streamlining the coding process:

- **AI code assistants**: Tools like GitHub Copilot and ChatGPT that generate code based on natural language descriptions
- **Automated debugging**: AI systems that can identify and fix bugs
- **Code optimization**: Algorithms that improve performance and efficiency
- **Low-code/no-code platforms**: AI-powered platforms that enable development without traditional coding

## Intelligent Design Systems

AI is changing how we approach web design:

- **Automated design generation**: Creating layouts based on content and brand guidelines
- **Design adaptation**: Automatically adjusting designs for different devices and contexts
- **A/B testing automation**: Intelligently testing and optimizing design variations
- **Accessibility improvements**: Automatically enhancing designs for better accessibility

## Personalized User Experiences

AI enables deeper personalization:

- **Dynamic content**: Content that adapts based on user preferences and behavior
- **Recommendation engines**: Suggesting relevant content and products
- **Behavior prediction**: Anticipating user needs and actions
- **Contextual interfaces**: Adapting the interface based on user context

## Natural Language Processing (NLP)

NLP is enhancing how users interact with websites:

- **Advanced search capabilities**: Understanding complex queries and intent
- **Chatbots and virtual assistants**: More natural and helpful conversational interfaces
- **Content generation**: AI-written content that adapts to user interests
- **Sentiment analysis**: Understanding user feedback and emotions

## Intelligent Testing and Quality Assurance

AI is improving how we test web applications:

- **Automated testing**: Generating test cases and executing them without human intervention
- **Visual regression testing**: Detecting visual UI issues automatically
- **Performance optimization**: Identifying and resolving performance bottlenecks
- **Security vulnerability detection**: Finding potential security issues before they're exploited

## DevOps and Infrastructure

AI is optimizing how we deploy and maintain web applications:

- **Predictive maintenance**: Anticipating server issues before they cause problems
- **Intelligent scaling**: Automatically adjusting resources based on predicted demand
- **Anomaly detection**: Identifying unusual patterns that might indicate problems
- **Automated deployment optimization**: Finding the best deployment strategies

## Ethical Considerations and Challenges

The rise of AI in web development brings important considerations:

- **Bias in AI systems**: Ensuring AI doesn't perpetuate existing biases
- **Privacy concerns**: Balancing personalization with user privacy
- **Transparency**: Making AI decision-making processes understandable
- **Job transformation**: Changing roles for web developers

## Preparing for an AI-Enhanced Future

To stay relevant in this evolving landscape:

- **Develop AI literacy**: Understand how AI works and its capabilities
- **Focus on creative and strategic skills**: Areas where humans still excel
- **Learn to collaborate with AI**: Use AI as a tool to enhance your work
- **Stay adaptable**: Be ready to learn new skills as the field evolves

AI is not replacing web developers but transforming how they work. By embracing these changes and developing complementary skills, developers can leverage AI to create more sophisticated, user-friendly, and efficient web experiences than ever before.
    `,
    excerpt: "Discover how artificial intelligence is transforming web development, from automated coding and design to personalized user experiences and intelligent testing.",
    coverImage: "https://images.unsplash.com/photo-1677442135167-8d9d6b84be79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600",
    tags: ["AI", "Web Development", "Technology"],
    published: "true"
  },
  {
    title: "Building Accessible Websites: A Comprehensive Guide",
    slug: "building-accessible-websites-comprehensive-guide",
    content: `
# Building Accessible Websites: A Comprehensive Guide

Web accessibility is about creating websites that can be used by everyone, including people with disabilities. It's not just a legal requirement in many countries—it's a fundamental aspect of good web design that benefits all users. This comprehensive guide will help you understand and implement accessibility best practices in your websites.

## Understanding Web Accessibility

Accessibility encompasses a wide range of considerations:

- **Visual impairments**: From low vision to complete blindness
- **Hearing impairments**: From difficulty hearing to complete deafness
- **Motor disabilities**: Affecting the ability to use a mouse or keyboard
- **Cognitive disabilities**: Affecting comprehension and focus

## WCAG Guidelines: The Foundation of Accessibility

The Web Content Accessibility Guidelines (WCAG) provide the standards for accessibility:

- **Perceivable**: Information must be presentable to users in ways they can perceive
- **Operable**: User interface components must be operable by a variety of methods
- **Understandable**: Information and operation must be understandable
- **Robust**: Content must be robust enough to work with current and future technologies

## Semantic HTML: The Building Blocks

Proper HTML structure is the foundation of accessibility:

- **Use appropriate elements**: \`<button>\` for buttons, \`<a>\` for links, etc.
- **Heading structure**: Use \`<h1>\` through \`<h6>\` correctly for document outline
- **Lists**: Use \`<ul>\`, \`<ol>\`, and \`<dl>\` for proper list structures
- **Tables**: Use \`<th>\`, \`<caption>\`, and other table elements correctly
- **Forms**: Label fields properly and provide clear error messages

## Focus Management

Ensure keyboard navigation works smoothly:

- **Logical tab order**: Interactive elements should be accessible in a logical sequence
- **Focus styles**: Make focus indicators visible and clear
- **Skip links**: Allow users to bypass repetitive navigation
- **Managing focus in SPAs**: Ensure focus is managed when content changes

## Visual Design Considerations

Design with accessibility in mind:

- **Color contrast**: Ensure sufficient contrast between text and background
- **Don't rely solely on color**: Use additional indicators like icons or patterns
- **Text sizing**: Allow text to be resized without breaking layouts
- **Responsive design**: Ensure accessibility across all screen sizes
- **Dark mode**: Implement properly for users sensitive to bright screens

## Images and Media

Make multimedia content accessible:

- **Alt text**: Provide descriptive alternative text for images
- **Captions and transcripts**: For audio and video content
- **Audio descriptions**: Describe visual content for blind users
- **Avoid auto-playing**: Give users control over media playback
- **Avoid flashing content**: Prevent seizure risks

## ARIA When Necessary

Accessible Rich Internet Applications (ARIA) enhances accessibility:

- **Use native HTML when possible**: Only use ARIA when HTML alone is insufficient
- **Landmarks**: Mark regions of the page with appropriate roles
- **State information**: Communicate the state of interactive elements
- **Live regions**: Announce dynamic content changes
- **Common ARIA patterns**: Follow established patterns for complex widgets

## Testing for Accessibility

Regular testing is essential:

- **Automated testing**: Tools like Lighthouse, Axe, and WAVE
- **Manual testing**: Keyboard navigation, screen reader testing
- **User testing**: Get feedback from users with disabilities
- **Accessibility audits**: Regular comprehensive reviews
- **Browser extensions**: Tools to check specific aspects of accessibility

## Organizational Approach

Embed accessibility into your development process:

- **Start early**: Consider accessibility from the design phase
- **Educate your team**: Ensure everyone understands accessibility principles
- **Design system integration**: Build accessibility into your components
- **Documentation**: Create accessibility guidelines specific to your organization
- **Continuous improvement**: Regularly review and enhance accessibility

Building accessible websites is an ongoing process, not a one-time task. By incorporating these practices into your development workflow, you'll create websites that are more usable for everyone while meeting legal requirements and improving SEO and user experience for all users.
    `,
    excerpt: "Learn how to create websites that are accessible to all users, including those with disabilities, with this in-depth guide to web accessibility principles and practices.",
    coverImage: "https://images.unsplash.com/photo-1592771121889-0a4e8b81de2d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600",
    tags: ["Accessibility", "Web Development", "Inclusive Design"],
    published: "true"
  },
  {
    title: "Typography in Web Design: Principles and Best Practices",
    slug: "typography-web-design-principles-best-practices",
    content: `
# Typography in Web Design: Principles and Best Practices

Typography is one of the most powerful tools in a web designer's arsenal. It's not just about choosing attractive fonts—it's about creating hierarchy, improving readability, establishing brand identity, and enhancing user experience. This guide explores the essential principles and best practices for typography in web design.

## Fundamentals of Web Typography

Understanding the building blocks:

- **Font families**: Serif, sans-serif, monospace, display, and script
- **Type anatomy**: Baseline, x-height, cap height, ascenders, and descenders
- **Font weight**: From thin (100) to black (900)
- **Font style**: Regular, italic, oblique
- **Line height**: The space between lines of text
- **Letter spacing**: Adjusting the space between characters
- **Word spacing**: Controlling the space between words

## Choosing Fonts for the Web

Strategic font selection:

- **Web safe fonts**: Fonts that are widely available across operating systems
- **Web fonts**: Custom fonts loaded from services like Google Fonts, Adobe Fonts
- **Variable fonts**: Single font files that offer multiple variations
- **Font loading**: Strategies to optimize performance
- **Font pairing**: Combining fonts that complement each other

## Creating Typographic Hierarchy

Guiding users through content:

- **Size contrast**: Differentiating elements through font size
- **Weight contrast**: Using bold or light weights to create emphasis
- **Style contrast**: Combining different styles within a font family
- **Color contrast**: Using color to create distinction
- **Spacing**: Using white space to separate hierarchical elements

## Responsive Typography

Adapting type for all screen sizes:

- **Fluid typography**: Scaling text size based on viewport width
- **Minimum and maximum sizes**: Setting boundaries for text scaling
- **Breakpoints**: Adjusting typography at specific screen sizes
- **Line length control**: Maintaining optimal characters per line
- **Vertical rhythm**: Consistent spacing between elements

## Readability and Legibility

Making content easy to read:

- **Font size**: Appropriately sized text for different content types
- **Line height**: Proper spacing between lines (generally 1.5-2 times the font size)
- **Line length**: Keeping lines to 45-75 characters for optimal reading
- **Paragraph spacing**: Clear distinction between blocks of text
- **Contrast**: Sufficient contrast between text and background
- **Font weight**: Appropriate weight for body text vs. headings

## Typographic Details

Refining your typography:

- **Proper punctuation**: Using the right quotes, dashes, and other punctuation
- **Widows and orphans**: Avoiding single words on lines of their own
- **Hyphenation**: Strategic use of hyphenation for more even text blocks
- **Kerning**: Adjusting space between specific character pairs
- **Small caps and alternates**: Using special characters appropriately
- **Ligatures**: Special combined characters for better appearance

## Performance Considerations

Balancing aesthetics and speed:

- **Font subsetting**: Including only the characters you need
- **Font formats**: Using modern formats like WOFF2
- **Font loading strategies**: Font display properties and loading techniques
- **System font stacks**: Using default system fonts for better performance
- **Limiting font weights**: Using only the weights you need

## Typography for Branding

Building brand identity through type:

- **Consistent usage**: Maintaining typographic consistency across platforms
- **Custom fonts**: When to invest in custom typography
- **Typographic voice**: Choosing fonts that reflect brand personality
- **Fallback strategies**: Ensuring brand integrity when custom fonts fail
- **Typographic signatures**: Creating recognizable textual brand elements

## Accessibility in Typography

Making type accessible to all:

- **Text scaling**: Ensuring text can be resized by users
- **Font choices for readability**: Selecting fonts that are clear for all users
- **Contrast ratios**: Meeting WCAG guidelines for text contrast
- **Line spacing**: Providing sufficient spacing for users with reading difficulties
- **Text alternatives**: Ensuring decorative text has proper alternatives

By applying these principles and best practices, you'll create more effective, readable, and beautiful web typography. Remember that typography is both an art and a science—it requires both aesthetic sensibility and technical knowledge to implement effectively on the web.
    `,
    excerpt: "Master the art and science of web typography with this guide to choosing fonts, creating hierarchy, improving readability, and enhancing user experience through effective text design.",
    coverImage: "https://images.unsplash.com/photo-1563212034-a3c52118cce2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600",
    tags: ["Typography", "Design", "Web Design"],
    published: "true"
  }
];

// Main component
export const DataSeeder: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [projectsSuccess, setProjectsSuccess] = useState(false);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogSuccess, setBlogSuccess] = useState(false);

  // Add all project templates
  const addProjectTemplates = async () => {
    try {
      setProjectsLoading(true);
      setProjectsSuccess(false);

      // Add each project sequentially
      for (const project of projectTemplates) {
        await apiRequest('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(project),
        });
      }

      // Invalidate projects cache to refresh the UI
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      
      setProjectsSuccess(true);
      toast({
        title: "Success!",
        description: `Added ${projectTemplates.length} project templates to your portfolio.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error adding project templates:", error);
      toast({
        title: "Error",
        description: "Failed to add project templates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProjectsLoading(false);
    }
  };

  // Add all blog posts
  const addBlogPosts = async () => {
    try {
      setBlogLoading(true);
      setBlogSuccess(false);

      // Add each blog post sequentially
      for (const post of blogPosts) {
        await apiRequest('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(post),
        });
      }

      // Invalidate blog posts cache to refresh the UI
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      queryClient.invalidateQueries({ queryKey: ['/api/blog/published'] });
      
      setBlogSuccess(true);
      toast({
        title: "Success!",
        description: `Added ${blogPosts.length} blog posts to your website.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error adding blog posts:", error);
      toast({
        title: "Error",
        description: "Failed to add blog posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setBlogLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Project Templates Seeder */}
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <div className="flex items-center mb-3 sm:mb-4">
            <div className="p-2 bg-blue-500/20 rounded mr-3">
              <Folders className="h-5 w-5 text-blue-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-white">Project Templates</h3>
          </div>
          
          <p className="text-gray-300 mb-4 sm:mb-5 text-sm sm:text-base">
            Add 5 professional project templates to your portfolio website. Templates include designs for tailors, photographers, hairdressers, freelancers, and personal websites.
          </p>
          
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-wrap gap-2">
              {projectTemplates.map((project, index) => (
                <Badge key={index} className="bg-blue-500/20 text-blue-300 border-blue-500 text-xs">
                  {project.title.split(' ')[0]}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button 
            className="w-full font-medium bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm sm:text-base"
            onClick={addProjectTemplates}
            disabled={projectsLoading || projectsSuccess}
          >
            {projectsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {projectsSuccess && <CheckCircle className="mr-2 h-4 w-4" />}
            {projectsSuccess 
              ? "Projects Added" 
              : projectsLoading 
                ? "Adding Projects..." 
                : "Add Project Templates"}
          </Button>
        </Card>

        {/* Blog Posts Seeder */}
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <div className="flex items-center mb-3 sm:mb-4">
            <div className="p-2 bg-cyan-500/20 rounded mr-3">
              <FileText className="h-5 w-5 text-cyan-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-white">Blog Posts</h3>
          </div>
          
          <p className="text-gray-300 mb-4 sm:mb-5 text-sm sm:text-base">
            Add 6 professionally written blog posts about web design, performance optimization, UX trends, AI in web development, accessibility, and typography.
          </p>
          
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-wrap gap-2">
              {blogPosts.slice(0, 5).map((post, index) => (
                <Badge key={index} className="bg-cyan-500/20 text-cyan-300 border-cyan-500 text-xs">
                  {post.tags[0]}
                </Badge>
              ))}
              {blogPosts.length > 5 && (
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500 text-xs">
                  +{blogPosts.length - 5} more
                </Badge>
              )}
            </div>
          </div>
          
          <Button 
            className="w-full font-medium bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white text-sm sm:text-base"
            onClick={addBlogPosts}
            disabled={blogLoading || blogSuccess}
          >
            {blogLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {blogSuccess && <CheckCircle className="mr-2 h-4 w-4" />}
            {blogSuccess 
              ? "Blog Posts Added" 
              : blogLoading 
                ? "Adding Blog Posts..." 
                : "Add Blog Posts"}
          </Button>
        </Card>
      </div>

      {/* Reset Database Button */}
      <Card className="p-4 sm:p-5 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div className="flex items-center">
            <div className="p-2 bg-purple-500/20 rounded mr-3">
              <Database className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Database Tools</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Reset or refresh your database to fix issues.</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="border-gray-700 hover:bg-gray-800 text-gray-300 flex items-center gap-2 text-sm w-full sm:w-auto"
            onClick={() => {
              // Invalidate all queries to force a refresh
              queryClient.invalidateQueries();
              toast({
                title: "Cache Refreshed",
                description: "All data has been refreshed from the database.",
                variant: "default",
              });
            }}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DataSeeder;