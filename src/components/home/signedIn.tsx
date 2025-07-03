"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  PenTool,
  BookOpen,
  TrendingUp,
  Users,
  ArrowRight,
  Plus,
  Eye,
  Sparkles,
  Target,
  BarChart3,
  Clock,
  Edit,
} from "lucide-react"
import { User } from "@supabase/supabase-js"


interface SignedInHomeProps {
  user: User
}

export function SignedInHome({ user }: SignedInHomeProps) {
  const firstName = user.email?.split(" ")[0] || user.email

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Welcome back, {firstName}! 👋</h1>
              <p className="text-muted-foreground">Ready to create something amazing today?</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <QuickActionCard
            icon={<PenTool className="h-6 w-6" />}
            title="Create New Blog"
            description="Start writing with AI assistance"
            href="/createBlog"
            gradient="from-blue-500 to-purple-500"
            primary
          />

          <QuickActionCard
            icon={<BookOpen className="h-6 w-6" />}
            title="My Blogs"
            description="View and manage your posts"
            href="/my-blogs"
            gradient="from-green-500 to-blue-500"
          />

          <QuickActionCard
            icon={<Eye className="h-6 w-6" />}
            title="Explore Blogs"
            description="Discover trending content"
            href="/blogs"
            gradient="from-orange-500 to-red-500"
          />

          <QuickActionCard
            icon={<BarChart3 className="h-6 w-6" />}
            title="Analytics"
            description="Track your performance"
            href="/analytics"
            gradient="from-purple-500 to-pink-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ActivityItem
                    icon={<PenTool className="h-4 w-4 text-blue-500" />}
                    title="Blog draft saved"
                    description="Your latest blog post has been automatically saved"
                    time="2 hours ago"
                  />
                  <ActivityItem
                    icon={<Eye className="h-4 w-4 text-green-500" />}
                    title="New blog views"
                    description="Your recent post is gaining traction"
                    time="1 day ago"
                  />
                  <ActivityItem
                    icon={<Users className="h-4 w-4 text-purple-500" />}
                    title="New follower"
                    description="Someone started following your blog"
                    time="2 days ago"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Writing Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  AI Writing Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <WritingToolCard
                    icon={<Sparkles className="h-5 w-5" />}
                    title="Topic Generator"
                    description="Get AI-powered blog topic suggestions"
                    href="/tools/topic-generator"
                  />
                  <WritingToolCard
                    icon={<Edit className="h-5 w-5" />}
                    title="Content Improver"
                    description="Enhance your existing content with AI"
                    href="/tools/content-improver"
                  />
                  <WritingToolCard
                    icon={<TrendingUp className="h-5 w-5" />}
                    title="SEO Optimizer"
                    description="Optimize your content for search engines"
                    href="/tools/seo-optimizer"
                  />
                  <WritingToolCard
                    icon={<BookOpen className="h-5 w-5" />}
                    title="Content Planner"
                    description="Plan your content calendar with AI"
                    href="/tools/content-planner"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <StatItem label="Blogs Published" value="0" />
                <StatItem label="Total Views" value="0" />
                <StatItem label="Followers" value="0" />
                <StatItem label="Drafts" value="0" />
              </CardContent>
            </Card>

            {/* Tips & Inspiration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Writing Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <TipItem
                    title="Start with a hook"
                    description="Grab your readers' attention from the very first sentence"
                  />
                  <TipItem
                    title="Use AI suggestions"
                    description="Let our AI help you overcome writer's block and generate ideas"
                  />
                  <TipItem
                    title="Optimize for SEO"
                    description="Use our built-in SEO tools to improve your content's visibility"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Get Started */}
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-foreground mb-2">Ready to publish your first blog?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use our AI-powered tools to create engaging content in minutes.
                </p>
                <Button asChild className="w-full">
                  <Link href="/createBlog" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Your First Blog
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickActionCard({
  icon,
  title,
  description,
  href,
  gradient,
  primary = false,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  gradient: string
  primary?: boolean
}) {
  return (
    <Card
      className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${primary ? "ring-2 ring-primary/20" : ""}`}
    >
      <CardContent className="p-6">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center text-white mb-4`}
        >
          {icon}
        </div>
        <h3 className="font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button asChild variant={primary ? "default" : "outline"} size="sm" className="w-full">
          <Link href={href} className="flex items-center gap-2">
            {primary ? "Get Started" : "View"}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function ActivityItem({
  icon,
  title,
  description,
  time,
}: {
  icon: React.ReactNode
  title: string
  description: string
  time: string
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  )
}

function WritingToolCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
          <h4 className="font-semibold text-foreground">{title}</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <Button asChild variant="ghost" size="sm" className="w-full">
          <Link href={href}>Try Now</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>
      <Badge variant="secondary">{value}</Badge>
    </div>
  )
}

function TipItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-1">
      <h4 className="text-sm font-medium text-foreground">{title}</h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}
