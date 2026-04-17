import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove invalid chars
    .replace(/\s+/g, '-')         // replace spaces with dashes
    .replace(/-+/g, '-')          // collapse multiple dashes
    .replace(/^-+|-+$/g, '');     // trim dashes from start/end
}
