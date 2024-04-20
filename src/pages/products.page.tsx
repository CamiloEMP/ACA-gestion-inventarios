import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ProductsPage() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-between">
        <div />
        <Button asChild>
          <Link to="create">Crear producto</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Here are all of the products in your store.</p>
        </CardContent>
      </Card>
    </section>
  )
}
