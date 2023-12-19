import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      customerName: "Majhda Kushmir",
      modeOfPayment: "GCash"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      customerName: "Majhda Kushmir",
      modeOfPayment: "GCash"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      customerName: "Majhda Kushmir",
      modeOfPayment: "GCash"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      customerName: "Majhda Kushmir",
      modeOfPayment: "GCash"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      customerName: "Majhda Kushmir",
      modeOfPayment: "GCash"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      customerName: "Majhda Kushmir",
      modeOfPayment: "GCash"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      customerName: "Majhda Kushmir",
      modeOfPayment: "GCash"
    },
  ]
}

export default async function TransactionHistory() {
  const data = await getData()

  return (
    <DataTable columns={columns} data={data} />
  )
}