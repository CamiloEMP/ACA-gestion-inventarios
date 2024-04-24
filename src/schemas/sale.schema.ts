import { z } from 'zod'

export const SaleSchema = z.object({
  id: z.string(),
  date: z.string(),
  products: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
    }),
  ),
})

export type TSaleSchema = z.infer<typeof SaleSchema>
