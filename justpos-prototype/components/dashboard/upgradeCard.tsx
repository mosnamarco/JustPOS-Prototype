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
          If you upgrade, you get access to advanced analytics!
        </CardDescription>
        <CardContent>
          <h1>Insert advanced analytics here</h1>
        </CardContent>
      </CardHeader>
      <CardFooter>
        <Button>UPGRADE</Button>
      </CardFooter>
     </Card> 
    </div>
  )
}
