import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { userQueryOptions } from '@/lib/api'

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})

function Profile() {
  const { isPending, isError, data } = useQuery(userQueryOptions)

  return (
    <div className="p-2">
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Not Logged In</div>
      ) : (
        <div>Hello {data.user.given_name}!
        <a href="/api/v1/logout">Logout</a></div>
      )}
    </div>
  )
}
