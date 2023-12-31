import Image from 'next/image'
import JustPosLogo from '@/public/images/JustPOS Logo.png'
import React from 'react'
import Navbar from '@/components/dashboard/navbar'
import UpgradeCard from '@/components/dashboard/upgradeCard'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-row'>
      <div className="flex flex-col h-[100vh] justify-between w-fit border-r gap-10 p-4 sticky top-0">
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
      <div className='w-full'>
        {children}
      </div>
    </div>
  )
}
