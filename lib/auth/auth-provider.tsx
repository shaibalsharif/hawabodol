"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
// Comment out Firebase imports
// import { initializeApp } from "firebase/app"
// import {
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut as firebaseSignOut,
//   GoogleAuthProvider,
//   signInWithPopup,
//   sendPasswordResetEmail,
// } from "firebase/auth"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

// Firebase configuration - commented out
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// }

// Initialize Firebase - commented out
// let app
// let auth
// let googleProvider

// // Initialize Firebase only on client side
// if (typeof window !== "undefined") {
//   try {
//     app = initializeApp(firebaseConfig)
//     auth = getAuth(app)
//     googleProvider = new GoogleAuthProvider()
//   } catch (error) {
//     console.error("Firebase initialization error:", error)
//   }
// }

type UserProfile = {
  id: number
  userId: number
  name: string | null
  role: "admin" | "operator" | "tourist"
  status: "active" | "pending" | "suspended" | "inactive"
  profileImage: string | null
  firebaseUid: string | null
  phone: string | null
}

type User = {
  id: number
  email: string | null
  profile: UserProfile | null
}

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string, role: "operator" | "tourist") => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const LOCAL_STORAGE_USER_KEY = "hawabodol_user"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
      }
    }
    setLoading(false)
  }, [])

  // Comment out Firebase auth state listener
  // useEffect(() => {
  //   if (!auth) return

  //   const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  //     if (firebaseUser) {
  //       try {
  //         // Fetch user data from our API
  //         const response = await fetch(`/api/auth/user?uid=${firebaseUser.uid}`)

  //         if (response.ok) {
  //           const userData = await response.json()
  //           setUser(userData)
  //           // Store user in localStorage
  //           localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userData))

  //           toast({
  //             title: "Authenticated",
  //             description: "You are now signed in",
  //           })
  //         } else {
  //           // User exists in Firebase but not in our database
  //           setUser(null)
  //           localStorage.removeItem(LOCAL_STORAGE_USER_KEY)

  //           if (firebaseUser.email) {
  //             // Redirect to complete profile
  //             router.push("/complete-profile")
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user data:", error)
  //         setUser(null)
  //         localStorage.removeItem(LOCAL_STORAGE_USER_KEY)

  //         toast({
  //           title: "Authentication error",
  //           description: "Failed to fetch user data. Please try again.",
  //           variant: "destructive",
  //         })
  //       }
  //     } else {
  //       setUser(null)
  //       localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
  //     }

  //     setLoading(false)
  //   })

  //   return () => unsubscribe()
  // }, [router])

  const signIn = async (email: string, password: string) => {
    // if (!auth) throw new Error("Firebase auth not initialized")

    try {
      setLoading(true)
      // await signInWithEmailAndPassword(auth, email, password)

      // Use direct API call to our backend instead of Firebase
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Login failed")
      }

      const userData = await response.json()
      setUser(userData)
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userData))

      toast({
        title: "Signed in successfully",
        description: "Welcome back to হাওয়াবদল!",
      })

      return userData
    } catch (error: any) {
      console.error("Sign in error:", error)

      toast({
        title: "Sign in failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string, role: "operator" | "tourist") => {
    try {
      setLoading(true)

      // Create user directly in our database
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          role,
          password,
        }),
      })

      // Check if the response is ok before trying to parse JSON
      if (!response.ok) {
        const contentType = response.headers.get("content-type")

        // If the response is JSON, parse the error
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json()
          throw new Error(errorData.error || `Failed to create user account: ${response.status}`)
        } else {
          // If not JSON, use the status text
          throw new Error(`Failed to create user account: ${response.status} ${response.statusText}`)
        }
      }

      const userData = await response.json()
      setUser(userData.user)
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userData.user))

      toast({
        title: "Account created successfully",
        description:
          role === "operator" ? "Your account is pending approval from an administrator." : "Welcome to হাওয়াবদল!",
      })

      if (role === "operator") {
        router.push("/pending-approval")
      }

      return userData
    } catch (error: any) {
      console.error("Sign up error:", error)

      toast({
        title: "Sign up failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    // if (!auth || !googleProvider) throw new Error("Firebase auth not initialized")

    try {
      setLoading(true)
      // const result = await signInWithPopup(auth, googleProvider)

      // Show coming soon toast instead
      toast({
        title: "Coming Soon",
        description: "Google sign-in will be available soon!",
      })

      setLoading(false)

      // // Check if user exists in our database
      // const response = await fetch(`/api/auth/user?uid=${result.user.uid}`)

      // if (!response.ok) {
      //   // User doesn't exist in our database, redirect to complete profile
      //   router.push("/complete-profile")
      // } else {
      //   toast({
      //     title: "Signed in successfully",
      //     description: "Welcome back to হাওয়াবদল!",
      //   })
      // }
    } catch (error: any) {
      console.error("Google sign in error:", error)

      toast({
        title: "Google sign in failed",
        description: error.message || "An error occurred during Google sign in.",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    // if (!auth) throw new Error("Firebase auth not initialized")

    try {
      // await firebaseSignOut(auth)

      // Call our API to log out
      await fetch("/api/auth/logout", {
        method: "POST",
      })

      setUser(null)
      // Clear user from localStorage
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
      router.push("/")

      toast({
        title: "Signed out successfully",
        description: "You have been signed out of হাওয়াবদল.",
      })
    } catch (error: any) {
      console.error("Sign out error:", error)

      toast({
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out.",
        variant: "destructive",
      })
    }
  }

  const resetPassword = async (email: string) => {
    // if (!auth) throw new Error("Firebase auth not initialized")

    try {
      setLoading(true)
      // await sendPasswordResetEmail(auth, email)

      // Call our API to reset password
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to reset password")
      }

      toast({
        title: "Password reset email sent",
        description: "Please check your email for instructions to reset your password.",
      })
    } catch (error: any) {
      console.error("Password reset error:", error)

      toast({
        title: "Password reset failed",
        description: error.message || "An error occurred while sending the password reset email.",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
