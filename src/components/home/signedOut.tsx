"use client";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  Globe,
  Users,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Palette,
  Search,
  Rocket,
  Brain,
  Edit3,
  Share2,
} from "lucide-react";

export function SignedOutHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                <Sparkles className="h-3 w-3" />
                AI-Powered Blogging Platform
              </Badge>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Revolutionize Your
              <span className="block text-primary">Blogging Experience</span>
              <span className="block">with AI-Powered Speed</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Create high-quality content in record time with cutting-edge AI
              assistance. Whether you are a seasoned writer or just starting
              out, BlogFast streamlines your blogging journey with intelligent
              tools and seamless publishing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/signUp" className="flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Start Creating for Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent"
              >
                <Link href="/login" className="flex items-center gap-2">
                  Sign In
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>AI-powered writing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose BlogFast?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make blogging faster, easier, and
              more engaging than ever before.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="AI-Powered Writing Assistance"
              description="Advanced AI generates topic suggestions, outlines, and full paragraphs tailored to your niche. Say goodbye to writer's block forever."
              gradient="from-purple-500 to-pink-500"
            />

            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Lightning-Fast Creation"
              description="Create polished blogs in minutes, not hours. Our AI helps you draft, edit, and optimize content so you can focus on sharing your voice."
              gradient="from-yellow-500 to-orange-500"
            />

            <FeatureCard
              icon={<Globe className="h-8 w-8" />}
              title="Seamless Publishing"
              description="Publish directly on BlogFast's platform and reach a built-in audience of readers eager to discover fresh, engaging content."
              gradient="from-green-500 to-blue-500"
            />

            <FeatureCard
              icon={<Palette className="h-8 w-8" />}
              title="Beautiful Templates"
              description="Choose from professionally designed templates to make your blog visually stunning. No design skills required!"
              gradient="from-pink-500 to-purple-500"
            />

            <FeatureCard
              icon={<Search className="h-8 w-8" />}
              title="SEO Optimization"
              description="Built-in SEO tools ensure your content is search-engine friendly, helping you rank higher and attract more readers."
              gradient="from-blue-500 to-cyan-500"
            />

            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Community Driven"
              description="Join a thriving community of passionate writers and readers. Share ideas, get feedback, and grow your audience."
              gradient="from-orange-500 to-red-500"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started with BlogFast in three simple steps and start creating
              amazing content today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ProcessStep
              step="1"
              icon={<Lightbulb className="h-8 w-8" />}
              title="Choose Your Topic"
              description="Select from AI-suggested topics or enter your own ideas. Our intelligent system will help you brainstorm and outline your content."
            />

            <ProcessStep
              step="2"
              icon={<Edit3 className="h-8 w-8" />}
              title="AI-Assisted Writing"
              description="Let our advanced AI help you write engaging content. Get suggestions for paragraphs, headlines, and structure as you create."
            />

            <ProcessStep
              step="3"
              icon={<Share2 className="h-8 w-8" />}
              title="Publish & Share"
              description="Review your content, customize the design, and publish instantly. Share with your audience and watch your readership grow."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Transform Your Blogging?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Join thousands of content creators who are already using AI to
                write better, faster, and more engaging blog posts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6"
                >
                  <Link href="/signUp" className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Get Started Free
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                >
                  <Link href="/blogs">Explore Blogs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div
          className={`w-16 h-16 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center text-white mb-4`}
        >
          {icon}
        </div>
        <CardTitle className="text-xl font-bold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

function ProcessStep({
  step,
  icon,
  title,
  description,
}: {
  step: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm font-bold">
          {step}
        </div>
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
