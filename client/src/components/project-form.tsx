import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the project form schema
const projectFormSchema = z.object({
  title: z.string().min(3, { message: "Project title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  image: z.string().url({ message: "Please enter a valid image URL" }),
  technologies: z.string().min(3, { message: "Please enter at least one technology" }), // We'll split this into an array
  tags: z.string().min(3, { message: "Please enter at least one tag" }), // We'll split this into an array
  category: z.string().min(2, { message: "Please enter a category" }),
  price: z.string().min(1, { message: "Please enter the project price" }),
  liveLink: z.string().url({ message: "Please enter a valid project URL" }),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  onSuccess?: () => void;
  initialData?: {
    id?: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    tags: string[];
    category: string;
    price: string;
    liveLink: string;
  };
}

export function ProjectForm({ onSuccess, initialData }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Set default values from initial data or empty strings
  const defaultValues: ProjectFormValues = initialData 
    ? {
        title: initialData.title,
        description: initialData.description,
        image: initialData.image,
        technologies: initialData.technologies.join(", "),
        tags: initialData.tags.join(", "),
        category: initialData.category,
        price: initialData.price,
        liveLink: initialData.liveLink,
      }
    : {
        title: "",
        description: "",
        image: "",
        technologies: "",
        tags: "",
        category: "",
        price: "",
        liveLink: "",
      };

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Convert comma-separated technologies to array
      const technologiesArray = data.technologies
        .split(",")
        .map(tech => tech.trim())
        .filter(tech => tech !== "");
      
      const projectData = {
        title: data.title,
        description: data.description,
        image: data.image,
        technologies: technologiesArray,
        githubLink: data.githubLink,
        liveLink: data.liveLink,
      };
      
      if (initialData?.id) {
        // Update existing project
        await apiRequest({
          url: `/api/projects/${initialData.id}`,
          method: "PUT",
          body: JSON.stringify(projectData)
        });
        toast({
          title: "Project Updated",
          description: "Your project has been updated successfully",
        });
      } else {
        // Create new project
        await apiRequest({
          url: "/api/projects",
          method: "POST",
          body: JSON.stringify(projectData)
        });
        toast({
          title: "Project Added",
          description: "Your project has been added successfully",
        });
        form.reset(); // Clear form after successful submission
      }
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting project:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="My Awesome Project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your project in detail..." 
                  rows={4}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Image URL</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://example.com/my-project-image.jpg" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies Used</FormLabel>
              <FormControl>
                <Input 
                  placeholder="React, Node.js, TypeScript (comma separated)" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="githubLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Repository URL</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://github.com/yourusername/project-repo" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="liveLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live Project URL</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://myproject.com" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-[#172A45] hover:bg-[#203a61] text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {initialData?.id ? "Updating..." : "Adding..."}
            </>
          ) : (
            initialData?.id ? "Update Project" : "Add Project"
          )}
        </Button>
      </form>
    </Form>
  );
}