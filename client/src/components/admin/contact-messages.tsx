import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Trash2, Mail, ExternalLink } from "lucide-react";

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export function ContactMessagesManagement() {
  const { toast } = useToast();
  const [messageToDelete, setMessageToDelete] = useState<ContactMessage | null>(null);
  const [expandedMessageId, setExpandedMessageId] = useState<number | null>(null);
  
  // Fetch all contact messages
  const { data: messages, isLoading } = useQuery({
    queryKey: ['/api/contact-messages'],
    queryFn: async () => {
      const response = await fetch('/api/contact-messages');
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch contact messages");
      }
      return data.data as ContactMessage[];
    }
  });
  
  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest<void>(`/api/contact-messages/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Message deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/contact-messages'] });
      setMessageToDelete(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete message",
        variant: "destructive",
      });
    },
  });
  
  const handleDelete = (message: ContactMessage) => {
    setMessageToDelete(message);
  };
  
  const confirmDelete = () => {
    if (messageToDelete) {
      deleteMessageMutation.mutate(messageToDelete.id);
    }
  };
  
  const handleMessageClick = (id: number) => {
    setExpandedMessageId(expandedMessageId === id ? null : id);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Contact Messages</h2>
          <p className="text-sm text-gray-500">
            Manage and respond to messages from your website visitors
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>
            All messages received through your contact form
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : messages && messages.length > 0 ? (
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card 
                    key={message.id} 
                    className={`overflow-hidden transition-all ${
                      expandedMessageId === message.id ? 'ring-2 ring-primary/20' : ''
                    }`}
                  >
                    <div 
                      className="p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleMessageClick(message.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{message.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {message.email}
                            </Badge>
                          </div>
                          <p className="font-medium mt-1">{message.subject}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(message.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`mailto:${message.email}?subject=Re: ${message.subject}`, '_blank');
                            }}
                          >
                            <Mail size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(message);
                            }}
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {expandedMessageId === message.id && (
                      <div className="px-4 pb-4">
                        <Separator className="my-2" />
                        <div className="whitespace-pre-wrap bg-gray-50 p-3 rounded-md text-sm max-h-60 overflow-auto">
                          {message.message}
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`mailto:${message.email}?subject=Re: ${message.subject}&body=Original message:\n\n${message.message}`, '_blank')}
                          >
                            <Mail size={16} className="mr-2" />
                            Reply via Email
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No messages found</p>
              <p className="text-sm text-gray-400 mt-2">
                Messages sent through your contact form will appear here
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={Boolean(messageToDelete)} onOpenChange={(open) => !open && setMessageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the message from {messageToDelete?.name}.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              {deleteMessageMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}