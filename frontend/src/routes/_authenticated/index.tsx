import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
})

async function getTotalSpent() {
  const response = await api.v1.expenses['total-spent'].$get()
  if (!response.ok) {
    throw new Error('Failed to fetch total spent')
  }
  const data = await response.json()
  return data
}

function Index() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['get-total-spent'],
    queryFn: getTotalSpent,
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your spending.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            {isError ? (
              <div className="text-destructive text-sm">Error: {error.message}</div>
            ) : isPending ? (
              <div className="h-8 w-24 animate-pulse bg-muted rounded" />
            ) : (
              <div className="text-2xl font-bold">${data.totalSpent}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              All time expenses
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
