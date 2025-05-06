import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OperatorLoading() {
  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center">
                <Skeleton className="h-32 w-32 rounded-full" />
                <Skeleton className="mt-4 h-8 w-48" />
                <Skeleton className="mt-2 h-6 w-32" />
                <Skeleton className="mt-4 h-8 w-48" />
                <Skeleton className="mt-2 h-6 w-32" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-2 h-4 w-40" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-2 h-4 w-40" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-2 h-4 w-40" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="packages">Tour Packages</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-3/4" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="packages" className="mt-6">
              <Skeleton className="mb-4 h-8 w-48" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i}>
                    <Skeleton className="h-48 w-full rounded-t-lg" />
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="mt-2 h-4 w-full" />
                      <Skeleton className="mt-2 h-4 w-full" />
                    </CardContent>
                    <CardFooter className="flex justify-between p-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-24" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
