import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import JustPosLogo from "@/public/images/JustPOS Logo.png"

export default function Home() {
  return (
    <main className="flex justify-between h-screen align-center m-auto">
      <div className="m-auto text-center gap-4 grid">
        <Image
          src={JustPosLogo}
          alt="just point of sales system logo"
        />
        <span className="text-[gray]">Your personal point of sales system</span>
      </div>
      <div className="m-auto">
        <Link href="/dashboard/" className={buttonVariants({ variant: "default" })}>Go to dashboard</Link>
      </div>
    </main>
  )
}
