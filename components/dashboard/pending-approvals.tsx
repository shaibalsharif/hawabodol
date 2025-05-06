"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckIcon, XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

const initialOperators = [
  {
    id: 1,
    name: "Dhaka Tours",
    email: "info@dhakatours.com",
    avatar: "/placeholder.svg?height=40&width=40",
    appliedAt: "2023-05-01T10:30:00Z",
  },
  {
    id: 2,
    name: "Bangladesh Adventures",
    email: "contact@bdadventures.com",
    avatar: "/placeholder.svg?height=40&width=40",
    appliedAt: "2023-05-02T14:45:00Z",
  },
  {
    id: 3,
    name: "Cox's Travel Agency",
    email: "bookings@coxstravel.com",
    avatar: "/placeholder.svg?height=40&width=40",
    appliedAt: "2023-05-03T09:15:00Z",
  },
]

export function PendingApprovals() {
  const [operators, setOperators] = useState(initialOperators)

  const handleApprove = (id: number) => {
    // In a real app, this would make an API call
    setOperators(operators.filter((op) => op.id !== id))
    toast({
      title: "Operator approved",
      description: "The tour operator has been approved successfully.",
    })
  }

  const handleReject = (id: number) => {
    // In a real app, this would make an API call
    setOperators(operators.filter((op) => op.id !== id))
    toast({
      title: "Operator rejected",
      description: "The tour operator has been rejected.",
    })
  }

  if (operators.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">No pending approvals</div>
  }

  return (
    <div className="space-y-4">
      {operators.map((operator) => (
        <div key={operator.id} className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={operator.avatar || "/placeholder.svg"} alt={operator.name} />
              <AvatarFallback>{operator.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{operator.name}</h3>
              <p className="text-sm text-muted-foreground">{operator.email}</p>
              <p className="text-xs text-muted-foreground">
                Applied: {new Date(operator.appliedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleApprove(operator.id)}>
              <CheckIcon className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleReject(operator.id)}>
              <XIcon className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
