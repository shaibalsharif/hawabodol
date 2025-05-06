"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ErrorBoundary } from "@/components/error-boundary"
import { FormSkeleton } from "@/components/ui/skeletons"
import { useToast } from "@/components/ui/use-toast"
import { Globe, Moon, Sun } from "lucide-react"

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState("system")
  const [language, setLanguage] = useState("english")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleSaveSettings = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      })
    }, 1000)
  }

  const handleThemeChange = (value: string) => {
    setTheme(value)
    // Apply theme change
    document.documentElement.classList.remove("light", "dark")
    if (value === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      document.documentElement.classList.add(systemTheme)
    } else {
      document.documentElement.classList.add(value)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        </div>

        <ErrorBoundary>
          <Tabs defaultValue="appearance">
            <TabsList>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="language">Language</TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="mt-4">
              {loading ? (
                <FormSkeleton fields={3} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Customize the appearance of the application. Choose a theme that suits your preference.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <RadioGroup value={theme} onValueChange={handleThemeChange} className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="light" id="theme-light" />
                          <Label htmlFor="theme-light" className="flex items-center">
                            <Sun className="mr-2 h-4 w-4" />
                            Light
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="dark" id="theme-dark" />
                          <Label htmlFor="theme-dark" className="flex items-center">
                            <Moon className="mr-2 h-4 w-4" />
                            Dark
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="system" id="theme-system" />
                          <Label htmlFor="theme-system">System</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Button onClick={handleSaveSettings} disabled={loading}>
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="notifications" className="mt-4">
              {loading ? (
                <FormSkeleton fields={3} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Configure how you receive notifications. You can customize your notification preferences here.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about your bookings and account via email.
                          </p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications about your bookings and account.
                          </p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={pushNotifications}
                          onCheckedChange={setPushNotifications}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketing-emails">Marketing Emails</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about new packages, promotions, and offers.
                          </p>
                        </div>
                        <Switch id="marketing-emails" checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                      </div>
                    </div>
                    <Button onClick={handleSaveSettings} disabled={loading}>
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="language" className="mt-4">
              {loading ? (
                <FormSkeleton fields={2} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Language</CardTitle>
                    <CardDescription>Choose your preferred language for the application interface.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <RadioGroup value={language} onValueChange={setLanguage} className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="english" id="lang-english" />
                          <Label htmlFor="lang-english" className="flex items-center">
                            <Globe className="mr-2 h-4 w-4" />
                            English
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bengali" id="lang-bengali" />
                          <Label htmlFor="lang-bengali" className="flex items-center">
                            <Globe className="mr-2 h-4 w-4" />
                            Bengali (বাংলা)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Button onClick={handleSaveSettings} disabled={loading}>
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </ErrorBoundary>
      </div>
    </DashboardLayout>
  )
}
