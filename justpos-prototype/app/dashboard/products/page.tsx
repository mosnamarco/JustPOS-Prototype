import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

export default function Page() {
  return (
    <div className='flex flex-col m-4 gap-4 text-center'>
      <div className='flex gap-2'>
        <Input type='text' placeholder='search items' />
        <Button>Search</Button>
      </div>
      <div>
        <Button>Add more products</Button>
      </div>
      <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-4 m-auto'>
        {Product()}
        {Product()}
        {Product()}
        {Product()}
        {Product()}
        {Product()}
        {Product()}
        {Product()}
        {Product()}
        {Product()}
        {Product()}
        {Product()}
      </div>
    </div>
  )
}

function Product() {
  return (
    <>
      <div className='flex flex-col p-4 border border-1 rounded-lg w-max gap-2'>
        <div className='border border-1 rounded-md h-[200px] w-[200px] m-auto flex flex-col justify-center text-center'>
          <span>Product image...</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <Badge variant="outline">Beverage</Badge>
          <Badge variant="outline">Food</Badge>
          <Badge variant="outline">Produce</Badge>
        </div>
        <div className='flex justify-between'>
          <span>Shopaw</span>
          <span>$14.59</span>
        </div>
      </div>
    </>
  )
}