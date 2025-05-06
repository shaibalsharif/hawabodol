import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { db } from "@/lib/db"
import { tourOperators, tourPackages } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PackageCard } from "@/components/packages/package-card"

async function getOperator(id: string) {
  const operatorId = Number.parseInt(id)

  if (isNaN(operatorId)) {
    return null
  }

  const operator = await db.query.tourOperators.findFirst({
    where: eq(tourOperators.id, operatorId),
    with: {
      user: true,
    },
  })

  if (!operator) {
    return null
  }

  return operator
}

async function getOperatorPackages(operatorId: number) {
  const packages = await db.query.tourPackages.findMany({
    where: eq(tourPackages.operatorId, operatorId),
    orderBy: (packages, { desc }) => [desc(packages.createdAt)],
  })

  return packages
}

export default async function OperatorPage({ params }: { params: { id: string } }) {
  const operator = await getOperator(params.id)

  if (!operator) {
    notFound()
  }

  const packages = await getOperatorPackages(operator.id)

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src={operator.companyLogo || "/placeholder.svg?height=128&width=128"}
                    alt={operator.companyName}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="mt-4 text-center text-2xl">{operator.companyName}</CardTitle>
                <CardDescription className="text-center">
                  {operator.verificationStatus ? (
                    <Badge variant="outline" className="mt-2 bg-green-50 text-green-700">
                      Verified Operator
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="mt-2 bg-yellow-50 text-yellow-700">
                      Pending Verification
                    </Badge>
                  )}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contact Person</h3>
                  <p>{operator.user.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p>{operator.user.email}</p>
                </div>
                {operator.user.phone && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                    <p>{operator.user.phone}</p>
                  </div>
                )}
                {operator.website && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Website</h3>
                    <a
                      href={operator.website.startsWith("http") ? operator.website : `https://${operator.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {operator.website}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/contact?operator=${operator.id}`}>Contact Operator</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="packages">Tour Packages ({packages.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {operator.companyName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none dark:prose-invert">
                    <p>{operator.description}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="packages" className="mt-6">
              <h2 className="mb-4 text-2xl font-bold">Tour Packages</h2>
              {packages.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {packages.map((pkg) => (
                    <PackageCard key={pkg.id} tourPackage={pkg} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <p className="mb-4 text-center text-muted-foreground">
                      This operator has not published any tour packages yet.
                    </p>
                    <Button asChild variant="outline">
                      <Link href="/packages">Browse All Packages</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
