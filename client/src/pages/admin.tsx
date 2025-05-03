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
    <div className="min-h-screen bg-gray-50 overflow-x-hidden pb-12">
      <div className="container mx-auto px-4 py-8 pt-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent">Admin Dashboard</h1>
            <p className="text-gray-500">Complete control over your portfolio website</p>
          </div>
        </div>
        
        <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-7 md:w-auto w-full sticky top-0 z-10 bg-white shadow-sm">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <InfoIcon className="h-4 w-4" />
              <span className="hidden md:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Folders className="h-4 w-4" />
              <span className="hidden md:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Blog</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              <span className="hidden md:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden md:inline">Social</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden md:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="telegram" className="flex items-center gap-2">
              <MessageSquareShare className="h-4 w-4" />
              <span className="hidden md:inline">Telegram</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <WebsiteInfoManagement />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <ProjectManagement />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="blog" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <BlogManagement />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <SkillsManagement />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="social" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <SocialLinksManagement />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <ContactMessagesManagement />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="telegram" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Telegram Integration Testing</h2>
                <p className="mb-4 text-gray-600">
                  Use this tool to test if Telegram notifications are working correctly. 
                  The test button will send a message to your configured Telegram chat.
                </p>
                <TelegramTest />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}