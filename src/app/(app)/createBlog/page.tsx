"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  PenTool,
  Sparkles,
  Zap,
  Users,
  Globe,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Target,
  BookOpen,
  Palette,
} from "lucide-react"

export default function CreateBlog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <PenTool className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI-Powered
            </Badge>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            Create Amazing
            <span className="block text-primary">AI-Generated Blogs</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into engaging, well-structured blog posts with the power of artificial intelligence.
            Create professional content in minutes, not hours.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title="Lightning Fast"
            description="Generate complete blog posts in seconds with AI assistance"
          />
          <FeatureCard
            icon={<Palette className="h-6 w-6" />}
            title="Creative Content"
            description="AI creates unique, engaging content tailored to your topic"
          />
          <FeatureCard
            icon={<Globe className="h-6 w-6" />}
            title="SEO Optimized"
            description="Built-in optimization for better search engine visibility"
          />
          <FeatureCard
            icon={<Users className="h-6 w-6" />}
            title="Reader Focused"
            description="Content designed to engage and retain your audience"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column - Guide */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                How to Create Engaging Blogs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Writing Tips for Success
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Creating a good blog requires a balance of valuable content, engaging writing, and proper formatting.
                  Our AI helps you achieve this balance by generating well-structured, meaningful content that resonates
                  with your audience.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Key Features
                </h4>
                <div className="space-y-2">
                  {[
                    "AI-Generated Creative Content",
                    "Easy-to-Navigate Interface",
                    "Diverse Topics & Categories",
                    "Professional Formatting",
                    "SEO-Friendly Structure",
                    "Engaging Headlines & Subheadings",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Action */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <PenTool className="h-8 w-8 text-primary" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Start Writing?</h2>
                    <p className="text-muted-foreground">
                      Begin your blogging journey with AI assistance. Create professional, engaging content that your
                      readers will love.
                    </p>
                  </div>

                  <Button asChild size="lg" className="w-full group">
                    <Link href="/createBlog/blogImageUpload" className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Start Creating Blog
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">10K+</div>
                    <div className="text-xs text-muted-foreground">Blogs Created</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">5min</div>
                    <div className="text-xs text-muted-foreground">Avg. Creation Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">98%</div>
                    <div className="text-xs text-muted-foreground">User Satisfaction</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Process Steps */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ProcessStep
                step="1"
                title="Choose Your Topic"
                description="Select from various categories or enter your custom topic"
                icon={<Target className="h-6 w-6" />}
              />
              <ProcessStep
                step="2"
                title="AI Generation"
                description="Our AI creates engaging, well-structured content for you"
                icon={<Sparkles className="h-6 w-6" />}
              />
              <ProcessStep
                step="3"
                title="Publish & Share"
                description="Review, customize, and share your blog with the world"
                icon={<Globe className="h-6 w-6" />}
              />
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">Join Thousands of Content Creators</h2>
              <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                Start creating professional, engaging blog content today. No experience required – just your ideas and
                our AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/createBlog/blogImageUpload">Get Started Now</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                >
                  <Link href="/blogs">View Examples</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
          {icon}
        </div>
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

function ProcessStep({
  step,
  title,
  description,
  icon,
}: { step: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="text-center">
      <div className="relative mb-4">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs font-bold">
          {step}
        </div>
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
