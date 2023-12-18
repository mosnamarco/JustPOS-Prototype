import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div className="flex flex-col w-[10rem]">
      <Button variant={"ghost"}>Home</Button>
      <Button variant={"ghost"}>Invoice</Button>
      <Button variant={"ghost"}>Orders</Button>
      <Button variant={"ghost"}>Reports</Button>
    </div>
  )
}