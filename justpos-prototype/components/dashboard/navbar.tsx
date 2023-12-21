'use client'

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"

export default function Navbar() {
  return (
    <div className="flex flex-col w-[10rem] gap-4">
      <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>Home</Link>
      {/* <Link href="/dashboard/invoice" className={buttonVariants({ variant: "ghost" })}>Invoice</Link> */}
      <Link href="/dashboard/order" className={buttonVariants({ variant: "ghost" })}>Create order</Link>
      {/* <Link href="/dashboard/analytics" className={buttonVariants({ variant: "ghost" })}>Analytics</Link> */}
      <Link href="/dashboard/products" className={buttonVariants({ variant: "ghost" })}>Products</Link>
    </div>
  )
}