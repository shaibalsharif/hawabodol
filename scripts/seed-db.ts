import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as bcrypt from "bcryptjs"
import * as dotenv from "dotenv"
import * as schema from "../lib/db/schema"

dotenv.config({ path: ".env.local" })

const connectionString = process.env.db_url
if (!connectionString) {
  throw new Error("DATABASE_URL is not set")
}

const client = postgres(connectionString)
const db = drizzle(client, { schema })

export async function seedDatabase() {
  try {
    // Clear existing data
    await clearExistingData()

    // Create users and their profiles
    const { adminIds, operatorIds, touristIds } = await createUsersAndProfiles()

    // Create tour packages
    const packageIds = await createTourPackages(operatorIds)

    // Create bookings
    await createBookings(touristIds, packageIds)

    // Create reviews
    await createReviews(touristIds, packageIds)

    // Create favorites
    await createFavorites(touristIds, packageIds)

    // Create notifications
    await createNotifications(adminIds, operatorIds, touristIds)

    // Create discount codes
    await createDiscountCodes(operatorIds)

    // Create user settings
    await createUserSettings([...adminIds, ...operatorIds, ...touristIds])

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.end()
  }
}

async function clearExistingData() {
  console.log("Clearing existing data...")

  // Delete in reverse order of dependencies
  await db.delete(schema.notifications)
  await db.delete(schema.userSettings)
  await db.delete(schema.favorites)
  await db.delete(schema.reviews)
  await db.delete(schema.refundRequests)
  await db.delete(schema.bookings)
  await db.delete(schema.packageCategories)
  await db.delete(schema.discountCodes)
  await db.delete(schema.tourPackages)
  await db.delete(schema.reports)
  await db.delete(schema.touristProfiles)
  await db.delete(schema.operatorProfiles)
  await db.delete(schema.adminProfiles)
  await db.delete(schema.users)
}

async function createUsersAndProfiles() {
  console.log("Creating users and profiles...")

  const adminIds = []
  const operatorIds = []
  const touristIds = []

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10)
  const [adminUser] = await db
    .insert(schema.users)
    .values({
      email: "admin@hawabodol.com",
      password: adminPassword,
    })
    .returning()

  const [adminProfile] = await db
    .insert(schema.adminProfiles)
    .values({
      userId: adminUser.id,
      name: "System Admin",
      role: "admin",
      status: "active",
      profileImage: "/placeholder.svg?height=200&width=200&text=Admin",
      phone: "+8801712345678",
      firebaseUid: "admin-firebase-uid-1",
    })
    .returning()

  adminIds.push(adminProfile.id)

  // Create operator users
  const operatorNames = [
    "Bangladesh Adventures",
    "Cox's Travel Agency",
    "Dhaka Tours",
    "Sylhet Explorers",
    "Chittagong Travels",
    "Rangamati Tours",
    "Sundarban Expeditions",
    "Bandarban Trekkers",
    "Khulna Tours",
    "Rajshahi Travels",
  ]

  for (let i = 0; i < 10; i++) {
    const operatorPassword = await bcrypt.hash("operator123", 10)
    const [operatorUser] = await db
      .insert(schema.users)
      .values({
        email: `operator${i + 1}@hawabodol.com`,
        password: operatorPassword,
      })
      .returning()

    const [operatorProfile] = await db
      .insert(schema.operatorProfiles)
      .values({
        userId: operatorUser.id,
        name: `${operatorNames[i]} Manager`,
        companyName: operatorNames[i],
        companyLogo: `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(operatorNames[i])}`,
        coverImage: `/placeholder.svg?height=500&width=1000&text=${encodeURIComponent(operatorNames[i])}`,
        description: `${operatorNames[i]} is a leading tour operator in Bangladesh, offering exceptional travel experiences.`,
        address: `${i + 1} Tour Street, Dhaka, Bangladesh`,
        phone: `+88017${Math.floor(10000000 + Math.random() * 90000000)}`,
        website: `www.${operatorNames[i].toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
        role: "operator",
        status: i < 8 ? "active" : "pending", // Make 2 operators pending for approval
        verificationStatus: i < 8, // First 8 are verified
        verifiedAt: i < 8 ? new Date() : null,
        rating: (4 + Math.random()).toFixed(1),
        reviewCount: Math.floor(Math.random() * 50) + 5,
        firebaseUid: `operator-firebase-uid-${i + 1}`,
      })
      .returning()

    operatorIds.push(operatorProfile.id)
  }

  // Create tourist users
  const touristNames = ["John Doe", "Jane Smith", "Ahmed Khan", "Fatima Rahman", "Kamal Hossain"]

  for (let i = 0; i < 5; i++) {
    const touristPassword = await bcrypt.hash("tourist123", 10)
    const [touristUser] = await db
      .insert(schema.users)
      .values({
        email: `tourist${i + 1}@example.com`,
        password: touristPassword,
      })
      .returning()

    const [touristProfile] = await db
      .insert(schema.touristProfiles)
      .values({
        userId: touristUser.id,
        name: touristNames[i],
        profileImage: `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(touristNames[i])}`,
        address: `${i + 1} Residential Area, Dhaka, Bangladesh`,
        phone: `+88018${Math.floor(10000000 + Math.random() * 90000000)}`,
        emergencyContact: `+88019${Math.floor(10000000 + Math.random() * 90000000)}`,
        role: "tourist",
        status: "active",
        firebaseUid: `tourist-firebase-uid-${i + 1}`,
      })
      .returning()

    touristIds.push(touristProfile.id)
  }

  console.log(`Created 1 admin, ${operatorIds.length} operators, and ${touristIds.length} tourists`)
  return { adminIds, operatorIds, touristIds }
}

async function createTourPackages(operatorIds) {
  console.log("Creating tour packages...")

  const packageIds = []
  const packageData = [
    {
      title: "Cox's Bazar Beach Getaway",
      location: "Cox's Bazar",
      description:
        "Experience the beauty of the world's longest natural sea beach with our 3-day Cox's Bazar tour package.",
      basePrice: 12000,
      duration: { days: 3, nights: 2 },
    },
    {
      title: "Sundarbans Mangrove Adventure",
      location: "Sundarbans",
      description: "Explore the largest mangrove forest in the world and spot the Royal Bengal Tiger.",
      basePrice: 15000,
      duration: { days: 4, nights: 3 },
    },
    {
      title: "Bandarban Hill Trekking",
      location: "Bandarban",
      description: "Trek through the beautiful hills of Bandarban and experience the indigenous cultures.",
      basePrice: 10000,
      duration: { days: 3, nights: 2 },
    },
    {
      title: "Saint Martin Island Tour",
      location: "Saint Martin",
      description: "Visit Bangladesh's only coral island with crystal clear waters and beautiful marine life.",
      basePrice: 14000,
      duration: { days: 3, nights: 2 },
    },
    {
      title: "Sylhet Tea Garden Tour",
      location: "Sylhet",
      description: "Explore the lush green tea gardens and natural beauty of Sylhet.",
      basePrice: 9000,
      duration: { days: 2, nights: 1 },
    },
    {
      title: "Rangamati Lake Cruise",
      location: "Rangamati",
      description: "Enjoy a serene cruise on Kaptai Lake and explore the beautiful hills of Rangamati.",
      basePrice: 11000,
      duration: { days: 3, nights: 2 },
    },
    {
      title: "Chittagong Hill Tracts Adventure",
      location: "Chittagong",
      description: "Discover the diverse cultures and landscapes of the Chittagong Hill Tracts.",
      basePrice: 13000,
      duration: { days: 4, nights: 3 },
    },
    {
      title: "Kuakata Beach Retreat",
      location: "Kuakata",
      description: "Experience both sunrise and sunset from the same beach at Kuakata, the daughter of the sea.",
      basePrice: 10500,
      duration: { days: 3, nights: 2 },
    },
    {
      title: "Srimangal Tea Estate Tour",
      location: "Srimangal",
      description: "Visit the tea capital of Bangladesh and enjoy the serene beauty of tea gardens.",
      basePrice: 8500,
      duration: { days: 2, nights: 1 },
    },
    {
      title: "Paharpur Buddhist Monastery Tour",
      location: "Paharpur",
      description: "Explore the ancient Buddhist Monastery, a UNESCO World Heritage site.",
      basePrice: 7500,
      duration: { days: 2, nights: 1 },
    },
    {
      title: "Ratargul Swamp Forest Adventure",
      location: "Sylhet",
      description: "Explore Bangladesh's only swamp forest with a boat ride through the mystical waters.",
      basePrice: 9500,
      duration: { days: 2, nights: 1 },
    },
    {
      title: "Mahasthangarh Archaeological Tour",
      location: "Bogra",
      description:
        "Visit the ancient city of Mahasthangarh, one of the earliest urban archaeological sites in Bangladesh.",
      basePrice: 8000,
      duration: { days: 2, nights: 1 },
    },
    {
      title: "Lalbagh Fort Historical Tour",
      location: "Dhaka",
      description: "Explore the historical Lalbagh Fort and other heritage sites in Old Dhaka.",
      basePrice: 5000,
      duration: { days: 1, nights: 0 },
    },
    {
      title: "Sonargaon Day Trip",
      location: "Sonargaon",
      description: "Visit the ancient capital of Bengal and explore the Folk Art Museum.",
      basePrice: 4500,
      duration: { days: 1, nights: 0 },
    },
    {
      title: "Nijhum Dwip Island Expedition",
      location: "Nijhum Dwip",
      description: "Discover the serene 'Silent Island' and its diverse wildlife including spotted deer.",
      basePrice: 12500,
      duration: { days: 3, nights: 2 },
    },
  ]

  // Distribute packages among operators
  for (let i = 0; i < packageData.length; i++) {
    const operatorIndex = i % operatorIds.length
    const startDate = new Date()
    startDate.setDate(startDate.getDate() + 15 + i * 5) // Start dates 15, 20, 25... days from now

    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + packageData[i].duration.days - 1)

    const [pkg] = await db
      .insert(schema.tourPackages)
      .values({
        operatorId: operatorIds[operatorIndex],
        title: packageData[i].title,
        description: packageData[i].description,
        location: packageData[i].location,
        coverImage: `/placeholder.svg?height=500&width=800&text=${encodeURIComponent(packageData[i].title)}`,
        images: JSON.stringify([
          `/placeholder.svg?height=500&width=800&text=${encodeURIComponent(packageData[i].title + " 1")}`,
          `/placeholder.svg?height=500&width=800&text=${encodeURIComponent(packageData[i].title + " 2")}`,
          `/placeholder.svg?height=500&width=800&text=${encodeURIComponent(packageData[i].title + " 3")}`,
        ]),
        startDate,
        endDate,
        totalSeats: 20,
        availableSeats: 15,
        basePrice: packageData[i].basePrice,
        status: i % 5 === 0 ? "draft" : "published", // Some packages are drafts
        isRefundable: true,
        refundPolicy: "Cancellations made 7 days or more before the tour start date are eligible for a full refund.",
        rules: "Participants must follow the guide's instructions at all times. No littering.",
        featured: i < 6, // First 6 packages are featured
        rating: (4 + Math.random()).toFixed(1),
        reviewCount: Math.floor(Math.random() * 30) + 5,
        publishedAt: i % 5 === 0 ? null : new Date(),
      })
      .returning()

    packageIds.push(pkg.id)

    // Create package categories
    await createPackageCategories(pkg.id, packageData[i].basePrice)
  }

  console.log(`Created ${packageIds.length} tour packages with categories`)
  return packageIds
}

async function createPackageCategories(packageId, basePrice) {
  const categories = [
    {
      name: "Standard",
      description: "Basic package with essential amenities",
      price: basePrice,
      features: ["Shared accommodation", "Daily breakfast", "Guided tour", "Transportation"],
    },
    {
      name: "Deluxe",
      description: "Enhanced package with better amenities",
      price: basePrice * 1.25,
      features: [
        "Private accommodation",
        "All meals included",
        "Guided tour",
        "Transportation",
        "Evening entertainment",
      ],
    },
    {
      name: "Premium",
      description: "Luxury package with all amenities",
      price: basePrice * 1.5,
      features: [
        "Luxury accommodation",
        "All meals included",
        "Private guided tour",
        "Private transportation",
        "Evening entertainment",
        "Spa treatment",
      ],
    },
  ]

  for (const category of categories) {
    await db.insert(schema.packageCategories).values({
      packageId,
      name: category.name,
      description: category.description,
      price: category.price,
      features: JSON.stringify(category.features),
    })
  }
}

async function createBookings(touristIds, packageIds) {
  console.log("Creating bookings...")

  const bookingStatuses = ["pending", "confirmed", "completed"]

  for (let i = 0; i < touristIds.length; i++) {
    const touristId = touristIds[i]

    // Each tourist books 2-4 packages
    const numBookings = Math.floor(Math.random() * 3) + 2

    for (let j = 0; j < numBookings; j++) {
      const packageId = packageIds[(i + j) % packageIds.length]
      const status = bookingStatuses[Math.floor(Math.random() * bookingStatuses.length)]
      const quantity = Math.floor(Math.random() * 3) + 1

      // Get package price
      const [pkg] = await db
        .select()
        .from(schema.tourPackages)
        .where(({ id }) => id.equals(packageId))
        .limit(1)

      if (pkg) {
        const totalAmount = pkg.basePrice * quantity
        const discountAmount = Math.random() > 0.7 ? totalAmount * 0.1 : 0 // 30% chance of discount
        const finalAmount = totalAmount - discountAmount

        await db.insert(schema.bookings).values({
          touristId,
          packageId,
          quantity,
          totalAmount,
          discountAmount,
          finalAmount,
          status,
          paymentMethod: "Credit Card",
          paymentStatus: status !== "pending",
          paymentDetails: JSON.stringify({
            transactionId: `TXN-${Math.floor(Math.random() * 1000000)}`,
            paymentDate: new Date().toISOString(),
          }),
          specialRequests: Math.random() > 0.5 ? "Need vegetarian food options" : null,
          confirmedAt: status !== "pending" ? new Date() : null,
          completedAt: status === "completed" ? new Date() : null,
        })
      }
    }
  }

  console.log(`Created bookings for ${touristIds.length} tourists`)
}

async function createReviews(touristIds, packageIds) {
  console.log("Creating reviews...")

  const reviewComments = [
    "Amazing experience! The tour was well-organized and the guide was very knowledgeable.",
    "Great tour package. The accommodations were comfortable and the itinerary was well-planned.",
    "Excellent service! The staff was very professional and helpful throughout the trip.",
    "Beautiful destination and well-organized tour. Would definitely recommend to friends and family.",
    "Good value for money. The package included everything as advertised.",
    "The tour exceeded my expectations. The scenery was breathtaking and the activities were fun.",
    "A memorable experience with friendly locals and amazing food. Would definitely come back again.",
    "The tour guide was exceptional and made the trip special with their knowledge and enthusiasm.",
    "Perfect organization from start to finish. Everything went smoothly without any issues.",
    "The natural beauty of the location was stunning. The tour allowed us to experience it fully.",
  ]

  for (let i = 0; i < touristIds.length; i++) {
    const touristId = touristIds[i]

    // Each tourist reviews 2-3 packages
    const numReviews = Math.floor(Math.random() * 2) + 2

    for (let j = 0; j < numReviews; j++) {
      const packageId = packageIds[(i + j) % packageIds.length]
      const rating = Math.floor(Math.random() * 2) + 4 // Ratings between 4-5
      const commentIndex = Math.floor(Math.random() * reviewComments.length)

      await db.insert(schema.reviews).values({
        touristId,
        packageId,
        rating,
        comment: reviewComments[commentIndex],
      })
    }
  }

  console.log(`Created reviews from ${touristIds.length} tourists`)
}

async function createFavorites(touristIds, packageIds) {
  console.log("Creating favorites...")

  for (let i = 0; i < touristIds.length; i++) {
    const touristId = touristIds[i]

    // Each tourist has 3-5 favorite packages
    const numFavorites = Math.floor(Math.random() * 3) + 3
    const favoritePackages = new Set()

    while (favoritePackages.size < numFavorites) {
      const randomIndex = Math.floor(Math.random() * packageIds.length)
      favoritePackages.add(packageIds[randomIndex])
    }

    for (const packageId of favoritePackages) {
      await db.insert(schema.favorites).values({
        touristId,
        packageId,
      })
    }
  }

  console.log(`Created favorites for ${touristIds.length} tourists`)
}

async function createNotifications(adminIds, operatorIds, touristIds) {
  console.log("Creating notifications...")

  const allUserIds = await db.select({ id: schema.users.id }).from(schema.users)
  const userIds = allUserIds.map((user) => user.id)

  const notificationTypes = ["system", "package", "booking", "refund", "message"]
  const notificationTitles = {
    system: ["System Maintenance", "Account Verification", "Password Reset"],
    package: ["New Package Available", "Package Update", "Limited Seats Available"],
    booking: ["Booking Confirmed", "Booking Reminder", "Booking Cancelled"],
    refund: ["Refund Processed", "Refund Request Received", "Refund Status Update"],
    message: ["New Message", "Message Reply", "Tour Operator Message"],
  }
  const notificationMessages = {
    system: [
      "System maintenance scheduled for tonight. The site may be unavailable for a short period.",
      "Your account has been successfully verified.",
      "Your password has been reset successfully.",
    ],
    package: [
      "A new package matching your interests is now available.",
      "A package you were interested in has been updated.",
      "Only 5 seats left for the package you viewed recently.",
    ],
    booking: [
      "Your booking has been confirmed. Check your email for details.",
      "Your tour starts in 3 days. Make sure you're prepared!",
      "Your booking has been cancelled as requested.",
    ],
    refund: [
      "Your refund has been processed and will be credited to your account within 3-5 business days.",
      "We have received your refund request and are processing it.",
      "Your refund status has been updated. Check your account for details.",
    ],
    message: [
      "You have received a new message regarding your booking.",
      "The tour operator has replied to your message.",
      "You have a new message from the tour operator.",
    ],
  }

  for (const userId of userIds) {
    // Create 3-5 notifications per user
    const numNotifications = Math.floor(Math.random() * 3) + 3

    for (let i = 0; i < numNotifications; i++) {
      const typeIndex = Math.floor(Math.random() * notificationTypes.length)
      const type = notificationTypes[typeIndex]

      const titleIndex = Math.floor(Math.random() * notificationTitles[type].length)
      const title = notificationTitles[type][titleIndex]

      const messageIndex = Math.floor(Math.random() * notificationMessages[type].length)
      const message = notificationMessages[type][messageIndex]

      const isRead = Math.random() > 0.5 // 50% chance of being read

      await db.insert(schema.notifications).values({
        userId,
        type,
        title,
        message,
        isRead,
      })
    }
  }

  console.log(`Created notifications for ${userIds.length} users`)
}

async function createDiscountCodes(operatorIds) {
  console.log("Creating discount codes...")

  const discountCodes = ["SUMMER10", "WELCOME20", "HOLIDAY15", "SPECIAL25", "FLASH30"]
  const discountTypes = ["percentage", "fixed"]

  for (let i = 0; i < operatorIds.length; i++) {
    const operatorId = operatorIds[i]

    // Create 1-2 discount codes per operator
    const numCodes = Math.floor(Math.random() * 2) + 1

    for (let j = 0; j < numCodes; j++) {
      const codeIndex = (i + j) % discountCodes.length
      const code = discountCodes[codeIndex]

      const discountType = discountTypes[Math.floor(Math.random() * discountTypes.length)]
      const discountValue =
        discountType === "percentage" ? Math.floor(Math.random() * 20) + 5 : Math.floor(Math.random() * 1000) + 500

      const startDate = new Date()
      const endDate = new Date()
      endDate.setMonth(endDate.getMonth() + 1) // Valid for 1 month

      await db.insert(schema.discountCodes).values({
        operatorId,
        code: `${code}-${operatorId}`,
        description: `${code} discount for all packages`,
        discountType,
        discountValue,
        minPurchase: 5000,
        maxDiscount: 2000,
        startDate,
        endDate,
        usageLimit: 100,
        usageCount: 0,
        isActive: true,
      })
    }
  }

  console.log(`Created discount codes for ${operatorIds.length} operators`)
}

async function createUserSettings(userIds) {
  console.log("Creating user settings...")

  const themes = ["light", "dark", "system"]
  const languages = ["english", "bengali"]

  for (const userId of await db.select({ id: schema.users.id }).from(schema.users)) {
    const theme = themes[Math.floor(Math.random() * themes.length)]
    const language = languages[Math.floor(Math.random() * languages.length)]
    const emailNotifications = Math.random() > 0.2 // 80% chance of enabling
    const pushNotifications = Math.random() > 0.3 // 70% chance of enabling
    const marketingEmails = Math.random() > 0.7 // 30% chance of enabling

    await db.insert(schema.userSettings).values({
      userId: userId.id,
      theme,
      language,
      emailNotifications,
      pushNotifications,
      marketingEmails,
    })
  }

  console.log(`Created settings for all users`)
}

// Run the seed function if this script is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("Seed script completed successfully")
      process.exit(0)
    })
    .catch((error) => {
      console.error("Seed script failed:", error)
      process.exit(1)
    })
}
