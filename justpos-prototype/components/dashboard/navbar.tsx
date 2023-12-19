import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div className="flex flex-col w-[10rem]">
      <Button variant={"ghost"}>
        <Link href="/dashboard">Home</Link>
      </Button>
      <Button variant={"ghost"}><Link href="/invoice">Invoice</Link></Button>
      <Button variant={"ghost"}><Link href="/order">Create order</Link></Button>
      <Button variant={"ghost"}><Link href="/analytics">Analytics</Link></Button>
    </div>
  )
}