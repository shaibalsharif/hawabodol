"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function BookPackagePage({ params }: { params: { id: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("standard")
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  // Mock data - in a real app, this would be fetched from the database
  const packageData = {
    id: Number.parseInt(params.id),
    title: "Cox's Bazar Beach Getaway",
    location: "Cox's Bazar, Bangladesh",
    startDate: "2023-06-15",
    endDate: "2023-06-17",
    categories: [
      {
        id: "standard",
        name: "Standard",
        price: 12000,
      },
      {
        id: "deluxe",
        name: "Deluxe",
        price: 15000,
      },
      {
        id: "premium",
        name: "Premium",
        price: 20000,
      },
    ],
  }

  const selectedCategoryData = packageData.categories.find((cat) => cat.id === selectedCategory)
  const totalPrice = selectedCategoryData ? selectedCategoryData.price * quantity : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would make an API call to create the booking
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Booking successful",
        description: "Your booking has been confirmed. Check your email for details.",
      })

      router.push(`/bookings`)
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Book Your Tour Package</h1>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Package Details</CardTitle>
                    <CardDescription>Review your selected package details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <h3 className="font-medium">Package Name</h3>
                          <p className="text-muted-foreground">{packageData.title}</p>
                        </div>
                        <div>
                          <h3 className="font-medium">Location</h3>
                          <p className="text-muted-foreground">{packageData.location}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <h3 className="font-medium">Start Date</h3>
                          <p className="text-muted-foreground">{packageData.startDate}</p>
                        </div>
                        <div>
                          <h3 className="font-medium">End Date</h3>
                          <p className="text-muted-foreground">{packageData.endDate}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Select Package Category</CardTitle>
                    <CardDescription>Choose the package category that suits your needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-4">
                      {packageData.categories.map((category) => (
                        <div
                          key={category.id}
                          className={`flex items-center justify-between rounded-lg border p-4 ${
                            selectedCategory === category.id ? "border-primary" : ""
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={category.id} id={category.id} />
                            <Label htmlFor={category.id} className="cursor-pointer">
                              {category.name}
                            </Label>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">৳{category.price}</p>
                            <p className="text-sm text-muted-foreground">per person</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                    <div className="mt-4">
                      <Label htmlFor="quantity">Number of Travelers</Label>
                      <Select
                        value={quantity.toString()}
                        onValueChange={(value) => setQuantity(Number.parseInt(value))}
                      >
                        <SelectTrigger id="quantity" className="mt-1">
                          <SelectValue placeholder="Select quantity" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "person" : "people"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Traveler Information</CardTitle>
                    <CardDescription>Enter your contact and traveler details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergency-contact">Emergency Contact</Label>
                          <Input id="emergency-contact" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                        <Textarea id="special-requests" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Summary</CardTitle>
                    <CardDescription>Review your booking total</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Package Price ({selectedCategoryData?.name})</span>
                        <span>
                          ৳{selectedCategoryData?.price} x {quantity}
                        </span>
                      </div>
                      <div className="flex justify-between font-medium text-lg pt-2 border-t">
                        <span>Total</span>
                        <span>৳{totalPrice}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                      Back
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
