import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaFolder, FaTag, FaDollarSign } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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

const ProjectsSection = () => {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isInterestDialogOpen, setIsInterestDialogOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch projects from the API
  const { data, isLoading, isError } = useQuery({
    queryKey: ['/api/projects'],
    select: (data: any) => data?.data as Project[] || [],
  });
  
  // Handle input changes for the interest form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle submission of the interest form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("/api/project-interest", { 
        method: "POST", 
        body: JSON.stringify({
          ...formState,
          projectId: selectedProject.id
        })
      });
      
      toast({
        title: "Interest submitted!",
        description: "Thanks for your interest! I'll get back to you soon.",
      });
      
      // Reset form and close dialog
      setFormState({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      setIsInterestDialogOpen(false);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your interest. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle clicking the "I'm Interested" button
  const handleInterestClick = (project: Project) => {
    setSelectedProject(project);
    setIsInterestDialogOpen(true);
  };
  
  // Use API data if available, otherwise use empty array for rendering
  const projects = data || [];

  return (
    <section id="projects" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Featured Projects</span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded"></div>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Explore a selection of my professional work. Each project combines cutting-edge technology with thoughtful design.
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-b-2 border-cyan-400/20 animate-spin"></div>
              <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin" style={{ animationDuration: '1.5s' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse"></span>
              </div>
            </div>
          </div>
        ) : isError ? (
          <div className="text-center py-16 bg-gray-900/50 rounded-lg border border-gray-800">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-300 mb-2 text-lg">Unable to load projects</p>
            <p className="text-gray-400 mb-4">There was an error connecting to the server.</p>
            <Button className="bg-gray-800 hover:bg-gray-700 text-gray-200">Try Again</Button>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 bg-gray-900/50 rounded-lg border border-gray-800">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 mb-4">
              <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-gray-300 mb-2 text-lg">No projects available yet</p>
            <p className="text-gray-400 mb-4">Projects will be added soon. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                className="project-card group overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="relative h-52 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-2 right-2 bg-cyan-400 text-gray-900 px-3 py-1 rounded-md font-medium text-sm z-20">
                    {project.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/90 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="flex space-x-4">
                      <a 
                        href={project.liveLink} 
                        className="bg-cyan-400 text-gray-900 p-3 rounded-full transform hover:scale-110 transition-transform shadow-lg hover:shadow-cyan-400/30" 
                        aria-label="View Project"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt size={16} />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Link href={`/project/${project.id}`}>
                      <h3 className="text-xl font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer">{project.title}</h3>
                    </Link>
                    <div className="bg-cyan-400/10 text-cyan-400 px-3 py-1 rounded-full flex items-center text-sm font-medium border border-cyan-500/20">
                      <FaDollarSign className="mr-1" />
                      <span>{project.price}</span>
                    </div>
                  </div>
                  
                  <Link href={`/project/${project.id}`}>
                    <p className="text-gray-400 mb-5 line-clamp-3 hover:text-gray-300 transition-colors cursor-pointer">
                      {project.description}
                    </p>
                  </Link>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap text-sm gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-gray-800 px-2 py-1 rounded-md text-gray-300 text-xs">{tech}</span>
                    ))}
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap text-xs gap-2 mb-5 text-gray-400">
                    {project.tags && project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="flex items-center">
                        <FaTag className="mr-1 text-cyan-500/70" />
                        {tag}
                        {tagIndex < project.tags.length - 1 && <span className="mx-1">•</span>}
                      </span>
                    ))}
                  </div>
                  
                  {/* Project Links and Interest Button */}
                  <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-gray-700">
                    <a 
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300"
                    >
                      <FaExternalLinkAlt className="mr-2" />
                      View Live Project
                    </a>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-cyan-500/30"
                        onClick={() => handleInterestClick(project)}
                      >
                        <span className="mr-2">I'm Interested</span>
                        <span className="text-cyan-400">→</span>
                      </Button>
                      
                      <Link href={`/project/${project.id}`}>
                        <Button 
                          className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-cyan-500/30 hover:text-cyan-400 min-w-[120px]"
                        >
                          <span>Read More</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Interest Dialog */}
        <Dialog open={isInterestDialogOpen} onOpenChange={setIsInterestDialogOpen}>
          <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-800 text-white shadow-xl shadow-cyan-500/5">
            <DialogHeader>
              <DialogTitle className="text-xl text-white flex items-center">
                <span className="bg-cyan-400/10 text-cyan-400 p-2 rounded-md mr-3">
                  <FaFolder className="h-5 w-5" />
                </span>
                {selectedProject ? 
                  <>Interest in <span className="text-cyan-400">{selectedProject.title}</span></> 
                  : "Project Interest"
                }
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Fill out the form below to express your interest in this project. I'll get back to you as soon as possible.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formState.name} 
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                  className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formState.email} 
                  onChange={handleInputChange}
                  placeholder="Your email address"
                  required
                  className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">Phone (Optional)</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={formState.phone} 
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-300">Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formState.message} 
                  onChange={handleInputChange}
                  placeholder="Tell me more about your interest in this project"
                  rows={4}
                  required
                  className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/10 resize-none"
                />
              </div>
              
              <div className="p-3 bg-gray-800/50 border border-gray-700 rounded-md my-4">
                <div className="flex items-center">
                  <div className="bg-cyan-400/10 p-2 rounded-md mr-3">
                    <FaDollarSign className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 font-medium">Payment Method</p>
                    <p className="text-xs text-gray-400">USDT TRC20 only</p>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/10"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : "Submit Interest"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        <div className="text-center mt-16">
          <motion.div
            className="inline-block" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button 
              className="relative overflow-hidden border border-cyan-500 bg-transparent text-cyan-400 hover:text-white px-6 py-6 rounded-md font-medium group" 
              asChild
            >
              <a href="#projects">
                <span className="relative z-10">View All Projects</span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
