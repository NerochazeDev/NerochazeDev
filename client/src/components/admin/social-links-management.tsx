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
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

import { 
  FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaDribbble, 
  FaBehance, FaMedium, FaYoutube, FaFacebook, FaCodepen, 
  FaStackOverflow 
} from "react-icons/fa";
import { Trash2, Edit } from "lucide-react";

// Form validation schema
const socialLinkSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Must be a valid URL").min(1, "URL is required"),
  isActive: z.string(),
});

type SocialLinkFormValues = z.infer<typeof socialLinkSchema>;

type SocialLink = {
  id: number;
  platform: string;
  url: string;
  order: string;
  isActive: string;
};

const platformIcons: Record<string, React.ReactNode> = {
  github: <FaGithub className="text-lg mr-2" />,
  linkedin: <FaLinkedin className="text-lg mr-2" />,
  twitter: <FaTwitter className="text-lg mr-2" />,
  instagram: <FaInstagram className="text-lg mr-2" />,
  dribbble: <FaDribbble className="text-lg mr-2" />,
  behance: <FaBehance className="text-lg mr-2" />,
  medium: <FaMedium className="text-lg mr-2" />,
  youtube: <FaYoutube className="text-lg mr-2" />,
  facebook: <FaFacebook className="text-lg mr-2" />,
  codepen: <FaCodepen className="text-lg mr-2" />,
  stackoverflow: <FaStackOverflow className="text-lg mr-2" />,
};

const platformOptions = [
  { value: "github", label: "GitHub" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter" },
  { value: "instagram", label: "Instagram" },
  { value: "dribbble", label: "Dribbble" },
  { value: "behance", label: "Behance" },
  { value: "medium", label: "Medium" },
  { value: "youtube", label: "YouTube" },
  { value: "facebook", label: "Facebook" },
  { value: "codepen", label: "CodePen" },
  { value: "stackoverflow", label: "Stack Overflow" },
];

export function SocialLinksManagement() {
  const { toast } = useToast();
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [linkToDelete, setLinkToDelete] = useState<SocialLink | null>(null);
  
  // Fetch all social links
  const { data: socialLinks, isLoading } = useQuery({
    queryKey: ['/api/social-links'],
    queryFn: async () => {
      const response = await fetch('/api/social-links');
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch social links");
      }
      return data.data as SocialLink[];
    }
  });
  
  // Setup form for creating/updating social links
  const form = useForm<SocialLinkFormValues>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      platform: "",
      url: "",
      isActive: "true",
    },
  });
  
  // Reset form when editing link changes
  useEffect(() => {
    if (editingLink) {
      form.reset({
        platform: editingLink.platform,
        url: editingLink.url,
        isActive: editingLink.isActive,
      });
    }
  }, [editingLink, form]);
  
  // Create social link mutation
  const createSocialLinkMutation = useMutation({
    mutationFn: async (data: SocialLinkFormValues) => {
      return await apiRequest<SocialLink>('/api/social-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Social link created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/social-links'] });
      form.reset({ platform: "", url: "", isActive: "true" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create social link",
        variant: "destructive",
      });
    },
  });
  
  // Update social link mutation
  const updateSocialLinkMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: SocialLinkFormValues }) => {
      return await apiRequest<SocialLink>(`/api/social-links/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Social link updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/social-links'] });
      setEditingLink(null);
      form.reset({ platform: "", url: "", isActive: "true" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update social link",
        variant: "destructive",
      });
    },
  });
  
  // Delete social link mutation
  const deleteSocialLinkMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest<void>(`/api/social-links/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Social link deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/social-links'] });
      setLinkToDelete(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete social link",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: SocialLinkFormValues) => {
    if (editingLink) {
      updateSocialLinkMutation.mutate({ id: editingLink.id, data });
    } else {
      createSocialLinkMutation.mutate(data);
    }
  };
  
  const handleEdit = (link: SocialLink) => {
    setEditingLink(link);
  };
  
  const handleCancelEdit = () => {
    setEditingLink(null);
    form.reset({ platform: "", url: "", isActive: "true" });
  };
  
  const handleDelete = (link: SocialLink) => {
    setLinkToDelete(link);
  };
  
  const confirmDelete = () => {
    if (linkToDelete) {
      deleteSocialLinkMutation.mutate(linkToDelete.id);
    }
  };
  
  // Get platform label
  const getPlatformLabel = (platformValue: string) => {
    const platform = platformOptions.find(p => p.value === platformValue);
    return platform ? platform.label : platformValue;
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Social Media Links</h2>
          <p className="text-sm text-gray-500">
            Manage your social media profiles and professional accounts
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{editingLink ? "Edit Social Link" : "Add New Social Link"}</CardTitle>
              <CardDescription>
                {editingLink 
                  ? "Update an existing social media link" 
                  : "Connect a new social media profile to your portfolio"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="platform"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {platformOptions.map(platform => (
                              <SelectItem key={platform.value} value={platform.value}>
                                <div className="flex items-center">
                                  {platformIcons[platform.value]}
                                  {platform.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://..." />
                        </FormControl>
                        <FormDescription>
                          Full URL to your profile on this platform
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Active</FormLabel>
                          <FormDescription>
                            Show this social link on your portfolio
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value === "true"}
                            onCheckedChange={(checked) => field.onChange(checked ? "true" : "false")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex space-x-2">
                    <Button 
                      type="submit" 
                      className="flex-1"
                      disabled={createSocialLinkMutation.isPending || updateSocialLinkMutation.isPending}
                    >
                      {createSocialLinkMutation.isPending || updateSocialLinkMutation.isPending 
                        ? "Saving..." 
                        : editingLink ? "Update Link" : "Add Link"}
                    </Button>
                    
                    {editingLink && (
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
        
        <div className="md:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Your Social Links</CardTitle>
              <CardDescription>
                View and manage your connected social profiles
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : socialLinks && socialLinks.length > 0 ? (
                <div className="space-y-3">
                  {socialLinks.map((link) => (
                    <div 
                      key={link.id} 
                      className={`flex items-center justify-between p-4 rounded-md border ${
                        link.isActive === "true" ? "bg-white" : "bg-gray-50 opacity-60"
                      }`}
                    >
                      <div className="flex items-center flex-1">
                        <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-md">
                          {platformIcons[link.platform] || (
                            <div className="w-6 h-6 bg-gray-300 rounded-full" />
                          )}
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium">{getPlatformLabel(link.platform)}</h4>
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-sm text-blue-500 hover:underline truncate max-w-xs block"
                          >
                            {link.url}
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {link.isActive === "true" ? (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                            Hidden
                          </span>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(link)}
                        >
                          <Edit size={16} />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(link)}
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No social links found</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Connect your first social media account using the form
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={Boolean(linkToDelete)} onOpenChange={(open) => !open && setLinkToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your {linkToDelete && getPlatformLabel(linkToDelete.platform)} link.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              {deleteSocialLinkMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}