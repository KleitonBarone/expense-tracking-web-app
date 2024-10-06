import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/expenses")({
  component: Expenses,
});

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

async function getAllExpenses() {
  const response = await api.v1.expenses.$get();
  if (!response.ok) {
    throw new Error("Failed to fetch total spent");
  }
  const data = await response.json();
  return data;
}

function Expenses() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Table>
      <TableCaption>A list of your expenses</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPending ? (
          <>
            <TableRow key={1}>
              <TableCell className="font-medium">
                <Skeleton className="h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4" />
              </TableCell>
            </TableRow>
            <TableRow key={2}>
              <TableCell className="font-medium">
                <Skeleton className="h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4" />
              </TableCell>
            </TableRow>
            <TableRow key={3}>
              <TableCell className="font-medium">
                <Skeleton className="h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4" />
              </TableCell>
            </TableRow>
          </>
        ) : (
          data.expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">{expense.id}</TableCell>
              <TableCell>{expense.name}</TableCell>
              <TableCell className="text-right">{expense.amount}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">
            {isPending ? (
              <Skeleton className="h-4" />
            ) : (
              data.expenses.reduce((acc, expense) => acc + expense.amount, 0)
            )}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
