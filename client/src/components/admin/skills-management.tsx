import { useQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { apiRequest, queryClient } from "@/lib/queryClient";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, Edit } from "lucide-react";

// Form validation schema
const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  percentage: z.string().min(1, "Percentage is required").max(3, "Maximum 3 characters allowed"),
  category: z.string().min(1, "Category is required"),
});

type SkillFormValues = z.infer<typeof skillSchema>;

type Skill = {
  id: number;
  name: string;
  percentage: string;
  category: string;
  order: string;
};

export function SkillsManagement() {
  const { toast } = useToast();
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
  
  // Fetch all skills
  const { data, isLoading } = useQuery({
    queryKey: ['/api/skills'],
    queryFn: async () => {
      const response = await fetch('/api/skills');
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to fetch skills");
      }
      return result;
    }
  });
  
  // Extract skills from response
  const skills = data?.data as Skill[] || [];
  
  // Group skills by category
  const skillsByCategory = skills.length > 0 ? skills.reduce((acc: Record<string, Skill[]>, skill: Skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>) : {};
  
  // Setup form for creating/updating skills
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      percentage: "",
      category: "",
    },
  });
  
  // Reset form when editing skill changes
  useEffect(() => {
    if (editingSkill) {
      form.reset({
        name: editingSkill.name,
        percentage: editingSkill.percentage,
        category: editingSkill.category,
      });
    }
  }, [editingSkill, form]);
  
  // Create skill mutation
  const createSkillMutation = useMutation({
    mutationFn: async (data: SkillFormValues) => {
      // Add order field to the request
      const skillData = {
        ...data,
        order: "0" // Default order, can be adjusted as needed
      };
      return await apiRequest('/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skillData),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Skill created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/skills'] });
      form.reset({ name: "", percentage: "", category: "" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create skill",
        variant: "destructive",
      });
    },
  });
  
  // Update skill mutation
  const updateSkillMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: SkillFormValues }) => {
      // Add order field to the request
      const skillData = {
        ...data,
        order: "0" // Default order, can be adjusted as needed
      };
      return await apiRequest(`/api/skills/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skillData),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Skill updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/skills'] });
      setEditingSkill(null);
      form.reset({ name: "", percentage: "", category: "" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update skill",
        variant: "destructive",
      });
    },
  });
  
  // Delete skill mutation
  const deleteSkillMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest<void>(`/api/skills/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Skill deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/skills'] });
      setSkillToDelete(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete skill",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: SkillFormValues) => {
    if (editingSkill) {
      updateSkillMutation.mutate({ id: editingSkill.id, data });
    } else {
      createSkillMutation.mutate(data);
    }
  };
  
  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
  };
  
  const handleCancelEdit = () => {
    setEditingSkill(null);
    form.reset({ name: "", percentage: "", category: "" });
  };
  
  const handleDelete = (skill: Skill) => {
    setSkillToDelete(skill);
  };
  
  const confirmDelete = () => {
    if (skillToDelete) {
      deleteSkillMutation.mutate(skillToDelete.id);
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Skills Management</h2>
          <p className="text-sm text-gray-500">
            Manage your professional skills and expertise
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</CardTitle>
              <CardDescription>
                {editingSkill 
                  ? "Update existing skill information" 
                  : "Add a new skill to your profile"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skill Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., JavaScript, React, UI Design" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="percentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proficiency (%)</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="e.g., 85" 
                            type="number" 
                            min="0" 
                            max="100" 
                          />
                        </FormControl>
                        <FormDescription>
                          Your skill level as a percentage (0-100)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="primary">Primary Skills</SelectItem>
                            <SelectItem value="secondary">Secondary Skills</SelectItem>
                            <SelectItem value="tools">Tools & Software</SelectItem>
                            <SelectItem value="soft">Soft Skills</SelectItem>
                            <SelectItem value="languages">Languages</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Group your skills by category
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex space-x-2">
                    <Button 
                      type="submit" 
                      className="flex-1"
                      disabled={createSkillMutation.isPending || updateSkillMutation.isPending}
                    >
                      {createSkillMutation.isPending || updateSkillMutation.isPending 
                        ? "Saving..." 
                        : editingSkill ? "Update Skill" : "Add Skill"}
                    </Button>
                    
                    {editingSkill && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Your Skills</CardTitle>
              <CardDescription>
                View and manage your professional skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : skills.length > 0 ? (
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-6">
                    {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                      <div key={category} className="space-y-2">
                        <h3 className="font-semibold text-lg capitalize">
                          {category === 'primary' ? 'Primary Skills' :
                           category === 'secondary' ? 'Secondary Skills' :
                           category === 'tools' ? 'Tools & Software' :
                           category === 'soft' ? 'Soft Skills' :
                           category === 'languages' ? 'Languages' : category}
                        </h3>
                        <Separator />
                        <div className="space-y-2 mt-2">
                          {categorySkills.map((skill) => (
                            <div 
                              key={skill.id} 
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                            >
                              <div className="flex-1">
                                <p className="font-medium">{skill.name}</p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                                  <div 
                                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full" 
                                    style={{ width: `${skill.percentage}%` }}
                                  ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{skill.percentage}%</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleEdit(skill)}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleDelete(skill)}
                                >
                                  <Trash2 size={16} className="text-red-500" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No skills found</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Add your first skill using the form on the left
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={Boolean(skillToDelete)} onOpenChange={(open) => !open && setSkillToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the skill "{skillToDelete?.name}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              {deleteSkillMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}