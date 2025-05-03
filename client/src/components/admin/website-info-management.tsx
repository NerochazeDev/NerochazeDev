import { useQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useState, useEffect } from "react";
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
      // Return default content if no data is found
      if (!data.data || data.data.length === 0) {
        switch (activeSection) {
          case 'hero':
            return [
              { section: 'hero', key: 'title', value: 'Nerochaze' },
              { section: 'hero', key: 'subtitle', value: 'Full Stack Developer & Blockchain Specialist' },
              { section: 'hero', key: 'introduction', value: 'Experienced developer specializing in cutting-edge web applications' }
            ];
          case 'about':
            return [
              { section: 'about', key: 'professional_summary', value: 'Highly skilled full-stack developer with expertise in modern web technologies' },
              { section: 'about', key: 'expertise', value: 'Blockchain Development, Full-Stack Web Applications' },
              { section: 'about', key: 'experience', value: '5+ years of professional development experience' }
            ];
          case 'contact':
            return [
              { section: 'contact', key: 'email', value: 'contact@example.com' },
              { section: 'contact', key: 'phone', value: '+1 (555) 123-4567' },
              { section: 'contact', key: 'intro_text', value: 'Get in touch for collaboration opportunities' }
            ];
          default:
            return [];
        }
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
  useEffect(() => {
    form.setValue("section", activeSection);
  }, [activeSection, form]);
  
  // Setup mutation for updating website info
  const updateWebsiteInfoMutation = useMutation({
    mutationFn: async (data: WebsiteInfoFormValues) => {
      return await apiRequest('/api/website-info', {
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
      // Invalidate all website info queries to ensure data is refreshed everywhere
      queryClient.invalidateQueries({ queryKey: ['/api/website-info'] });
      queryClient.invalidateQueries({ queryKey: ['/api/website-info', activeSection] });
      
      // Force refetch to ensure the latest data is displayed
      queryClient.refetchQueries({ queryKey: ['/api/website-info'] });
      queryClient.refetchQueries({ queryKey: ['/api/website-info', activeSection] });
      
      form.reset({ section: activeSection, key: "", value: "" });
      
      // Log success for debugging
      console.log("Content saved successfully and queries invalidated");
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
    
    // Scroll form into view
    const formElement = document.querySelector('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
    
    toast({
      title: "Editing Content",
      description: `Now editing "${info.key}" from ${info.section} section`,
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
          <Card className="bg-gray-900 border-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                Content Sections
              </CardTitle>
              <CardDescription className="text-gray-400">
                Select a section of your website to edit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "outline"}
                    className={`justify-start text-left ${
                      activeSection === section.id 
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                        : "bg-gray-800 text-gray-300 border border-gray-700 hover:border-cyan-500/50 hover:text-cyan-400"
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6 bg-gray-900 border-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                Add/Edit Content
              </CardTitle>
              <CardDescription className="text-gray-400">
                Create or update website content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Section</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            readOnly 
                            className="bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500/10"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          The website section this content belongs to
                        </FormDescription>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="key"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Content Key</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="e.g., title, description, etc." 
                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/10"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          A unique identifier for this content piece
                        </FormDescription>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Content Value</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Enter the content..." 
                            className="min-h-[120px] bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/10 resize-none" 
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          The actual content to display
                        </FormDescription>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                    disabled={updateWebsiteInfoMutation.isPending}
                  >
                    {updateWebsiteInfoMutation.isPending ? (
                      <div className="flex items-center justify-center">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>Saving...</span>
                      </div>
                    ) : "Save Content"}
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
            <CardContent className="bg-gray-900 border-gray-800 text-gray-200">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full bg-gray-800" />
                  <Skeleton className="h-12 w-full bg-gray-800" />
                  <Skeleton className="h-12 w-full bg-gray-800" />
                </div>
              ) : websiteInfo && websiteInfo.length > 0 ? (
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {websiteInfo.map((info) => (
                      <Card key={`${info.section}-${info.key}`} className="overflow-hidden bg-gray-800 border border-gray-700 shadow-lg">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg text-cyan-400">{info.key}</CardTitle>
                              <CardDescription className="text-xs text-gray-400">
                                Last updated: {new Date(info.updatedAt).toLocaleString()}
                              </CardDescription>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEdit(info)}
                              className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-700"
                            >
                              Edit
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="whitespace-pre-wrap text-sm overflow-hidden text-gray-300 bg-gray-700/30 p-3 rounded-md border border-gray-700">
                            {info.value}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="p-12 bg-gray-800/50 rounded-lg border border-gray-700 text-center flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 border border-gray-700">
                    <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-lg font-medium">No content found</h3>
                  <p className="text-gray-400 max-w-md">
                    No content has been added to the {sections.find(s => s.id === activeSection)?.label} yet.
                    Use the form on the left to add your first content item.
                  </p>
                  <div className="mt-4">
                    <div className="inline-flex items-center text-sm bg-gray-700/50 px-3 py-1 rounded-full text-cyan-400 border border-cyan-500/20">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Start by adding a key-value pair</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}