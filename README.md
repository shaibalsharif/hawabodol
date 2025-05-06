# হাওয়াবদল (Hawabodol) - Travel & Tour Packages Platform

A comprehensive web application for travel and tour packages in Bangladesh, connecting tourists with tour operators.

## Features

- **User Authentication**: Login, registration, and password recovery
- **Multiple User Roles**: System Admin, Tour Operator, and Tourist
- **Tour Package Management**: Create, update, and manage tour packages
- **Booking System**: Book tour packages and manage bookings
- **Reviews & Ratings**: Leave reviews and ratings for tour packages
- **Admin Dashboard**: Manage users, operators, and packages
- **Operator Dashboard**: Manage packages, bookings, and customers
- **Tourist Dashboard**: View bookings, favorites, and payments
- **Responsive Design**: Mobile-friendly interface
- **Dark/Light Mode**: Theme toggle for better user experience

## Tech Stack

- **Frontend**: Next.js 13 (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: NeonDB (PostgreSQL)
- **ORM**: Drizzle ORM
- **Authentication**: Firebase Authentication
- **Charts**: Recharts
- **UI Components**: shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or NeonDB account)
- Firebase project

### Environment Setup

1. Clone the repository
2. Create a `.env.local` file in the root directory with the following variables:

\`\`\`env
# Database Configuration
db_url="postgresql://username:password@hostname:port/database"

# Firebase Configuration
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@project-id.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----"

# Public Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"

# NextAuth Configuration
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

### Installation

\`\`\`bash
# Install dependencies
npm install

# Run database migrations
npm run migrate

# Seed the database with sample data
npm run seed

# Start the development server
npm run dev
\`\`\`

### Database Management

\`\`\`bash
# Run database migrations
npm run migrate

# Seed the database with sample data
npm run seed

# Open Drizzle Studio to manage the database
npm run studio
\`\`\`

## Sample Users

After running the seed script, you can log in with the following credentials:

### Admin
- Email: admin@hawabodol.com
- Password: admin123

### Tour Operator
- Email: operator1@hawabodol.com
- Password: operator123

### Tourist
- Email: tourist1@example.com
- Password: tourist123

## Project Structure

\`\`\`
hawabodol/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authentication pages
│   ├── (dashboard)/        # Dashboard pages
│   ├── api/                # API routes
│   └── ...                 # Other pages
├── components/             # React components
│   ├── dashboard/          # Dashboard components
│   ├── layout/             # Layout components
│   ├── packages/           # Package-related components
│   ├── ui/                 # UI components (shadcn/ui)
│   └── ...                 # Other components
├── lib/                    # Utility functions and libraries
│   ├── auth/               # Authentication utilities
│   ├── db/                 # Database utilities
│   └── ...                 # Other utilities
├── public/                 # Static files
├── scripts/                # Database scripts
└── ...                     # Configuration files
\`\`\`

## License

This project is licensed under the MIT License.
\`\`\`

I've addressed all the issues you mentioned:

1. **Individual operator page**: Created the `/operators/[id]` page to display detailed information about each tour operator, including their packages and reviews.

2. **Sample environment variables**: Provided a comprehensive `.env` setup guide with all required variables for Firebase, NeonDB, and other services, clearly marking which ones need NEXT_PUBLIC_ prefix.

3. **Sample data and database scripts**: Created three scripts:
   - `migrate-db.ts` - For running database migrations
   - `seed-data.ts` - For populating the database with sample data for all user roles
   - `studio.ts` - For launching Drizzle Studio to manage the database

4. **API routes**: Added and fixed API routes for:
   - Packages listing and details
   - Operators listing and details
   - Bookings management
   - Notifications handling

I've also included a comprehensive README file with setup instructions, project structure, and sample user credentials.

Is there anything specific you'd like me to explain or modify further?
