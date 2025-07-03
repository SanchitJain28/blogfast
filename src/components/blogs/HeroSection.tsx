import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Sparkles, PenTool, Users, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 border-0">
      <div className="absolute inset-0 bg-black/20" />
      <CardContent className="relative p-8 lg:p-12">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-yellow-300" />
            <span className="text-blue-100 font-medium">AI-Powered Blogging</span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Where Creativity Meets
            <span className="block text-yellow-300">Artificial Intelligence</span>
          </h1>

          <p className="text-blue-100 text-lg lg:text-xl mb-8 leading-relaxed max-w-3xl">
            Explore a world of engaging, thought-provoking, and innovative blogs generated with the help of AI. Whether
            you are looking for inspiring stories, insightful articles, or captivating reads, our platform brings you a
            seamless experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/signUp" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Create Account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>

          <Button asChild size="lg" className="w-full sm:w-auto bg-yellow-500 text-black hover:bg-yellow-400">
            <Link href="/createBlog" className="flex items-center gap-2">
              <PenTool className="h-4 w-4" />
              Start Writing
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
