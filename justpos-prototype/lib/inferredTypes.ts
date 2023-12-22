import * as z from "zod"

export const productSchema = z.object({
  productName: z.string(),
  numberInStock: z.coerce.number(),
  price: z.coerce.number(),
  productImage: z.string(),
})

export const productInfo = productSchema.extend({
  id: z.number(),
})

export const orderSchema = z.object({
  id: z.coerce.number(),
  products: z.array(productSchema),
  // orderDate: z.date()
})