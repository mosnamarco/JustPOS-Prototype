import Analytics from "@/components/dashboard/analytics_card/analytics";
import DashboardHeader from "@/components/dashboard/dashboardHeader";
import TransactionHistory from "@/components/dashboard/transaction_history/transactionHistory";

export default function Page() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <DashboardHeader />
      <div className="m-4 flex flex-col h-full justify-between">
        <Analytics />
        <TransactionHistory />
      </div>
    </div>
  )
}