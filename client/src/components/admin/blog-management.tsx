import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Edit, Trash2 } from "lucide-react";

// Blog post form validation schema
const blogPostFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").optional(),
  content: z.string().min(10, "Content must be at least 10 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  coverImage: z.string().url("Must be a valid URL"),
  tags: z.string().min(1, "At least one tag is required"),
  published: z.boolean().default(false),
});

type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;

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

export function BlogManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Fetch all blog posts
  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ['/api/blog'],
    refetchOnWindowFocus: false,
  });

  // Form initialization
  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      coverImage: "",
      tags: "",
      published: false,
    },
  });

  // Create blog post mutation
  const createMutation = useMutation({
    mutationFn: async (data: BlogPostFormValues) => {
      // Convert tags string to array if needed
      const formattedData = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()),
        published: data.published ? "true" : "false"
      };
      
      return apiRequest('/api/blog', {
        method: 'POST', 
        body: JSON.stringify(formattedData)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      setIsFormOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to create blog post: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Update blog post mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: BlogPostFormValues }) => {
      // Convert tags string to array if needed
      const formattedData = {
        ...data,
        tags: typeof data.tags === 'string' ? data.tags.split(',').map(tag => tag.trim()) : data.tags,
        published: data.published ? "true" : "false"
      };
      
      return apiRequest(`/api/blog/${id}`, {
        method: 'PUT', 
        body: JSON.stringify(formattedData)
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      setIsFormOpen(false);
      setEditingPost(null);
      form.reset();
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to update blog post: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Delete blog post mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/blog/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to delete blog post: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  const onSubmit = (data: BlogPostFormValues) => {
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  // Edit blog post handler
  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    
    // Convert tags array to comma-separated string for the form
    const formattedTags = Array.isArray(post.tags) ? post.tags.join(", ") : post.tags;
    
    form.reset({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      tags: formattedTags,
      published: post.published === "true",
    });
    
    setIsFormOpen(true);
  };

  // Delete blog post handler
  const handleDelete = (post: BlogPost) => {
    if (window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
      deleteMutation.mutate(post.id);
    }
  };

  // Reset form and close dialog
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPost(null);
    form.reset();
  };

  // Handle "Add New" button click
  const handleAddNew = () => {
    setEditingPost(null);
    form.reset({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      coverImage: "",
      tags: "",
      published: false,
    });
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog Posts</h2>
          <p className="text-muted-foreground">
            Manage your blog posts to share your thoughts and expertise
          </p>
        </div>
        <Button onClick={handleAddNew}>Add New Post</Button>
      </div>

      <Separator className="my-4" />

      {/* Blog post list */}
      {isLoading ? (
        <p>Loading blog posts...</p>
      ) : blogPosts?.data?.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center">
            <p className="text-muted-foreground">No blog posts yet. Create your first post!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {blogPosts?.data?.map((post: BlogPost) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription className="mt-1 text-sm">
                      <span className="block">Slug: {post.slug}</span>
                      <span className="block mt-1">
                        {new Date(post.createdAt).toLocaleDateString()}
                        {post.updatedAt !== post.createdAt && 
                          ` (Updated: ${new Date(post.updatedAt).toLocaleDateString()})`}
                      </span>
                    </CardDescription>
                  </div>
                  <div>
                    {post.published === "true" ? (
                      <Badge className="ml-2 bg-green-600">Published</Badge>
                    ) : (
                      <Badge className="ml-2 bg-amber-600">Draft</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags?.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(post)}
                >
                  <Edit className="mr-1 h-4 w-4" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(post)}
                >
                  <Trash2 className="mr-1 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Blog post form dialog */}
      <Dialog open={isFormOpen} onOpenChange={(open) => !open && handleCloseForm()}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-4">
          <DialogHeader className="sticky top-0 bg-white z-10 pb-4">
            <DialogTitle>
              {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
            </DialogTitle>
            <DialogDescription>
              {editingPost
                ? "Update your blog post details below"
                : "Fill in the details for your new blog post"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="overflow-y-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter post title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter URL-friendly slug (e.g. my-blog-post)" 
                          {...field} 
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>
                        Leave blank to auto-generate from title. Use lowercase letters, numbers, and hyphens only.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief summary of the post" 
                          className="resize-none"
                          rows={3}
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        A short summary that appears in post listings.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Post content" 
                          className="resize-none"
                          rows={10}
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        The main content of your blog post. You can use markdown for formatting.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter a URL for the post's cover image.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="blockchain, development, web3" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter tags separated by commas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Published</FormLabel>
                        <FormDescription>
                          Published posts are visible to the public. Unchecked means draft status.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={handleCloseForm}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {createMutation.isPending || updateMutation.isPending 
                      ? "Saving..." 
                      : editingPost ? "Update Post" : "Create Post"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}