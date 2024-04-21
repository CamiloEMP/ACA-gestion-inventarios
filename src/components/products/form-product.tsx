import { useForm } from 'react-hook-form'
import { Form as RouterForm } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import { ProductSchema, type TProductSchema } from '@/schemas/product.schema'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

export function FormProduct() {
  const form = useForm<TProductSchema>({
    resolver: zodResolver(ProductSchema),
  })

  const onSubmit = (data: TProductSchema) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <RouterForm className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="flex gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-72">
                <FormLabel>
                  Nombre del producto
                  <span className="ml-1 text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Precio del producto <span className="ml-1 text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onChange={e => {
                      const value = e.target.value

                      field.onChange(value ? parseFloat(value) : undefined)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción del producto</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <fieldset className="flex gap-2">
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Stock <span className="ml-1 text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onChange={e => {
                      const value = e.target.value

                      field.onChange(value ? parseFloat(value) : undefined)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descuento</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    onChange={e => {
                      const value = e.target.value

                      field.onChange(value ? parseFloat(value) : undefined)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <FormField
          control={form.control}
          name="supplier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Proveedor <span className="ml-1 text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Imagen del producto <span className="ml-1 text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </RouterForm>
    </Form>
  )
}
