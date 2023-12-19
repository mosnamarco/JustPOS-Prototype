import { BarChart3, CircleDollarSign, DollarSign } from "lucide-react"

export default function Analytics() {
  return (
    <div className="flex justify-between m-auto gap-5 flex-wrap">
      {/* total revenue */}
      <div className="flex h-[10rem] flex-col w-[20rem] border rounded-lg p-4 justify-center gap-5">
        <div className="flex justify-between">
          <span className="text-lg">Total revenue</span>
          <span className="text-[1]"><DollarSign /></span>
        </div>
        <div className="flex flex-col">
          <span className="text-[1.5rem] font-bold">$399,420.69</span>
          <span className="text-[0.9rem] text-gray-500">+43% this month</span>
        </div>
      </div>

      {/* number of sales */}
      <div className="flex h-[10rem] flex-col w-[20rem] border rounded-lg p-4 justify-center gap-5">
        <div className="flex justify-between">
          <span className="text-lg">Total revenue</span>
          <span className="text-[1]"><CircleDollarSign /></span>
        </div>
        <div className="flex flex-col">
          <span className="text-[1.5rem] font-bold">+56</span>
          <span className="text-[0.9rem] text-gray-500">+23% this month</span>
        </div>
      </div>

      {/* cash to online payment ratio */}
      <div className="flex h-[10rem] flex-col w-[20rem] border rounded-lg p-4 justify-center gap-5">
        <div className="flex justify-between">
          <span className="text-lg">Cash to online payment ratio</span>
          <span className="text-[1]"><BarChart3 /></span>
        </div>
        <div className="flex flex-col">
          <span className="text-[1.5rem] font-bold">3:5</span>
          <span className="text-[0.9rem] text-gray-500">-25% cash | +45% online payment</span>
        </div>
      </div>
    </div>
  )
}
