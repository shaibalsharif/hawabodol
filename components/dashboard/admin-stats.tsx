"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    users: 45,
    operators: 2,
    packages: 12,
    bookings: 35,
  },
  {
    name: "Feb",
    users: 52,
    operators: 1,
    packages: 15,
    bookings: 42,
  },
  {
    name: "Mar",
    users: 61,
    operators: 3,
    packages: 18,
    bookings: 55,
  },
  {
    name: "Apr",
    users: 67,
    operators: 2,
    packages: 22,
    bookings: 63,
  },
  {
    name: "May",
    users: 75,
    operators: 4,
    packages: 25,
    bookings: 72,
  },
  {
    name: "Jun",
    users: 87,
    operators: 2,
    packages: 30,
    bookings: 85,
  },
]

export function AdminStats() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="users" fill="#3b82f6" name="New Users" />
        <Bar dataKey="operators" fill="#10b981" name="New Operators" />
        <Bar dataKey="packages" fill="#f59e0b" name="New Packages" />
        <Bar dataKey="bookings" fill="#8b5cf6" name="New Bookings" />
      </BarChart>
    </ResponsiveContainer>
  )
}
