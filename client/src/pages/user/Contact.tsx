/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { bitblogApi } from "@/api";

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Live validation for name, email, and message
    if (name === "name") {
      setErrors(prev => ({ ...prev, name: value.trim() ? "" : "Name is required" }));
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors(prev => ({
        ...prev,
        email: !value.trim()
          ? "Email is required"
          : !emailRegex.test(value)
          ? "Invalid email address"
          : ""
      }));
    }

    if (name === "message") {
      setErrors(prev => ({
        ...prev,
        message: !value.trim()
          ? "Message is required"
          : value.trim().length < 10 || value.trim().length > 1000
          ? "Message must be between 10 and 1000 characters"
          : ""
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (errors.name || errors.email || errors.message) {
      toast.error("Please fix the errors in the form before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || "No Subject",
        message: formData.message.trim()
      };

      console.log("Sending contact form payload:", payload);

      const { data } = await bitblogApi.post("/contact", payload, {
        headers: { "Content-Type": "application/json" }
      });

      if (!data.success) {
        throw new Error(data.message || "Failed to send message");
      }

      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({ name: "", email: "", message: "" });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Me",
      detail: "hello@mysafari.com",
      description: "I will respond as soon as I can"
    },
    {
      icon: MapPin,
      title: "Nairobi",
      detail: "Nairobi, Kenya",
      description: "I am available"
    },
    {
      icon: Clock,
      title: "Active Hours",
      detail: "Mon - Fri, 9AM - 6PM",
      description: "East African Time Zone"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 left-20 w-64 h-64 bg-orange-200/10 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="container px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-orange-600 mb-4"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">Get in Touch</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Let&apos;s Start a <span className="text-orange-600">Conversation</span>
              </motion.h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Have a question about a travel story, or just want to swap book recommendations? I&apos;d love to hear from you.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-3xl bg-background border border-border/50 text-center group hover:border-orange-500/30 transition-all shadow-lg hover:shadow-xl"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <info.icon className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-2xl mb-1 text-orange-600 tracking-wide">{info.title}</h3>
                  <p className="text-lg font-semibold mb-1 text-gray-800">{info.detail}</p>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-muted/30 border-y border-border/50">
          <div className="container px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-background border border-border p-8 md:p-12 rounded-[2.5rem] shadow-xl">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold mb-3">Send a Message</h2>
                  <p className="text-muted-foreground">I respond to every message personally.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="rounded-xl h-12"
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="rounded-xl h-12"
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What's on your mind?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="rounded-xl h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your thoughts..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="rounded-xl min-h-[150px] resize-none"
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {formData.message.length}/1000
                    </p>
                    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-xl bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
