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
    const storedCartItems = getCartItems()

    setProducts(storedProducts)
    setCartItems(storedCartItems)
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

  const getCartItems = () => {
    try {
      const storedCartItems = localStorage.getItem("CART_ITEMS")
      if (storedCartItems === null) {
        return []
      }
      return JSON.parse(storedCartItems) as z.infer<typeof productInfo>[]
    } catch (error) {
      console.log(error)
      return []
    }
  }

  const addToCart = (item: z.infer<typeof productInfo>) => {
    const newCart = [...cartItems, item]
    setCartItems(newCart)
    localStorage.setItem("CART_ITEMS", JSON.stringify(newCart))
  }

  const removeFromCart = (id: number) => {
    const newCart = JSON.parse(localStorage.getItem("CART_ITEMS")!) as z.infer<typeof productInfo>[]
    const indexToDelete = newCart.findIndex(obj => obj.id === id)
    if (indexToDelete !== -1) {
      newCart.splice(indexToDelete, 1)
    } else {
      console.log(`Item in cart with id ${id} does not exist`)
    }
    setCartItems(newCart)
    localStorage.setItem("CART_ITEMS", JSON.stringify(newCart))
  }

  const product = (item: z.infer<typeof productInfo>) => {
    return (
      <>
        <div className='border border-1 rounded-md h-[200px] w-[200px] m-auto flex flex-col justify-center text-center'>
          <span>Product image...</span>
        </div>
        <div className='flex justify-between'>
          <span>{item.productName}</span>
          <span>PHP {item.price}</span>
        </div>
        <div className="grid col-1 gap-4">
          <span className="text-[gray]">In stock: {item.numberInStock}</span>
          <Button onClick={() => addToCart(item)}>Add item</Button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='col-span-2 p-4 h-screen overflow-y-scroll' >
        <div className='flex flex-wrap justify-center gap-4'>
          {
            products.map((item, index) => {
              return (
                <div className='flex flex-col p-4 border border-1 rounded-lg w-max gap-2 h-fit' key={`${item.id}_${index}`}>
                  {product(item)}
                </div>
              )
            })
          }
        </div>
      </div >

      <div className='w-auto border border-l p-4 flex flex-col gap-4'>
        <span className='text-[gray]'>Order overview</span>
        <div className='flex flex-col justify-start p-4 gap-2 overflow-y-scroll h-[700px] border rounded-lg'>
          {cartItems.map((obj, index) => {
            return (
              <div key={`${obj.id}_${index}`}>
                <div className='flex justify-between w'>
                  <span>{obj.productName}</span>
                  <span>PHP {obj.price}</span>
                  <Button variant={"destructive"} onClick={() => removeFromCart(obj.id)}>Remove</Button>
                </div>
              </div>
            )
          })}
        </div>
        <span className='text-lg'>Total (without tax): PHP {
          cartItems.reduce((acc: number, obj: z.infer<typeof productInfo>) => {
            return acc + obj.price
          }, 0)
        }</span>
        <div>
          <Button className='w-full'>Confirm order</Button>
        </div>
      </div>
    </>
  )
}
