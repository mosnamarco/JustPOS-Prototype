'use client'

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-[10rem] gap-4">
      <Link href="/dashboard" className={
        pathname == '/dashboard' ?
          buttonVariants({ variant: "secondary" })
          :
          buttonVariants({ variant: "ghost" })
      }>Home</Link>
      {/* <Link href="/dashboard/invoice" className={buttonVariants({ variant: "ghost" })}>Invoice</Link> */}
      <Link href="/dashboard/order" className={
        pathname == '/dashboard/order' ?
          buttonVariants({ variant: "secondary" })
          :
          buttonVariants({ variant: "ghost" })
      }>Create order</Link>
      {/* <Link href="/dashboard/analytics" className={buttonVariants({ variant: "ghost" })}>Analytics</Link> */}
      <Link href="/dashboard/products" className={
        pathname == '/dashboard/products' ?
          buttonVariants({ variant: 'secondary' })
          :
          buttonVariants({ variant: "ghost" })
      }>Products</Link>
    </div >
  )
}