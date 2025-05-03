import { useState } from "react";
import { ProjectManagement } from "@/components/admin/project-management";
import { WebsiteInfoManagement } from "@/components/admin/website-info-management";
import { SkillsManagement } from "@/components/admin/skills-management";
import { SocialLinksManagement } from "@/components/admin/social-links-management";
import { ContactMessagesManagement } from "@/components/admin/contact-messages";
import { BlogManagement } from "@/components/admin/blog-management";
import { TelegramTest } from "@/components/telegram-test";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Folders, InfoIcon, BookOpen, ListChecks, Share2, Mail, MessageSquareShare, FileText } from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("content");
  
  return (
    <div className="min-h-screen bg-gray-950 overflow-x-hidden pb-12 text-white">
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-gradient">Admin Dashboard</h1>
            <p className="text-gray-400">Complete control over your portfolio website</p>
          </div>
          <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-gray-300 text-sm">Secure Access</span>
          </div>
        </div>
        
        <div className="p-4 mb-8 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
          <div className="flex items-start">
            <div className="p-2 bg-cyan-500/20 rounded mr-3 mt-1">
              <InfoIcon className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-1">Admin Area</h3>
              <p className="text-gray-300 text-sm">
                This is your secure admin dashboard. All changes are automatically saved to the database and will be reflected live on your website.
              </p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-7 md:w-auto w-full sticky top-0 z-10 bg-gray-900/80 backdrop-blur-sm shadow-lg border border-gray-700 rounded-lg p-1">
            <TabsTrigger value="content" className="flex items-center gap-2 data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
              <InfoIcon className="h-4 w-4" />
              <span className="hidden md:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2 data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
              <Folders className="h-4 w-4" />
              <span className="hidden md:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2 data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Blog</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2 data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
              <ListChecks className="h-4 w-4" />
              <span className="hidden md:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2 data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
              <Share2 className="h-4 w-4" />
              <span className="hidden md:inline">Social</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2 data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
              <Mail className="h-4 w-4" />
              <span className="hidden md:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="telegram" className="flex items-center gap-2 data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
              <MessageSquareShare className="h-4 w-4" />
              <span className="hidden md:inline">Telegram</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                <WebsiteInfoManagement />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                <ProjectManagement />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="blog" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                <BlogManagement />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                <SkillsManagement />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="social" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                <SocialLinksManagement />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                <ContactMessagesManagement />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="telegram" className="space-y-4">
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
      </div>
    </div>
  );
}