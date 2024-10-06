import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

async function getTotalSpent() {
  const response = await api.v1.expenses["total-spent"].$get();
  if (!response.ok) {
    throw new Error("Failed to fetch total spent");
  }
  const data = await response.json();
  return data;
}

function App() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Card className="w-[350px] m-auto">
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
            <CardDescription>Total amount you have spent</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            {isPending ? "Loading..." : data.totalSpent}
          </CardContent>
          <CardFooter className="flex justify-between">
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default App;
