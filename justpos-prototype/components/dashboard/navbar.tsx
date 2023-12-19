import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div className="flex flex-col w-[10rem]">
      <Button variant={"ghost"}>
        <Link href="/dashboard">Home</Link>
      </Button>
      <Button variant={"ghost"}>
        <Link href="/dashboard/invoice">Invoice</Link>
      </Button>
      <Button variant={"ghost"}>
        <Link href="/dashboard/order">Create order</Link>
      </Button>
      <Button variant={"ghost"}>
        <Link href="/dashboard/analytics">Analytics</Link>
      </Button>
      <Button variant={"ghost"}>
        <Link href="/dashboard/products">Products</Link>
      </Button>
    </div>
  )
}