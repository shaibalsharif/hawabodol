"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function PendingApprovalPage() {
  const { signOut } = useAuth()

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-amber-500" />
            </div>
            <CardTitle className="text-center">Account Pending Approval</CardTitle>
            <CardDescription className="text-center">
              Your tour operator account is pending approval from our administrators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm">
                Thank you for registering as a tour operator with হাওয়াবদল. Our team will review your application and
                approve your account as soon as possible. You will receive an email notification once your account is
                approved.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">What happens next?</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Our administrators will review your application</li>
                <li>You'll receive an email notification when approved</li>
                <li>Once approved, you can log in and start creating tour packages</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
            <Button variant="outline" className="w-full" onClick={signOut}>
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
