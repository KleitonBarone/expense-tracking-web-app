import { createLazyFileRoute } from '@tanstack/react-router'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createLazyFileRoute('/_authenticated/expenses')({
  component: Expenses,
})

async function getAllExpenses() {
  const response = await api.v1.expenses.$get()
  if (!response.ok) {
    throw new Error('Failed to fetch total spent')
  }
  const data = await response.json()
  return data
}

function Expenses() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['get-all-expenses'],
    queryFn: getAllExpenses,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
        <p className="text-muted-foreground">
          A detailed list of all your recorded expenses.
        </p>
      </div>

      <div className="rounded-md border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isError ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-destructive">
                  Error: {error.message}
                </TableCell>
              </TableRow>
            ) : isPending ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : data.expenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No expenses found.
                </TableCell>
              </TableRow>
            ) : (
              data.expenses.map((expense) => (
                <TableRow key={expense.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-mono text-xs text-muted-foreground">{expense.id}</TableCell>
                  <TableCell className="font-medium">{expense.name}</TableCell>
                  <TableCell>{expense.date.split('T')[0]}</TableCell>
                  <TableCell className="text-right font-semibold">${expense.amount}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          {!isPending && !isError && data.expenses.length > 0 && (
            <TableFooter className="bg-muted/30">
              <TableRow>
                <TableCell colSpan={3} className="font-semibold">Total</TableCell>
                <TableCell className="text-right font-bold text-lg">
                  ${data.expenses.reduce((acc, expense) => acc + Number(expense.amount), 0).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    </div>
  )
}
