import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"

export default function UpgradeCard() {
  return (
    <div className="w-[250px]">
     <Card>
      <CardHeader>
        <CardTitle>
          Upgrade now!!!
        </CardTitle>
        <CardDescription>
          Upgrade now to analize your sales and track your revenue
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">UPGRADE</Button>
      </CardFooter>
     </Card> 
    </div>
  )
}
