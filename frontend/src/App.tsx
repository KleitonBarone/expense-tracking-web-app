import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./components/ui/button";
import { api } from "@/lib/api";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalSpent() {
      const response = await api.v1.expenses["total-spent"].$get();
      if (!response.ok) {
        throw new Error("Failed to fetch total spent");
      }
      const data = await response.json();
      setTotalSpent(data.totalSpent);
    }
    fetchTotalSpent();
  }, []);
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Card className="w-[350px] m-auto">
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
            <CardDescription>Total amount you have spent</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            {totalSpent}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant={"default"}
              onClick={() => setTotalSpent(totalSpent + 100)}
            >
              Add
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => setTotalSpent(totalSpent - 100)}
            >
              Subtract
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default App;
