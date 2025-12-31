import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { userQueryOptions } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})

function Profile() {
  const { isPending, isError, data } = useQuery(userQueryOptions)

  return (
    <div className="flex justify-center py-12">
      <Card className="w-full max-w-md shadow-md border-2">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
          <CardDescription>View your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isPending ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-3/4 mx-auto" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : isError ? (
            <div className="text-center text-destructive">
              <p>Not Logged In</p>
              <Button asChild className="mt-4">
                <a href="/api/v1/login">Login</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Logged in as</p>
                <p className="text-xl font-medium">{data.user.given_name} {data.user.family_name}</p>
                <p className="text-muted-foreground">{data.user.email}</p>
              </div>
              <Button asChild variant="destructive" className="w-full h-11 transition-all hover:shadow-md">
                <a href="/api/v1/logout">Logout</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
