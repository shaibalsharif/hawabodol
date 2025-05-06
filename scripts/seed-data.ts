import { db } from "../lib/db"
import {
  users,
  tourOperators,
  tourPackages,
  packageCategories,
  bookings,
  reviews,
  notifications,
  discountCodes,
} from "../lib/db/schema"
import { hash } from "bcrypt"

export async function runSeedData() {
  try {
    // Clear existing data (be careful with this in production!)
    await clearExistingData()

    // Create sample users
    const userIds = await createSampleUsers()

    // Create sample tour operators
    const operatorIds = await createSampleOperators(userIds.operatorUsers)

    // Create sample tour packages
    const packageIds = await createSamplePackages(operatorIds)

    // Create sample bookings
    await createSampleBookings(userIds.touristUsers, packageIds)

    // Create sample reviews
    await createSampleReviews(userIds.touristUsers, packageIds)

    // Create sample notifications
    await createSampleNotifications(userIds.allUsers)

    // Create sample discount codes
    await createSampleDiscountCodes(operatorIds)

    console.log("Sample data created successfully")
  } catch (error) {
    console.error("Error creating sample data:", error)
    throw error
  }
}

async function clearExistingData() {
  // Delete in reverse order of dependencies
  await db.delete(notifications)
  await db.delete(reviews)
  await db.delete(bookings)
  await db.delete(packageCategories)
  await db.delete(tourPackages)
  await db.delete(tourOperators)
  await db.delete(users)
  await db.delete(discountCodes)
}

async function createSampleUsers() {
  const adminUsers = []
  const operatorUsers = []
  const touristUsers = []
  const allUsers = []

  // Create admin user
  const [admin] = await db
    .insert(users)
    .values({
      email: "admin@hawabodol.com",
      password: await hash("admin123", 10),
      name: "System Admin",
      role: "admin",
      status: "active",
      profileImage: "/placeholder.svg?height=200&width=200",
      firebaseUid: "admin-firebase-uid-1",
    })
    .returning()

  adminUsers.push(admin.id)
  allUsers.push(admin.id)

  // Create operator users
  const operatorNames = ["Bangladesh Adventures", "Cox's Travel Agency", "Dhaka Tours"]

  for (let i = 0; i < operatorNames.length; i++) {
    const [operator] = await db
      .insert(users)
      .values({
        email: `operator${i + 1}@hawabodol.com`,
        password: await hash("operator123", 10),
        name: operatorNames[i],
        role: "operator",
        status: "active",
        profileImage: `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(operatorNames[i])}`,
        firebaseUid: `operator-firebase-uid-${i + 1}`,
      })
      .returning()

    operatorUsers.push(operator.id)
    allUsers.push(operator.id)
  }

  // Create tourist users
  const touristNames = ["John Doe", "Jane Smith", "Ahmed Khan", "Fatima Rahman", "Kamal Hossain"]

  for (let i = 0; i < touristNames.length; i++) {
    const [tourist] = await db
      .insert(users)
      .values({
        email: `tourist${i + 1}@example.com`,
        password: await hash("tourist123", 10),
        name: touristNames[i],
        role: "tourist",
        status: "active",
        profileImage: `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(touristNames[i])}`,
        firebaseUid: `tourist-firebase-uid-${i + 1}`,
      })
      .returning()

    touristUsers.push(tourist.id)
    allUsers.push(tourist.id)
  }

  console.log(
    `Created ${adminUsers.length} admin users, ${operatorUsers.length} operator users, and ${touristUsers.length} tourist users`,
  )

  return { adminUsers, operatorUsers, touristUsers, allUsers }
}

async function createSampleOperators(operatorUserIds: number[]) {
  const operatorIds = []

  const companyNames = ["Bangladesh Adventures", "Cox's Travel Agency", "Dhaka Tours"]

  for (let i = 0; i < operatorUserIds.length; i++) {
    const [operator] = await db
      .insert(tourOperators)
      .values({
        userId: operatorUserIds[i],
        companyName: companyNames[i],
        companyLogo: `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(companyNames[i])}`,
        description: `${companyNames[i]} is a leading tour operator in Bangladesh, offering exceptional travel experiences.`,
        website: `www.${companyNames[i].toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
        verificationStatus: true,
        verifiedAt: new Date(),
      })
      .returning()

    operatorIds.push(operator.id)
  }

  console.log(`Created ${operatorIds.length} tour operators`)

  return operatorIds
}

async function createSamplePackages(operatorIds: number[]) {
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
  ]

  // Distribute packages among operators
  for (let i = 0; i < packageData.length; i++) {
    const operatorIndex = i % operatorIds.length
    const startDate = new Date()
    startDate.setDate(startDate.getDate() + 15 + i * 5) // Start dates 15, 20, 25... days from now

    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + packageData[i].duration.days - 1)

    const [pkg] = await db
      .insert(tourPackages)
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
        status: "published",
        isRefundable: true,
        refundPolicy: "Cancellations made 7 days or more before the tour start date are eligible for a full refund.",
        rules: "Participants must follow the guide's instructions at all times. No littering.",
        publishedAt: new Date(),
      })
      .returning()

    packageIds.push(pkg.id)

    // Create package categories
    await createPackageCategories(pkg.id, packageData[i].basePrice)
  }

  console.log(`Created ${packageIds.length} tour packages with categories`)

  return packageIds
}

async function createPackageCategories(packageId: number, basePrice: number) {
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
    await db.insert(packageCategories).values({
      packageId,
      name: category.name,
      description: category.description,
      price: category.price,
      features: JSON.stringify(category.features),
    })
  }
}

async function createSampleBookings(touristUserIds: number[], packageIds: number[]) {
  const bookingStatuses = ["pending", "confirmed", "completed"]

  for (let i = 0; i < touristUserIds.length; i++) {
    const userId = touristUserIds[i]

    // Each tourist books 1-3 packages
    const numBookings = Math.floor(Math.random() * 3) + 1

    for (let j = 0; j < numBookings; j++) {
      const packageId = packageIds[(i + j) % packageIds.length]
      const status = bookingStatuses[Math.floor(Math.random() * bookingStatuses.length)]
      const quantity = Math.floor(Math.random() * 3) + 1

      // Get package price
      const pkg = await db.query.tourPackages.findFirst({
        where: (packages, { eq }) => eq(packages.id, packageId),
      })

      if (pkg) {
        const totalAmount = pkg.basePrice * quantity
        const discountAmount = Math.random() > 0.7 ? totalAmount * 0.1 : 0 // 30% chance of discount
        const finalAmount = totalAmount - discountAmount

        const [booking] = await db
          .insert(bookings)
          .values({
            userId,
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
            confirmedAt: status !== "pending" ? new Date() : null,
            completedAt: status === "completed" ? new Date() : null,
          })
          .returning()
      }
    }
  }

  console.log(`Created bookings for ${touristUserIds.length} tourists`)
}

async function createSampleReviews(touristUserIds: number[], packageIds: number[]) {
  const reviewComments = [
    "Amazing experience! The tour was well-organized and the guide was very knowledgeable.",
    "Great tour package. The accommodations were comfortable and the itinerary was well-planned.",
    "Excellent service! The staff was very professional and helpful throughout the trip.",
    "Beautiful destination and well-organized tour. Would definitely recommend to friends and family.",
    "Good value for money. The package included everything as advertised.",
  ]

  for (let i = 0; i < touristUserIds.length; i++) {
    const userId = touristUserIds[i]

    // Each tourist reviews 1-2 packages
    const numReviews = Math.floor(Math.random() * 2) + 1

    for (let j = 0; j < numReviews; j++) {
      const packageId = packageIds[(i + j) % packageIds.length]
      const rating = Math.floor(Math.random() * 2) + 4 // Ratings between 4-5
      const commentIndex = Math.floor(Math.random() * reviewComments.length)

      await db.insert(reviews).values({
        userId,
        packageId,
        rating,
        comment: reviewComments[commentIndex],
      })
    }
  }

  console.log(`Created reviews from ${touristUserIds.length} tourists`)
}

async function createSampleNotifications(userIds: number[]) {
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

      await db.insert(notifications).values({
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

async function createSampleDiscountCodes(operatorIds: number[]) {
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

      await db.insert(discountCodes).values({
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
