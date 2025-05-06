"use client"

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    revenue: 25000,
    bookings: 12,
  },
  {
    name: "Feb",
    revenue: 32000,
    bookings: 15,
  },
  {
    name: "Mar",
    revenue: 28000,
    bookings: 13,
  },
  {
    name: "Apr",
    revenue: 35000,
    bookings: 18,
  },
  {
    name: "May",
    revenue: 42000,
    bookings: 22,
  },
  {
    name: "Jun",
    revenue: 38000,
    bookings: 20,
  },
]

export function OperatorStats() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="revenue"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.2}
          name="Revenue (৳)"
        />
        <Area
          yAxisId="right"
          type="monotone"
          dataKey="bookings"
          stroke="#10b981"
          fill="#10b981"
          fillOpacity={0.2}
          name="Bookings"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
