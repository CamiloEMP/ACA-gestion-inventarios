import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { RegisterSale } from '@/components/sales/register-sale'
import { useSalesHistory } from '@/hooks/sales/use-sales-history'
import { SalesHistoryTable } from '@/components/sales/sales-history-table'

export function SalesHistoryPage() {
  const { salesHistory, isPending } = useSalesHistory()

  return (
    <section className="flex flex-col h-full max-w-5xl gap-4 mx-auto mt-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle>Historico de ventas</CardTitle>
          <RegisterSale />
        </CardHeader>
        <CardContent>
          <SalesHistoryTable isLoading={isPending} sales={salesHistory ?? []} />
        </CardContent>
      </Card>
    </section>
  )
}
