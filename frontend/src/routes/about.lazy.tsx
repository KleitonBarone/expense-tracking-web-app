import { createLazyFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createLazyFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="flex justify-center py-12">
      <Card className="w-full max-w-2xl shadow-md border-2">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">About ExpenseApp</CardTitle>
          <CardDescription>
            Mastering your finances, one expense at a time.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              ExpenseApp was built with simplicity in mind. We believe that tracking your spending 
              shouldn't be a chore. Our goal is to provide a clean, fast, and intuitive interface 
              to help you understand where your money goes.
            </p>
          </section>

          <section className="space-y-3 font-sans">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="p-4 rounded-lg bg-muted/50 border">
                <span className="font-bold block mb-1">Total Spending</span>
                <span className="text-sm text-muted-foreground">Instantly see your all-time spending totals.</span>
              </li>
              <li className="p-4 rounded-lg bg-muted/50 border">
                <span className="font-bold block mb-1">Expense History</span>
                <span className="text-sm text-muted-foreground">Keep a detailed record of every transaction.</span>
              </li>
              <li className="p-4 rounded-lg bg-muted/50 border">
                <span className="font-bold block mb-1">Modern UI</span>
                <span className="text-sm text-muted-foreground">A clean, distraction-free design for better focus.</span>
              </li>
              <li className="p-4 rounded-lg bg-muted/50 border">
                <span className="font-bold block mb-1">Secure</span>
                <span className="text-sm text-muted-foreground">Your data is yours, handled with care.</span>
              </li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
