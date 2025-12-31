import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { useForm } from '@tanstack/react-form'
import { api } from '@/lib/api'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createLazyFileRoute('/_authenticated/create-expense')({
  component: CreateExpense,
})

function CreateExpense() {
  const navigate = useNavigate()
  const formProvider = useForm({
    defaultValues: {
      name: '',
      amount: "0",
      date: new Date().toISOString(),
    },
    onSubmit: async ({ value }) => {
      const response = await api.v1.expenses.$post({ json: value })
      if (!response.ok) {
        throw new Error('Failed to create expense')
      }
      navigate({ to: '/expenses' })
    },
  })

  return (
    <div className="flex justify-center py-8">
      <Card className="w-full max-w-lg shadow-md border-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Expense</CardTitle>
          <CardDescription>
            Enter the details of your new expense to track your spending.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              formProvider.handleSubmit()
            }}
          >
            <formProvider.Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  const res = z
                    .string()
                    .min(3, 'Title must be at least 3 characters')
                    .safeParse(value)
                  return res.success ? undefined : res.error.errors[0].message
                },
              }}
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-semibold">
                    Title
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="text"
                    placeholder="e.g. Weekly Groceries"
                    className="focus:ring-2 focus:ring-primary/20 transition-shadow"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-destructive text-xs font-medium animate-in fade-in slide-in-from-top-1">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            />

            <formProvider.Field
              name="amount"
              validators={{
                onChange: ({ value }) => {
                  const res = z
                    .string()
                    .min(1)
                    .refine(
                      (val) => !isNaN(Number(val)) && Number(val) > 0,
                      'Amount must be greater than 0'
                    )
                    .safeParse(value)
                  return res.success ? undefined : res.error.errors[0].message
                },
              }}
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-semibold">
                    Amount
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="number"
                      placeholder="0.00"
                      className="pl-7 focus:ring-2 focus:ring-primary/20 transition-shadow"
                    />
                  </div>
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-destructive text-xs font-medium animate-in fade-in slide-in-from-top-1">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            />

            <formProvider.Field
              name="date"
              validators={{
                onChange: ({ value }) => {
                  const res = z.string().datetime().safeParse(value)
                  return res.success ? undefined : "Invalid date"
                },
              }}
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-semibold">
                    Date
                  </Label>
                  <div className="flex justify-center border rounded-md p-2 bg-muted/5">
                     <Calendar
                      mode="single"
                      selected={new Date(field.state.value)}
                      onSelect={(date) => field.handleChange(date ? date.toISOString() : new Date().toISOString())}
                      className="rounded-md"
                    />
                  </div>
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-destructive text-xs font-medium animate-in fade-in slide-in-from-top-1">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            />

            <formProvider.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  className="w-full h-11 text-base font-semibold transition-all hover:shadow-md"
                  type="submit"
                  disabled={!canSubmit}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Submitting...
                    </span>
                  ) : (
                    'Create Expense'
                  )}
                </Button>
              )}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
