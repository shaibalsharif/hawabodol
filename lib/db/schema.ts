import { relations } from "drizzle-orm"
import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  json,
  uuid as pgUuid,
  decimal,
  pgEnum,
} from "drizzle-orm/pg-core"

// Enums
export const userRoleEnum = pgEnum("user_role", ["admin", "operator", "tourist"])
export const userStatusEnum = pgEnum("user_status", ["active", "pending", "suspended", "inactive"])
export const packageStatusEnum = pgEnum("package_status", ["draft", "published", "closed", "cancelled"])
export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
  "refunded",
])
export const notificationTypeEnum = pgEnum("notification_type", ["system", "package", "booking", "refund", "message"])

// Base Users table (authentication only)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uuid: pgUuid("uuid").defaultRandom().notNull().unique(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  name: varchar("name", { length: 255 }),
  role: userRoleEnum("role"),
  status: userStatusEnum("status"),
  profileImage: varchar("profile_image", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  firebaseUid: varchar("firebase_uid", { length: 255 }).unique(),
  address: text("address"),
  emergencyContact: varchar("emergency_contact", { length: 255 }),
})

// User relations
export const usersRelations = relations(users, ({ one }) => ({
  admin: one(adminProfiles, { fields: [users.id], references: [adminProfiles.userId] }),
  operator: one(operatorProfiles, { fields: [users.id], references: [operatorProfiles.userId] }),
  tourist: one(touristProfiles, { fields: [users.id], references: [touristProfiles.userId] }),
}))

// Admin Profiles table
export const adminProfiles = pgTable("admin_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  role: userRoleEnum("role").notNull().default("admin"),
  status: userStatusEnum("status").notNull().default("active"),
  profileImage: varchar("profile_image", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  firebaseUid: varchar("firebase_uid", { length: 255 }).unique(),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Admin Profile relations
export const adminProfilesRelations = relations(adminProfiles, ({ one }) => ({
  user: one(users, {
    fields: [adminProfiles.userId],
    references: [users.id],
  }),
}))

// Operator Profiles table
export const operatorProfiles = pgTable("operator_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  companyLogo: varchar("company_logo", { length: 255 }),
  coverImage: varchar("cover_image", { length: 255 }),
  description: text("description"),
  address: text("address"),
  phone: varchar("phone", { length: 20 }),
  website: varchar("website", { length: 255 }),
  role: userRoleEnum("role").notNull().default("operator"),
  status: userStatusEnum("status").notNull().default("pending"),
  verificationStatus: boolean("verification_status").default(false).notNull(),
  verifiedAt: timestamp("verified_at"),
  rating: decimal("rating", { precision: 3, scale: 1 }),
  reviewCount: integer("review_count").default(0),
  firebaseUid: varchar("firebase_uid", { length: 255 }).unique(),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Operator Profile relations
export const operatorProfilesRelations = relations(operatorProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [operatorProfiles.userId],
    references: [users.id],
  }),
  tourPackages: many(tourPackages),
}))

// Tourist Profiles table
export const touristProfiles = pgTable("tourist_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  profileImage: varchar("profile_image", { length: 255 }),
  address: text("address"),
  phone: varchar("phone", { length: 20 }),
  emergencyContact: varchar("emergency_contact", { length: 255 }),
  role: userRoleEnum("role").notNull().default("tourist"),
  status: userStatusEnum("status").notNull().default("active"),
  firebaseUid: varchar("firebase_uid", { length: 255 }).unique(),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Tourist Profile relations
export const touristProfilesRelations = relations(touristProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [touristProfiles.userId],
    references: [users.id],
  }),
  bookings: many(bookings),
  favorites: many(favorites),
}))

// Tour Packages table
export const tourPackages = pgTable("tour_packages", {
  id: serial("id").primaryKey(),
  uuid: pgUuid("uuid").defaultRandom().notNull().unique(),
  operatorId: integer("operator_id")
    .notNull()
    .references(() => operatorProfiles.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  coverImage: varchar("cover_image", { length: 255 }),
  images: json("images").$type<string[]>(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  totalSeats: integer("total_seats").notNull(),
  availableSeats: integer("available_seats").notNull(),
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  status: packageStatusEnum("status").notNull().default("draft"),
  isRefundable: boolean("is_refundable").default(false).notNull(),
  refundPolicy: text("refund_policy"),
  rules: text("rules"),
  featured: boolean("featured").default(false),
  rating: decimal("rating", { precision: 3, scale: 1 }),
  reviewCount: integer("review_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
  closedAt: timestamp("closed_at"),
})

// Tour Package relations
export const tourPackagesRelations = relations(tourPackages, ({ one, many }) => ({
  operator: one(operatorProfiles, {
    fields: [tourPackages.operatorId],
    references: [operatorProfiles.id],
  }),
  packageCategories: many(packageCategories),
  bookings: many(bookings),
  reviews: many(reviews),
  favorites: many(favorites),
}))

// Package Categories table
export const packageCategories = pgTable("package_categories", {
  id: serial("id").primaryKey(),
  packageId: integer("package_id")
    .notNull()
    .references(() => tourPackages.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  images: json("images").$type<string[]>(),
  features: json("features").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Package Category relations
export const packageCategoriesRelations = relations(packageCategories, ({ one }) => ({
  package: one(tourPackages, {
    fields: [packageCategories.packageId],
    references: [tourPackages.id],
  }),
}))

// Bookings table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  uuid: pgUuid("uuid").defaultRandom().notNull().unique(),
  touristId: integer("tourist_id")
    .notNull()
    .references(() => touristProfiles.id, { onDelete: "cascade" }),
  packageId: integer("package_id")
    .notNull()
    .references(() => tourPackages.id, { onDelete: "cascade" }),
  categoryId: integer("category_id").references(() => packageCategories.id),
  quantity: integer("quantity").notNull().default(1),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  discountAmount: decimal("discount_amount", { precision: 10, scale: 2 }).default("0"),
  finalAmount: decimal("final_amount", { precision: 10, scale: 2 }).notNull(),
  status: bookingStatusEnum("status").notNull().default("pending"),
  paymentMethod: varchar("payment_method", { length: 50 }),
  paymentStatus: boolean("payment_status").default(false).notNull(),
  paymentDetails: json("payment_details"),
  specialRequests: text("special_requests"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  confirmedAt: timestamp("confirmed_at"),
  cancelledAt: timestamp("cancelled_at"),
  completedAt: timestamp("completed_at"),
})

// Booking relations
export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  tourist: one(touristProfiles, {
    fields: [bookings.touristId],
    references: [touristProfiles.id],
  }),
  package: one(tourPackages, {
    fields: [bookings.packageId],
    references: [tourPackages.id],
  }),
  category: one(packageCategories, {
    fields: [bookings.categoryId],
    references: [packageCategories.id],
  }),
  refundRequest: many(refundRequests),
}))

// Favorites table
export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  touristId: integer("tourist_id")
    .notNull()
    .references(() => touristProfiles.id, { onDelete: "cascade" }),
  packageId: integer("package_id")
    .notNull()
    .references(() => tourPackages.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Favorites relations
export const favoritesRelations = relations(favorites, ({ one }) => ({
  tourist: one(touristProfiles, {
    fields: [favorites.touristId],
    references: [touristProfiles.id],
  }),
  package: one(tourPackages, {
    fields: [favorites.packageId],
    references: [tourPackages.id],
  }),
}))

// Refund Requests table
export const refundRequests = pgTable("refund_requests", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id")
    .notNull()
    .references(() => bookings.id, { onDelete: "cascade" }),
  touristId: integer("tourist_id")
    .notNull()
    .references(() => touristProfiles.id, { onDelete: "cascade" }),
  reason: text("reason").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  processedBy: integer("processed_by").references(() => adminProfiles.id),
  rejectionReason: text("rejection_reason"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  processedAt: timestamp("processed_at"),
})

// Refund Request relations
export const refundRequestsRelations = relations(refundRequests, ({ one }) => ({
  booking: one(bookings, {
    fields: [refundRequests.bookingId],
    references: [bookings.id],
  }),
  tourist: one(touristProfiles, {
    fields: [refundRequests.touristId],
    references: [touristProfiles.id],
  }),
  processor: one(adminProfiles, {
    fields: [refundRequests.processedBy],
    references: [adminProfiles.id],
  }),
}))

// Reviews table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  packageId: integer("package_id")
    .notNull()
    .references(() => tourPackages.id, { onDelete: "cascade" }),
  touristId: integer("tourist_id")
    .notNull()
    .references(() => touristProfiles.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Review relations
export const reviewsRelations = relations(reviews, ({ one }) => ({
  package: one(tourPackages, {
    fields: [reviews.packageId],
    references: [tourPackages.id],
  }),
  tourist: one(touristProfiles, {
    fields: [reviews.touristId],
    references: [touristProfiles.id],
  }),
}))

// Discount Codes table
export const discountCodes = pgTable("discount_codes", {
  id: serial("id").primaryKey(),
  operatorId: integer("operator_id")
    .notNull()
    .references(() => operatorProfiles.id, { onDelete: "cascade" }),
  code: varchar("code", { length: 50 }).notNull().unique(),
  description: text("description"),
  discountType: varchar("discount_type", { length: 20 }).notNull(), // percentage, fixed
  discountValue: decimal("discount_value", { precision: 10, scale: 2 }).notNull(),
  minPurchase: decimal("min_purchase", { precision: 10, scale: 2 }),
  maxDiscount: decimal("max_discount", { precision: 10, scale: 2 }),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  usageLimit: integer("usage_limit"),
  usageCount: integer("usage_count").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Discount Code relations
export const discountCodesRelations = relations(discountCodes, ({ one }) => ({
  operator: one(operatorProfiles, {
    fields: [discountCodes.operatorId],
    references: [operatorProfiles.id],
  }),
}))

// Reports table
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  packageId: integer("package_id").references(() => tourPackages.id, { onDelete: "cascade" }),
  touristId: integer("tourist_id")
    .notNull()
    .references(() => touristProfiles.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  resolvedBy: integer("resolved_by").references(() => adminProfiles.id),
  resolution: text("resolution"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at"),
})

// Report relations
export const reportsRelations = relations(reports, ({ one }) => ({
  package: one(tourPackages, {
    fields: [reports.packageId],
    references: [tourPackages.id],
  }),
  tourist: one(touristProfiles, {
    fields: [reports.touristId],
    references: [touristProfiles.id],
  }),
  resolver: one(adminProfiles, {
    fields: [reports.resolvedBy],
    references: [adminProfiles.id],
  }),
}))

// Notifications table
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: notificationTypeEnum("type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  data: json("data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Notification relations
export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}))

// Site Settings table
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: json("value").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// User Settings table
export const userSettings = pgTable("user_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  theme: varchar("theme", { length: 20 }).default("system"),
  language: varchar("language", { length: 20 }).default("english"),
  emailNotifications: boolean("email_notifications").default(true),
  pushNotifications: boolean("push_notifications").default(true),
  marketingEmails: boolean("marketing_emails").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// User Settings relations
export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(users, {
    fields: [userSettings.userId],
    references: [users.id],
  }),
}))
