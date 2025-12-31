import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/create-expense')({
  component: CreateExpense,
})

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { useForm } from '@tanstack/react-form'
import { api } from '@/lib/api'
import { z } from 'zod'

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-6 bg-card p-8 rounded-xl border shadow-lg">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Expense</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Enter the details of your new expense.
          </p>
        </div>
        <form
          className="flex flex-col gap-6"
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
              <div className="flex flex-col gap-2">
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
                  className="bg-background"
                />
                {field.state.meta.errors.length > 0 && (
                  <span className="text-destructive text-xs font-medium animate-in fade-in slide-in-from-top-1">
                    {field.state.meta.errors.join(', ')}
                  </span>
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
              <div className="flex flex-col gap-2">
                <Label htmlFor={field.name} className="text-sm font-semibold">
                  Amount
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="number"
                  placeholder="0.00"
                  className="bg-background"
                />
                {field.state.meta.errors.length > 0 && (
                  <span className="text-destructive text-xs font-medium animate-in fade-in slide-in-from-top-1">
                    {field.state.meta.errors.join(', ')}
                  </span>
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
              <div className="flex flex-col gap-2 items-center">
                <Label htmlFor={field.name} className="text-sm font-semibold self-start">
                  Date
                </Label>
                <div className="border rounded-md">
                   <Calendar
                    mode="single"
                    selected={new Date(field.state.value)}
                    onSelect={(date) => field.handleChange(date ? date.toISOString() : new Date().toISOString())}
                    className="rounded-md border shadow"
                  />
                </div>
                {field.state.meta.errors.length > 0 && (
                  <span className="text-destructive text-xs font-medium animate-in fade-in slide-in-from-top-1">
                    {field.state.meta.errors.join(', ')}
                  </span>
                )}
              </div>
            )}
          />

          <formProvider.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                className="w-full mt-2"
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
      </div>
    </div>
  )
}
