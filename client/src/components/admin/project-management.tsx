import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProjectForm } from "../project-form";
import { Pencil, Trash2, Plus, X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

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

export function ProjectManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all projects
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ['/api/projects'],
    select: (data: any) => data.data as Project[]
  });

  // Delete project mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest({
        url: `/api/projects/${id}`,
        method: "DELETE"
      });
    },
    onSuccess: () => {
      toast({
        title: "Project Deleted",
        description: "The project has been successfully removed",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setDeleteProjectId(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete the project. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Handle form success (add/edit)
  const handleFormSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
    setIsAddDialogOpen(false);
    setEditProject(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-[#172A45] hover:bg-[#203a61] flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Project
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-10 w-10 animate-spin text-[#64FFDA]" />
        </div>
      ) : isError ? (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-500">Failed to load projects. Please try again.</p>
        </div>
      ) : !projects || projects.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-gray-300 rounded-md">
          <p className="text-gray-500 mb-4">No projects have been added yet.</p>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            variant="outline"
          >
            Add Your First Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => setEditProject(project)}
                      className="h-8 w-8 bg-white/80 hover:bg-white"
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => setDeleteProjectId(project.id)}
                      className="h-8 w-8 bg-white/80 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                      <div>
                        <span className="font-semibold block">Category:</span>
                        <span className="text-gray-600">{project.category || "N/A"}</span>
                      </div>
                      <div>
                        <span className="font-semibold block">Price:</span>
                        <span className="text-gray-600">{project.price || "N/A"}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#172A45] hover:underline text-xs"
                        >
                          View Live Project
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Project Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] p-4 overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-white z-10 pb-4">
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new project to your portfolio.
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto">
            <ProjectForm onSuccess={handleFormSuccess} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog 
        open={!!editProject} 
        onOpenChange={(open) => !open && setEditProject(null)}
      >
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] p-4 overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-white z-10 pb-4">
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Update your project information.
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto">
            {editProject && (
              <ProjectForm 
                initialData={editProject} 
                onSuccess={handleFormSuccess} 
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog 
        open={deleteProjectId !== null}
        onOpenChange={(open) => !open && setDeleteProjectId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this project from your portfolio.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteProjectId && deleteMutation.mutate(deleteProjectId)}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Project"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}