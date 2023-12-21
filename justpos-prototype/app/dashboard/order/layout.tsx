export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3">
      {children}
    </div>
  )
}