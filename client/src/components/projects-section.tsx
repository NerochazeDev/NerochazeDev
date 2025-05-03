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
      await apiRequest("POST", "/api/project-interest", {
        ...formState,
        projectId: selectedProject.id
      } as any);
      
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
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold mb-6 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#64FFDA] font-mono mr-2">03.</span>
          Projects
          <span className="ml-4 h-px bg-gray-300 flex-grow"></span>
        </motion.h2>
        
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-10 w-10 animate-spin text-[#64FFDA]" />
          </div>
        ) : isError ? (
          <div className="text-center py-10">
            <p className="text-[#6c757d] mb-4">There was an error loading the projects.</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-[#6c757d] mb-4">No projects have been added yet.</p>
            <Link to="/admin" className="text-[#64FFDA] hover:underline">Add your first project</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                className="project-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="relative h-48">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-[#64FFDA] px-3 py-1 text-[#172A45] font-medium">
                    {project.category}
                  </div>
                  <div className="absolute inset-0 bg-[#172A45] bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="flex space-x-4">
                      <a 
                        href={project.liveLink} 
                        className="bg-white text-[#172A45] p-2 rounded-full" 
                        aria-label="View Project"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <div className="text-[#64FFDA] flex items-center">
                      <FaDollarSign className="mr-1" />
                      <span className="text-[#172A45] font-bold">{project.price}</span>
                    </div>
                  </div>
                  <p className="text-[#6c757d] mb-4">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap text-sm gap-2 mb-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-gray-100 px-2 py-1 rounded text-[#172A45]">{tech}</span>
                    ))}
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap text-xs gap-1 mb-4">
                    {project.tags && project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="flex items-center text-[#6c757d]">
                        <FaTag className="mr-1 text-xs" />
                        {tag}
                        {tagIndex < project.tags.length - 1 && <span className="mx-1">•</span>}
                      </span>
                    ))}
                  </div>
                  
                  {/* I'm Interested Button */}
                  <Button 
                    className="w-full bg-[#172A45] hover:bg-[#203a61] text-white"
                    onClick={() => handleInterestClick(project)}
                  >
                    I'm Interested
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Interest Dialog */}
        <Dialog open={isInterestDialogOpen} onOpenChange={setIsInterestDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {selectedProject ? `I'm Interested in "${selectedProject.title}"` : "Project Interest"}
              </DialogTitle>
              <DialogDescription>
                Fill out the form below to express your interest in this project. I'll get back to you as soon as possible.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formState.name} 
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formState.email} 
                  onChange={handleInputChange}
                  placeholder="Your email address"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={formState.phone} 
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formState.message} 
                  onChange={handleInputChange}
                  placeholder="Tell me more about your interest in this project"
                  rows={4}
                  required
                />
              </div>
              
              <div className="text-sm text-gray-500 my-2">
                <p>Payment Method: USDT TRC20 only</p>
              </div>
              
              <DialogFooter>
                <Button 
                  type="submit" 
                  className="bg-[#64FFDA] hover:bg-[#53d6b6] text-[#172A45]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Interest"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        <div className="text-center mt-12">
          <motion.div
            className="inline-block" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button 
              className="border-2 border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#172A45] px-6 py-3 rounded font-medium transition-colors bg-transparent" 
              asChild
            >
              <Link to="/admin">
                See More Projects
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
