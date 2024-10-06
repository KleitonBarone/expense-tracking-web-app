import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const expensesSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  amount: z.number().int().nonnegative(),
});

const createExpenseSchema = expensesSchema.omit({ id: true });

type Expense = z.infer<typeof expensesSchema>;

const expensesMockData: Expense[] = [
    {
      id: 1,
      name: "Coffee",
      amount: 100,
    },
    {
      id: 2,
      name: "Lunch",
      amount: 200,
    },
  ];

export const expensesRoutes = new Hono()
  .get("/", (context) => {
    return context.json({ expenses: expensesMockData });
  })
  .post("/", zValidator("json", createExpenseSchema), async (context) => {
    const newExpense = context.req.valid("json");
    expensesMockData.push({ ...newExpense, id: expensesMockData.length + 1});
    context.status(201);
    return context.json(newExpense);
  })
  .get("/:id{[0-9]+}", (context) => {
    const expenseId = Number.parseInt(context.req.param("id"));
    const expense = expensesMockData.find((expense) => expense.id === expenseId);
    if (!expense) {
      return context.notFound();
    }
    return context.json(expense);
  })
  .delete("/:id{[0-9]+}", (context) => {
    const expenseId = Number.parseInt(context.req.param("id"));
    const expenseIndex = expensesMockData.findIndex((expense) => expense.id === expenseId);
    if (expenseIndex === -1) {
      return context.notFound();
    }
    expensesMockData.splice(expenseIndex, 1);
    context.status(204);
    return context.body("");
  });
