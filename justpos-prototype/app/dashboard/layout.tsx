import Navbar from "@/components/dashboard/navbar";
import Image from "next/image";
import JustPosLogo from "@/public/images/JustPOS Logo.png"
import UpgradeCard from "@/components/dashboard/upgradeCard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col h-[100vh] justify-between w-fit border-r gap-10 p-5">
        <div className="flex flex-col gap-10 mx-auto">
          <Image
            src={JustPosLogo}
            alt="The just point of sales system logo"
            width={150}
          />
          <Navbar />
        </div>
        <UpgradeCard />
      </div>
      <div className="w-screen">
        {children}
      </div>
    </div>
  )
}
