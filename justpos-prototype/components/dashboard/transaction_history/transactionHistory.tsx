'use client'

import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { orderSchema } from "@/lib/inferredTypes"
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useState } from 'react'
import * as z from 'zod'

export default function TransactionHistory() {
  const [completedOrders, setCompletedOrders] = useState<z.infer<typeof orderSchema>[]>([])

  useEffect(() => {
    const storedCompletedOrders = getSuccessfulOrders()
    setCompletedOrders(storedCompletedOrders)
  }, [])

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

  return (
    <div className="flex flex-col gap-4 h-[400px]">
      <Label htmlFor="transactions-table">Recent transactions</Label>
      <div className="flex justify-between p-4 border rounded-lg">
        <span>Transaction ID</span>
        <span>Status</span>
      </div>
      <Separator />
      <div className="border rounded-lg h-full overflow-y-scroll" id="transactions-table">
        {
          completedOrders.map((item, index) => {
            return (
              <div key={`${item.id}_${index}`} className="flex justify-between p-4">
                <span>{item.id}</span>
                <span className="font-bold">Successful</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
