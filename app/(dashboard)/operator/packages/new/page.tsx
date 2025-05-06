"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, ImagePlus, Loader2, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

export default function NewPackagePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [categories, setCategories] = useState([{ name: "", description: "", price: "", features: [""] }])
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would make an API call to create the package
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Package created",
        description: "Your tour package has been created successfully.",
      })

      router.push("/operator/packages")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create tour package. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const addCategory = () => {
    setCategories([...categories, { name: "", description: "", price: "", features: [""] }])
  }

  const removeCategory = (index: number) => {
    const newCategories = [...categories]
    newCategories.splice(index, 1)
    setCategories(newCategories)
  }

  const updateCategory = (index: number, field: string, value: string) => {
    const newCategories = [...categories]
    newCategories[index] = { ...newCategories[index], [field]: value }
    setCategories(newCategories)
  }

  const addFeature = (categoryIndex: number) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].features.push("")
    setCategories(newCategories)
  }

  const updateFeature = (categoryIndex: number, featureIndex: number, value: string) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].features[featureIndex] = value
    setCategories(newCategories)
  }

  const removeFeature = (categoryIndex: number, featureIndex: number) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].features.splice(featureIndex, 1)
    setCategories(newCategories)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Create New Tour Package</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="categories">Package Categories</TabsTrigger>
              <TabsTrigger value="policies">Policies & Rules</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic details of your tour package</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Package Title</Label>
                    <Input id="title" placeholder="e.g., Cox's Bazar Beach Getaway" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your tour package in detail"
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g., Cox's Bazar, Bangladesh" required />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn("w-full justify-start text-left", !startDate && "text-muted-foreground")}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn("w-full justify-start text-left", !endDate && "text-muted-foreground")}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="totalSeats">Total Seats</Label>
                      <Input id="totalSeats" type="number" min="1" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="basePrice">Base Price (৳)</Label>
                      <Input id="basePrice" type="number" min="0" step="0.01" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Package Images</Label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="flex aspect-square items-center justify-center rounded-md border border-dashed">
                        <Button variant="ghost" className="h-full w-full flex-col rounded-sm">
                          <ImagePlus className="h-8 w-8 mb-2" />
                          <span>Add Cover Image</span>
                        </Button>
                      </div>
                      <div className="flex aspect-square items-center justify-center rounded-md border border-dashed">
                        <Button variant="ghost" className="h-full w-full flex-col rounded-sm">
                          <ImagePlus className="h-8 w-8 mb-2" />
                          <span>Add Image</span>
                        </Button>
                      </div>
                      <div className="flex aspect-square items-center justify-center rounded-md border border-dashed">
                        <Button variant="ghost" className="h-full w-full flex-col rounded-sm">
                          <ImagePlus className="h-8 w-8 mb-2" />
                          <span>Add Image</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="categories" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Package Categories</CardTitle>
                  <CardDescription>Define different categories or tiers for your package</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {categories.map((category, index) => (
                    <div key={index} className="space-y-4 border-b pb-6 last:border-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Category {index + 1}</h3>
                        {categories.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeCategory(index)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`category-name-${index}`}>Category Name</Label>
                        <Input
                          id={`category-name-${index}`}
                          placeholder="e.g., Standard, Deluxe, Premium"
                          value={category.name}
                          onChange={(e) => updateCategory(index, "name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`category-description-${index}`}>Description</Label>
                        <Textarea
                          id={`category-description-${index}`}
                          placeholder="Describe what's included in this category"
                          value={category.description}
                          onChange={(e) => updateCategory(index, "description", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`category-price-${index}`}>Price (৳)</Label>
                        <Input
                          id={`category-price-${index}`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={category.price}
                          onChange={(e) => updateCategory(index, "price", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Features</Label>
                        {category.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <Input
                              placeholder="e.g., Breakfast included"
                              value={feature}
                              onChange={(e) => updateFeature(index, featureIndex, e.target.value)}
                              required
                            />
                            {category.features.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFeature(index, featureIndex)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addFeature(index)}
                          className="mt-2"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Feature
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addCategory}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Category
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="policies" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Policies & Rules</CardTitle>
                  <CardDescription>Define the policies and rules for your tour package</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="refundable">Refundable</Label>
                      <p className="text-sm text-muted-foreground">Allow customers to request refunds</p>
                    </div>
                    <Switch id="refundable" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="refundPolicy">Refund Policy</Label>
                    <Textarea
                      id="refundPolicy"
                      placeholder="Describe your refund policy in detail"
                      className="min-h-[120px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rules">Package Rules</Label>
                    <Textarea
                      id="rules"
                      placeholder="List any rules or guidelines for participants"
                      className="min-h-[120px]"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Package"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </DashboardLayout>
  )
}
