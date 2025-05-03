import { useQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { apiRequest, queryClient } from "@/lib/queryClient";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

// Form validation schema
const websiteInfoSchema = z.object({
  section: z.string().min(1, "Section is required"),
  key: z.string().min(1, "Key is required"),
  value: z.string().min(1, "Value is required"),
});

type WebsiteInfoFormValues = z.infer<typeof websiteInfoSchema>;

type WebsiteInfo = {
  id: number;
  section: string;
  key: string;
  value: string;
  updatedAt: string;
};

export function WebsiteInfoManagement() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<string>("hero");
  
  const sections = [
    { id: "hero", label: "Hero Section" },
    { id: "about", label: "About Section" },
    { id: "contact", label: "Contact Info" },
    { id: "resume", label: "Resume" },
    { id: "custom", label: "Custom Fields" }
  ];
  
  // Fetch website info data for the active section
  const { data: websiteInfo, isLoading } = useQuery({
    queryKey: ['/api/website-info', activeSection],
    queryFn: async () => {
      const response = await fetch(`/api/website-info/${activeSection}`);
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch website information");
      }
      return data.data as WebsiteInfo[];
    }
  });
  
  // Setup form for updating website info
  const form = useForm<WebsiteInfoFormValues>({
    resolver: zodResolver(websiteInfoSchema),
    defaultValues: {
      section: activeSection,
      key: "",
      value: "",
    },
  });
  
  // Update form section value when active section changes
  React.useEffect(() => {
    form.setValue("section", activeSection);
  }, [activeSection, form]);
  
  // Setup mutation for updating website info
  const updateWebsiteInfoMutation = useMutation({
    mutationFn: async (data: WebsiteInfoFormValues) => {
      return await apiRequest<WebsiteInfo>('/api/website-info', {
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
        description: "Website information updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/website-info'] });
      queryClient.invalidateQueries({ queryKey: ['/api/website-info', activeSection] });
      form.reset({ section: activeSection, key: "", value: "" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update website information",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: WebsiteInfoFormValues) => {
    updateWebsiteInfoMutation.mutate(data);
  };
  
  // Function to edit an existing website info entry
  const handleEdit = (info: WebsiteInfo) => {
    form.reset({
      section: info.section,
      key: info.key,
      value: info.value,
    });
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Website Content Management</h2>
          <p className="text-sm text-gray-500">
            Manage the content displayed on your website
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Content Sections</CardTitle>
              <CardDescription>
                Select a section of your website to edit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "outline"}
                    className="justify-start text-left"
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Add/Edit Content</CardTitle>
              <CardDescription>
                Create or update website content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                        <FormDescription>
                          The website section this content belongs to
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="key"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content Key</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., title, description, etc." />
                        </FormControl>
                        <FormDescription>
                          A unique identifier for this content piece
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content Value</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Enter the content..." 
                            className="min-h-[100px]" 
                          />
                        </FormControl>
                        <FormDescription>
                          The actual content to display
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={updateWebsiteInfoMutation.isPending}
                  >
                    {updateWebsiteInfoMutation.isPending ? "Saving..." : "Save Content"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Current Content for {sections.find(s => s.id === activeSection)?.label}</CardTitle>
              <CardDescription>
                View and manage existing content
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : websiteInfo && websiteInfo.length > 0 ? (
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {websiteInfo.map((info) => (
                      <Card key={`${info.section}-${info.key}`} className="overflow-hidden">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{info.key}</CardTitle>
                              <CardDescription className="text-xs">
                                Last updated: {new Date(info.updatedAt).toLocaleString()}
                              </CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(info)}>
                              Edit
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="whitespace-pre-wrap text-sm overflow-hidden text-gray-700">
                            {info.value}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No content found for this section</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Add content using the form on the left
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}