import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type WebsiteInfo = {
  id: number;
  section: string;
  key: string;
  value: string;
  updatedAt: string;
};

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [contactInfo, setContactInfo] = useState({
    email: "contact@nerochaze.com",
    phone: "+1 (555) 123-4567",
    intro_text: "I'm always interested in exciting projects and collaborative opportunities. Whether you need a complete web application, technical consultation, or just want to connect, don't hesitate to reach out!"
  });
  
  // Fetch contact section data
  const { data: contactData, isLoading: isContactDataLoading } = useQuery({
    queryKey: ['/api/website-info/contact'],
    queryFn: async () => {
      const response = await fetch('/api/website-info/contact');
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch contact information");
      }
      return data.data as WebsiteInfo[];
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });
  
  // Update contact content when data is loaded
  useEffect(() => {
    if (contactData) {
      const contentMap: Record<string, string> = {};
      
      contactData.forEach(item => {
        contentMap[item.key] = item.value;
      });
      
      setContactInfo({
        email: contentMap.email || "contact@nerochaze.com",
        phone: contentMap.phone || "+1 (555) 123-4567",
        intro_text: contentMap.intro_text || "I'm always interested in exciting projects and collaborative opportunities."
      });
    }
  }, [contactData]);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("/api/contact", {
        method: "POST",
        body: JSON.stringify(data)
      });
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message! I will get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Contact form submission error:", error);
      
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-20 bg-[#172A45] text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-2xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#64FFDA] font-mono mb-2 block">04. What's Next?</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-300 mb-8">
            I'm always interested in exciting projects and collaborative opportunities. Whether you need a complete web application, 
            technical consultation, or just want to connect, don't hesitate to reach out!
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-[#203a61] rounded-lg p-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your name" 
                        className="w-full px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-[#64FFDA]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        type="email"
                        className="w-full px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-[#64FFDA]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Subject</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter subject" 
                        className="w-full px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-[#64FFDA]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter your message" 
                        rows={5}
                        className="w-full px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-[#64FFDA] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-center">
                <Button 
                  type="submit" 
                  className="bg-[#64FFDA] hover:bg-[#53d6b6] text-[#172A45] px-8 py-3 rounded font-medium transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
        
        <motion.div 
          className="max-w-lg mx-auto mt-12 flex flex-col md:flex-row md:space-x-8 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="mailto:contact@nerochaze.com" className="flex items-center text-gray-300 hover:text-[#64FFDA] mb-4 md:mb-0 transition-colors">
            <FaEnvelope className="mr-2" />
            <span>contact@nerochaze.com</span>
          </a>
          <a href="tel:+1234567890" className="flex items-center text-gray-300 hover:text-[#64FFDA] transition-colors">
            <FaPhone className="mr-2" />
            <span>+1 (555) 123-4567</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
