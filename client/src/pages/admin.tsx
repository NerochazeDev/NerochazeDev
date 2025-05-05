import { useState, useEffect } from "react";
import { ProjectManagement } from "@/components/admin/project-management";
import { WebsiteInfoManagement } from "@/components/admin/website-info-management";
import { SkillsManagement } from "@/components/admin/skills-management";
import { SocialLinksManagement } from "@/components/admin/social-links-management";
import { ContactMessagesManagement } from "@/components/admin/contact-messages";
import { BlogManagement } from "@/components/admin/blog-management";
import DataSeeder from "@/components/admin/data-seeder";
import { TelegramTest } from "@/components/telegram-test";
import { useQuery } from "@tanstack/react-query";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Folders, 
  InfoIcon, 
  BookOpen, 
  ListChecks, 
  Share2, 
  Mail, 
  MessageSquareShare, 
  FileText,
  LayoutDashboard,
  BarChart3,
  Settings,
  User,
  Shield,
  Database
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Fetch data for dashboard overview
  const { data: projects } = useQuery({
    queryKey: ['/api/projects'],
    select: (data: any) => data.data
  });

  const { data: blogPosts } = useQuery({
    queryKey: ['/api/blog'],
    select: (data: any) => data.data
  });

  const { data: messages } = useQuery({
    queryKey: ['/api/contact-messages'],
    select: (data: any) => data.data
  });

  const { data: skills } = useQuery({
    queryKey: ['/api/skills'],
    select: (data: any) => data.data
  });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-950 overflow-x-hidden pb-12 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 h-screen bg-gray-900 border-r border-gray-800 fixed left-0 top-0">
          <div className="p-5 border-b border-gray-800">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Admin Portal</h1>
            <p className="text-xs text-gray-400 mt-1">Portfolio Management System</p>
          </div>
          
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">Administrator</p>
                <p className="text-xs text-gray-400">Full Access</p>
              </div>
            </div>
            
            <Separator className="my-4 bg-gray-800" />
          </div>
          
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === "dashboard" 
                    ? "bg-cyan-500/20 text-cyan-400" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </button>
              
              <button
                onClick={() => setActiveTab("content")}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === "content" 
                    ? "bg-cyan-500/20 text-cyan-400" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                }`}
              >
                <InfoIcon className="h-4 w-4" />
                <span>Website Content</span>
              </button>
              
              <button
                onClick={() => setActiveTab("projects")}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === "projects" 
                    ? "bg-cyan-500/20 text-cyan-400" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                }`}
              >
                <Folders className="h-4 w-4" />
                <span>Projects</span>
              </button>
              
              <button
                onClick={() => setActiveTab("blog")}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === "blog" 
                    ? "bg-cyan-500/20 text-cyan-400" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Blog Posts</span>
              </button>
              
              <button
                onClick={() => setActiveTab("skills")}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === "skills" 
                    ? "bg-cyan-500/20 text-cyan-400" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                }`}
              >
                <ListChecks className="h-4 w-4" />
                <span>Skills</span>
              </button>
              
              <button
                onClick={() => setActiveTab("social")}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === "social" 
                    ? "bg-cyan-500/20 text-cyan-400" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                }`}
              >
                <Share2 className="h-4 w-4" />
                <span>Social Links</span>
              </button>
              
              <button
                onClick={() => setActiveTab("messages")}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === "messages" 
                    ? "bg-cyan-500/20 text-cyan-400" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                }`}
              >
                <Mail className="h-4 w-4" />
                <span>Messages</span>
                {messages?.length > 0 && (
                  <Badge className="ml-auto bg-cyan-500 text-xs">{messages.length}</Badge>
                )}
              </button>
              
              <button
                onClick={() => setActiveTab("telegram")}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === "telegram" 
                    ? "bg-cyan-500/20 text-cyan-400" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                }`}
              >
                <MessageSquareShare className="h-4 w-4" />
                <span>Telegram</span>
              </button>

              <button
                onClick={() => setActiveTab("seeder")}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === "seeder" 
                    ? "bg-cyan-500/20 text-cyan-400" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                }`}
              >
                <Database className="h-4 w-4" />
                <span>Data Tools</span>
              </button>
            </div>
          </nav>
          
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-xs text-gray-400">Secured Access</span>
              </div>
              <Badge className="bg-green-500/20 text-green-400 text-xs border-green-600">Active</Badge>
            </div>
          </div>
        </div>
        
        {/* Mobile tabs - only visible on small screens */}
        <div className="md:hidden w-full sticky top-0 z-10 bg-gray-900 border-b border-gray-800">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-7 w-full bg-gray-950/80 backdrop-blur-sm shadow-lg p-1">
              <TabsTrigger value="dashboard" className="flex items-center px-1 data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
                <LayoutDashboard className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center px-1 data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
                <InfoIcon className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center px-1 data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
                <Folders className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="blog" className="flex items-center px-1 data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
                <FileText className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center px-1 data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
                <ListChecks className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center px-1 data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
                <Share2 className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center px-1 data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
                <Mail className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Main content */}
        <div className="w-full md:ml-64 p-6">
          {/* Page header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  {activeTab === "dashboard" && "Dashboard Overview"}
                  {activeTab === "content" && "Website Content"}
                  {activeTab === "projects" && "Project Management"}
                  {activeTab === "blog" && "Blog Management"}
                  {activeTab === "skills" && "Skills Management"}
                  {activeTab === "social" && "Social Links"}
                  {activeTab === "messages" && "Contact Messages"}
                  {activeTab === "telegram" && "Telegram Integration"}
                  {activeTab === "seeder" && "Data Management Tools"}
                </h1>
                <p className="text-gray-400 mt-1">{formatDate(currentTime)} • {formatTime(currentTime)}</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center gap-3">
                <Badge variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700 flex gap-2 px-3 py-1">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span>Secure Admin Session</span>
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Dashboard content */}
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">Total Projects</p>
                      <h3 className="text-2xl font-bold mt-1">{projects?.length || 0}</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Folders className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">Blog Posts</p>
                      <h3 className="text-2xl font-bold mt-1">{blogPosts?.length || 0}</h3>
                    </div>
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-cyan-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">Messages</p>
                      <h3 className="text-2xl font-bold mt-1">{messages?.length || 0}</h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">Skills</p>
                      <h3 className="text-2xl font-bold mt-1">{skills?.length || 0}</h3>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <ListChecks className="h-6 w-6 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Tab contents */}
          <Tabs value={activeTab} className="hidden"> {/* Hidden but needed for state */}
            <TabsContent value="content" className="space-y-4 mt-0">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-0">
                  <WebsiteInfoManagement />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="projects" className="space-y-4 mt-0">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-0">
                  <ProjectManagement />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="blog" className="space-y-4 mt-0">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-0">
                  <BlogManagement />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="skills" className="space-y-4 mt-0">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-0">
                  <SkillsManagement />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="social" className="space-y-4 mt-0">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-0">
                  <SocialLinksManagement />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="messages" className="space-y-4 mt-0">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-0">
                  <ContactMessagesManagement />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="telegram" className="space-y-4 mt-0">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-3 text-white flex items-center">
                      <span className="bg-cyan-500/20 p-2 rounded-md mr-3">
                        <MessageSquareShare className="h-5 w-5 text-cyan-400" />
                      </span>
                      Telegram Integration Testing
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded mb-4"></div>
                    <p className="mb-4 text-gray-400">
                      Use this tool to test if Telegram notifications are working correctly. 
                      The test button will send a message to your configured Telegram chat.
                    </p>
                  </div>
                  <TelegramTest />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Actually show content based on active tab */}
          {activeTab === "content" && (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                <WebsiteInfoManagement />
              </CardContent>
            </Card>
          )}
          
          {activeTab === "projects" && (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                <ProjectManagement />
              </CardContent>
            </Card>
          )}
          
          {activeTab === "blog" && (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                <BlogManagement />
              </CardContent>
            </Card>
          )}
          
          {activeTab === "skills" && (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                <SkillsManagement />
              </CardContent>
            </Card>
          )}
          
          {activeTab === "social" && (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                <SocialLinksManagement />
              </CardContent>
            </Card>
          )}
          
          {activeTab === "messages" && (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                <ContactMessagesManagement />
              </CardContent>
            </Card>
          )}
          
          {activeTab === "telegram" && (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-3 text-white flex items-center">
                    <span className="bg-cyan-500/20 p-2 rounded-md mr-3">
                      <MessageSquareShare className="h-5 w-5 text-cyan-400" />
                    </span>
                    Telegram Integration Testing
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded mb-4"></div>
                  <p className="mb-4 text-gray-400">
                    Use this tool to test if Telegram notifications are working correctly. 
                    The test button will send a message to your configured Telegram chat.
                  </p>
                </div>
                <TelegramTest />
              </CardContent>
            </Card>
          )}
          
          {activeTab === "seeder" && (
            <div className="space-y-6">
              <div className="p-4 mb-6 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                <div className="flex items-start">
                  <div className="p-2 bg-indigo-500/20 rounded mr-3 mt-1">
                    <Database className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Demo Data Tools</h3>
                    <p className="text-gray-300 text-sm">
                      Use these tools to quickly populate your portfolio website with professional demo content.
                      The tools will add 5 project templates (Tailor, Photographer, Hairdresser, Freelancer, Personal) and 6 blog posts.
                    </p>
                  </div>
                </div>
              </div>
              
              <DataSeeder />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}