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
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;
interface WebsiteInfo {
  key: string;
  value: string;
}

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  const [contactInfo, setContactInfo] = useState({
    email: "contact@example.com",
    phone: "+1 (555) 123-4567",
    intro_text: "I'm always interested in exciting projects and collaborative opportunities."
  });

  // Fetch contact section data
  const { data: contactData, isLoading } = useQuery({
    queryKey: ['/api/website-info/contact'],
    queryFn: async () => {
      const response = await fetch('/api/website-info/contact');
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch contact information");
      }
      return data.data as WebsiteInfo[];
    }
  });

  // Update contact info when data is loaded
  useEffect(() => {
    if (contactData && contactData.length > 0) {
      const newContactInfo = {
        email: contactData.find(item => item.key === 'email')?.value || contactInfo.email,
        phone: contactData.find(item => item.key === 'phone')?.value || contactInfo.phone,
        intro_text: contactData.find(item => item.key === 'intro_text')?.value || contactInfo.intro_text
      };
      setContactInfo(newContactInfo);
    }
  }, [contactData]);

  // Update contact info when data is loaded
  useEffect(() => {
    if (contactData) {
      const newContactInfo = {
        email: contactData.find(item => item.key === 'email')?.value || "contact@example.com",
        phone: contactData.find(item => item.key === 'phone')?.value || "+1 (555) 123-4567",
        intro_text: contactData.find(item => item.key === 'intro_text')?.value || 
          "I'm always interested in exciting projects and collaborative opportunities. Whether you need a complete web application, technical consultation, or just want to connect, don't hesitate to reach out!"
      };
      setContactInfo(newContactInfo);
    }
  }, [contactData]);

  if (isLoading) return <p>Loading...</p>;

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
            <p className="text-gray-300 leading-relaxed">
              {contactInfo.intro_text}
            </p>
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
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your message" 
                          rows={5}
                          className="bg-gray-900/70 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

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
            <div className="bg-gray-800/50 rounded-lg shadow-lg border border-gray-700 p-8">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
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
                    <a href={`tel:${contactInfo.phone}`} className="text-white hover:text-cyan-400 transition-colors">
                      {contactInfo.phone}
                    </a>
                  </div>
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