import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRangeDate(range: string): string {
  const now = new Date()
  const start = new Date()

  switch (range) {
    case "7d":
      start.setDate(now.getDate() - 7)
      break
    case "30d":
      start.setDate(now.getDate() - 30)
      break
    case "90d":
      start.setDate(now.getDate() - 90)
      break
    case "1y":
      start.setFullYear(now.getFullYear() - 1)
      break
    default:
      start.setDate(now.getDate() - 7)
  }

  // return ISO string for Supabase filter
  return start.toISOString()
}
