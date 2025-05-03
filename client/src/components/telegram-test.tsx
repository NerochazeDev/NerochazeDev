import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function TelegramTest() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const sendTestMessage = async () => {
    try {
      setIsLoading(true);
      
      const testMessage = {
        name: "Test User",
        email: "test@example.com",
        subject: "Test Message",
        message: `Test message sent at ${new Date().toISOString()}`
      };
      
      console.log("Sending test message to Telegram:", testMessage);
      
      const response = await apiRequest({
        url: "/api/contact",
        method: "POST",
        body: JSON.stringify(testMessage)
      });
      
      console.log("Telegram test message response:", response);
      
      toast({
        title: "Test Message Sent",
        description: "Check your Telegram for the test message"
      });
      
    } catch (error) {
      console.error("Error sending test message:", error);
      toast({
        title: "Error",
        description: "Failed to send test message to Telegram",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="p-4 bg-slate-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Telegram Integration Test</h3>
      <p className="text-sm text-gray-600 mb-4">
        Click the button below to send a test message to Telegram
      </p>
      <Button
        onClick={sendTestMessage}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Test Message"
        )}
      </Button>
    </div>
  );
}