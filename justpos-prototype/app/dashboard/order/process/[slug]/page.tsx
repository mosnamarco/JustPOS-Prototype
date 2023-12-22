'use client'

import { orderSchema } from "@/lib/inferredTypes"
import { useEffect, useState } from "react"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"


export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [order, setOrder] = useState<z.infer<typeof orderSchema>>()
  const [completedOrders, setCompletedOrders] = useState<z.infer<typeof orderSchema>[]>([])
  const [disable, setDisable] = useState<boolean>(false)

  useEffect(() => {
    const storedOrderHistory = JSON.parse(localStorage.getItem("ORDER_HISTORY")!) as z.infer<typeof orderSchema>[]
    const storedCompletedOrders = getSuccessfulOrders()

    setCompletedOrders(storedCompletedOrders)
    getOrder(storedOrderHistory, params.slug)
  }, [])

  const getOrder = (orderHistory: z.infer<typeof orderSchema>[], id: string): z.infer<typeof orderSchema> | null => {
    orderHistory.forEach((obj) => {
      if (obj.id === parseInt(id)) {
        console.log(obj)
        setOrder(obj)
      }
    })

    return null
  }

  const getSuccessfulOrders = () => {
    try {
      const storedCompletedOrders = localStorage.getItem("COMPLETED_ORDERS")
      if (storedCompletedOrders === null) {
        return []
      }
      return JSON.parse(storedCompletedOrders) as z.infer<typeof orderSchema>[]
    } catch (error) {
      console.log(error)
      return []
    }
  }

  const saveOrder = async () => {
    const newCompletedOrders = [...completedOrders, order!]
    setCompletedOrders(newCompletedOrders)
    localStorage.setItem("COMPLETED_ORDERS", JSON.stringify(newCompletedOrders))

    toast({
      title: "Order confirmed",
      description: "Thank you for placing an order, now redirecting you home page"
    })

    setDisable(true)

    router.push(`/dashboard/`)
  }

  const confirmPayment = () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="default" disabled={disable}>Confirm payment</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm payment?</AlertDialogTitle>
            <AlertDialogDescription>
              This action is permanent, to revert, customer must issue a refund request
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => saveOrder()}>Confirm payment</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <div className="col-span-3 p-4">
      {order != null ?
        <div className="grid gap-4">
          <div className="flex justify-between border rounded-lg p-4">
            <span>Product name</span>
            <span>Price</span>
          </div>
          <Separator />
          <div className="overflow-y-scroll h-[400px] p-4 border rounded-lg">
            {
              order.products.map((item, index) => {
                return (
                  <div className="flex justify-between" key={`${item.productName}_${index}`}>
                    <span className="font-medium">{item.productName}</span>
                    <span>PHP {item.price}</span>
                  </div>
                )
              })
            }
          </div>
          <div className="flex flex-col w-full gap-4">
            <Button disabled={true}>Payment type</Button>
            {confirmPayment()}
          </div>
        </div>
        :
        <h1>Order not found</h1>
      }
    </div>
  )
}