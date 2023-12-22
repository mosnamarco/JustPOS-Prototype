'use client'

import React, { useEffect, useState } from 'react'
import { orderSchema, productInfo } from '@/lib/inferredTypes'
import * as z from 'zod'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const [products, setProducts] = useState<z.infer<typeof productInfo>[]>([])
  const [cartItems, setCartItems] = useState<z.infer<typeof productInfo>[]>([])
  const [orders, setOrderHistory] = useState<z.infer<typeof orderSchema>[]>([])
  const [orderPlaced, setOrderPlaced] = useState<boolean>()

  useEffect(() => {
    const storedProducts = getProduct()
    const storedCartItems = getCartItems()
    const storedOrderHistory = getOrderHistory()

    setProducts(storedProducts)
    setCartItems(storedCartItems)
    setOrderHistory(storedOrderHistory)
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

  const getOrderHistory = () => {
    try {
      const storedOrderHistory = localStorage.getItem("ORDER_HISTORY")
      if (storedOrderHistory === null) {
        return []
      }
      return JSON.parse(storedOrderHistory) as z.infer<typeof orderSchema>[]
    } catch (error) {
      console.log(error)
      return []
    }
  }

  const processOrder = () => {
    const newOrder: z.infer<typeof orderSchema> = {
      id: Date.now(),
      products: cartItems
    }

    const newOrders = [...orders, newOrder]
    setOrderHistory(newOrders)

    localStorage.setItem("ORDER_HISTORY", JSON.stringify(newOrders))

    setOrderPlaced(true)
    setCartItems([])
    localStorage.removeItem("CART_ITEMS")

    toast({
      title: "Order processing",
      description: `Order with the ID:${newOrder.id} is now being processed`,
    })

    router.push(`/dashboard/order/process/${newOrder.id}`)
  }

  const createNewOrder = () => {
    setCartItems([])
    setOrderPlaced(false)
    localStorage.removeItem("CART_ITEMS")
    console.log(orderPlaced)
  }

  const confirmOrder = () => {
    return (
      <>
        <Dialog>
          <DialogTrigger disabled={cartItems.length <= 0 || orderPlaced} className={buttonVariants({ variant: "default", size: "lg" })}>Confirm order</DialogTrigger>
          <DialogContent>
            <DialogDescription>Check if order is accurate</DialogDescription>
            <div className='overflow-y-scroll max-h-[600px] p-4 grid gap-4'>
              <div>
                {cartItems.map((obj, index) => {
                  return (
                    <div key={`${obj.id}_${index}`}>
                      <div className='flex justify-between w'>
                        <span>{obj.productName}</span>
                        <span>PHP {obj.price}</span>
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
              <Button className='w-full' onClick={() => processOrder()} disabled={orderPlaced}>Place order</Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  const product = (item: z.infer<typeof productInfo>) => {
    return (
      <>
        <div className='border border-1 rounded-md h-[200px] w-[200px] m-auto flex flex-col justify-center text-center'>
          <span className='text-[gray]'>Product image...</span>
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
        <div className='grid gap-4'>
          {confirmOrder()}
          <Button className='w-full' disabled={!orderPlaced} onClick={() => createNewOrder()}>Create new order</Button>
        </div>
      </div>
    </>
  )
}
