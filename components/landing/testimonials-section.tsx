import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rahim Ahmed",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Tourist",
      content:
        "I had an amazing experience with হাওয়াবদল. The tour package was well-organized and the guide was very knowledgeable. Will definitely book again!",
      rating: 5,
    },
    {
      name: "Fatima Khan",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Tourist",
      content:
        "The Cox's Bazar tour was fantastic. Everything from accommodation to transportation was taken care of. Highly recommend!",
      rating: 4,
    },
    {
      name: "Kamal Hossain",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Tourist",
      content:
        "Great service and excellent tour packages. The booking process was smooth and the customer support was very helpful.",
      rating: 5,
    },
  ]

  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Read testimonials from our satisfied customers who have experienced our tour packages
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground flex-grow">{testimonial.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
