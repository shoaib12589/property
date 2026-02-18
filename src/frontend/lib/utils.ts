import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Dummy avatar URL from DiceBear (consistent per seed). Use for user/agent placeholders. */
export function getAvatarUrl(seed: string, size = 128): string {
  return `https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(seed)}&size=${size}`
}
