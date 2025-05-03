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
    email: "",
    phone: "",
    intro_text: ""
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
        email: contentMap.email || defaultContactInfo.email,
        phone: contentMap.phone || defaultContactInfo.phone,
        intro_text: contentMap.intro_text || defaultContactInfo.intro_text
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
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Get In Touch</span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded"></div>
          </h2>
          <div className="mt-6 max-w-2xl mx-auto">
            {isContactDataLoading ? (
              <div className="h-16 bg-gray-800/50 animate-pulse rounded-md"></div>
            ) : (
              <p className="text-gray-300 leading-relaxed">{contactInfo.intro_text}</p>
            )}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <motion.div 
            className="lg:col-span-3 bg-gray-800/50 rounded-lg shadow-lg border border-gray-700 p-8 overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-bl-full"></div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-gray-300">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your name" 
                            className="bg-gray-900/70 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-gray-300">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your email" 
                            type="email"
                            className="bg-gray-900/70 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter subject" 
                          className="bg-gray-900/70 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Message</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Textarea 
                            placeholder="Enter your message" 
                            rows={5}
                            className="bg-gray-900/70 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                          {field.value.length} / 500
                        </div>
                      </div>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-md font-medium transition-all duration-300 shadow-lg shadow-cyan-500/10"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Send Message
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="tech-card h-full flex flex-col">
              <h3 className="tech-heading">Contact Information</h3>
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded mb-6"></div>
              
              <div className="space-y-6 flex-grow">
                {isContactDataLoading ? (
                  <div className="space-y-4">
                    <div className="h-10 bg-gray-800 animate-pulse rounded-md"></div>
                    <div className="h-10 bg-gray-800 animate-pulse rounded-md"></div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start space-x-4">
                      <div className="bg-cyan-500/20 p-3 rounded-lg">
                        <FaEnvelope className="text-cyan-400 h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Email</p>
                        <a href={`mailto:${contactInfo.email}`} className="text-white hover:text-cyan-400 transition-colors">
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-cyan-500/20 p-3 rounded-lg">
                        <FaPhone className="text-cyan-400 h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Phone</p>
                        <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="text-white hover:text-cyan-400 transition-colors">
                          {contactInfo.phone}
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-700">
                <div className="text-gray-400 mb-4">Follow me on social media</div>
                <div className="flex space-x-3">
                  <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                    <svg className="h-5 w-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                    <svg className="h-5 w-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                    <svg className="h-5 w-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                    <svg className="h-5 w-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
