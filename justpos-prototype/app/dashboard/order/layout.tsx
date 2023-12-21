export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3">
      {children}
      <div className="border border-l p-4">
        <h1>Order overview</h1>
      </div>
    </div>
  )
}