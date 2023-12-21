'use client'

import React, { useEffect, useState } from 'react'
import { productInfo } from '@/lib/inferredTypes'
import * as z from 'zod'
import { Button } from '@/components/ui/button'

export default function Page() {
  const [products, setProducts] = useState<z.infer<typeof productInfo>[]>([])
  const [cartItems, setCartItems] = useState<z.infer<typeof productInfo>[]>([])

  useEffect(() => {
    const storedProducts = getProduct()
    // console.log(storedProducts)
    setProducts(storedProducts)
  }, [])

  function getProduct() {
    try {
      const storedProducts = localStorage.getItem("PRODUCTS")
      if (storedProducts === null) {
        return []
      }
      return JSON.parse(storedProducts) as z.infer<typeof productInfo>[]
    } catch (error) {
      console.log(error)
      return []
    }
  }

  const addToCart = (item: z.infer<typeof productInfo>) => {
    alert(item)
  }

  const product = (item: z.infer<typeof productInfo>) => {
    return (
      <>
        <div className='flex flex-col p-4 border border-1 rounded-lg w-max gap-2 h-fit' key={item.id}>
          <div className='border border-1 rounded-md h-[200px] w-[200px] m-auto flex flex-col justify-center text-center'>
            <span>Product image...</span>
          </div>
          <div className='flex justify-between'>
            <span>{item.productName}</span>
            <span>$ {item.price}</span>
          </div>
          <div className="grid col-1 gap-4">
            <span className="text-[gray]">In stock: {item.numberInStock}</span>
            <Button onClick={() => addToCart(item)}>Add item</Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='col-span-2 p-4 h-screen overflow-y-scroll' >
      <div className='flex flex-wrap justify-center gap-4'>
        {
          products.map((obj) => {
            return (product(obj))
          })
        }
      </div>
    </div >
  )
}
