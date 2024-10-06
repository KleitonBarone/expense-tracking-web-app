import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./components/ui/button";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);
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
