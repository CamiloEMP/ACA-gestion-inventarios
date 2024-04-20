import { z } from 'zod'

export const ProductSchema = z.object({
  name: z.string().min(3).max(255),
  price: z.number().min(1),
  description: z.string().min(0).max(255).optional(),
  stock: z.number().int().min(1),
  image: z.string().url(),
  supplier: z.string().min(3).max(255),
  discount: z.number().int().min(0).max(100),
})

export type TProductSchema = z.infer<typeof ProductSchema>
