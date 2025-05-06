import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-10" />
      <div
        className="relative h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=500&width=1200')" }}
      >
        <div className="container relative z-20 flex h-full flex-col items-start justify-center space-y-5">
          <div className="space-y-4 max-w-xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Discover Amazing Places with হাওয়াবদল
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Find and book the best tour packages for your next adventure
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/packages">Explore Packages</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register?role=operator">Become an Operator</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
