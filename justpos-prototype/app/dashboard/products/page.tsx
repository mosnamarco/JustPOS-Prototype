'use client'

import { useToast } from "@/components/ui/use-toast"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'

import * as z from 'zod'
import { useEffect, useState } from 'react'

import { productInfo, productSchema } from "@/lib/inferredTypes"

export default function Page() {
  const { toast } = useToast()

  const [products, setProducts] = useState<z.infer<typeof productInfo>[]>([])

  useEffect(() => {
    const storedProducts = getProduct()
    // console.log(storedProducts)
    setProducts(storedProducts)
  }, [])

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productImage: "",
      productName: "",
      price: 0,
      numberInStock: 0,
    },
  })

  function getProduct() {
    try {
      const storedProducts = localStorage.getItem("PRODUCTS")
      if (storedProducts === null) {
        return []
      }
      return JSON.parse(storedProducts) as z.infer<typeof productInfo>[]
    } catch (error) {
      console.log(error)
      return []
    }
  }

  function addProduct(item: z.infer<typeof productInfo>) {
    const newProducts = [...products, item]
    setProducts(newProducts)
    localStorage.setItem("PRODUCTS", JSON.stringify(newProducts))
  }

  function deleteProduct(id: number) {
    const products = JSON.parse(localStorage.getItem("PRODUCTS")!) as z.infer<typeof productInfo>[]
    const indexToDelete = products.findIndex(obj => obj.id === id)
    if (indexToDelete !== -1) {
      products.splice(indexToDelete, 1)
    } else {
      console.log(`Product with id ${id} does not exist`)
    }
    setProducts(products)
    localStorage.setItem("PRODUCTS", JSON.stringify(products))

    toast({
      title: `Item ${id} was deleted`
    })
  }

  function onSubmit(values: z.infer<typeof productSchema>) {
    toast({
      title: "Item added",
      description: `${values.numberInStock} ${values.productName}(s) with the price of PHP ${values.price} was added to the products list`,
    })

    const productInfo = { ...values, id: Date.now() }
    addProduct(productInfo)

    form.reset({
      productImage: '',
      productName: '',
      numberInStock: 0,
      price: 0,
    })
  }

  function product(item: z.infer<typeof productInfo>, index: number) {
    return (
      <>
        <div className='border border-1 rounded-md h-[200px] w-[200px] m-auto flex flex-col justify-center text-center'>
          <span className="text-[gray]">Product image...</span>
        </div>
        <div className='flex justify-between'>
          <span>{item.productName}</span>
          <span>PHP {item.price}</span>
        </div>
        <div className="grid col-1 gap-4">
          <span className="text-[gray]">In stock: {item.numberInStock}</span>
          {confirmDelete(item.id)}
        </div>
      </>
    )
  }

  function confirmDelete(key: number) {
    return (
      <>
        <Dialog>
          <DialogTrigger className={buttonVariants({ variant: "destructive" })}>Delete product</DialogTrigger>
          <DialogContent>
            <DialogDescription>If you delete a product, it cannot be recovered</DialogDescription>
            <Button variant="destructive" onClick={() => deleteProduct(key)}>Delete anyway</Button>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <div className='flex flex-col m-4 gap-4 text-center'>
      <div className='flex gap-2'>
        <Input type='text' placeholder='search items' />
        <Button>Search</Button>
      </div>
      <div>
        {AddProductForm(form, onSubmit)}
      </div>
      <div className='flex flex-wrap gap-4 justify-center'>
        {
          products.map((item, index) => {
            return (
              <div className='flex flex-col p-4 border border-1 rounded-lg w-max gap-2' key={`${item.id}_${index}`}>
                {product(item, index)}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}



function AddProductForm(form: any, onSubmit: any) {
  return (
    <>
      <Dialog>
        <DialogTrigger className={buttonVariants({ variant: "default" })}>Add product</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a product</DialogTitle>
            <DialogDescription>
              Adding a product makes it available to be purchased or added to cart
            </DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="productImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product image</FormLabel>
                      <FormControl>
                        <Input type='file' {...field} />
                      </FormControl>
                      <FormDescription>
                        Item preview image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product name</FormLabel>
                      <FormControl>
                        <Input placeholder="product name" required {...field} />
                      </FormControl>
                      <FormDescription>
                        This name will be shown as the item label
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numberInStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number in stock</FormLabel>
                      <FormControl>
                        <Input type='string' placeholder="stock number" required {...field} />
                      </FormControl>
                      <FormDescription>
                        Number available in stock
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item price</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder="Item price" required {...field} />
                      </FormControl>
                      <FormDescription>
                        Item price
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}