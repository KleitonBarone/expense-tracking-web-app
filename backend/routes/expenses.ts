import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import { authMiddleware } from "../kinde";

import { db } from "../db";
import { expenses as expensesTable } from "../db/schema/expenses";
import { eq, sum, desc } from "drizzle-orm";

const expensesSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  amount: z.string().min(1),
  date: z.string().datetime(),
});

const createExpenseSchema = expensesSchema.omit({ id: true });

export const expensesRoutes = new Hono()
  .get("/", authMiddleware, async (context) => {
    const user = context.var.user;
    const expenses = await db.select().from(expensesTable).where(eq(expensesTable.userId, user.id)).orderBy(desc(expensesTable.date)).limit(100);
    return context.json({ expenses });
  })
  .post("/", authMiddleware, zValidator("json", createExpenseSchema), async (context) => {
    const expense = context.req.valid("json");
    const user = context.var.user;
    const result = await db.insert(expensesTable).values({ ...expense, userId: user.id, date: new Date(expense.date) }).returning();
    context.status(201);
    return context.json(result[0]);
  })
  .get("/:id{[0-9]+}", authMiddleware, async (context) => {
    const expenseId = Number.parseInt(context.req.param("id"));
    const user = context.var.user;
    const expense = await db.select().from(expensesTable).where(eq(expensesTable.id, expenseId)).limit(1);
    if (!expense) {
      return context.notFound();
    }
    if (expense[0].userId !== user.id) {
      return context.status(401);
    }
    return context.json(expense[0]);
  })
  .delete("/:id{[0-9]+}", authMiddleware, async (context) => {
    const expenseId = Number.parseInt(context.req.param("id"));
    const expense = await db.select().from(expensesTable).where(eq(expensesTable.id, expenseId)).limit(1);
    if (!expense) {
      return context.notFound();
    }
    if (expense[0].userId !== context.var.user.id) {
      return context.status(401);
    }
    await db.delete(expensesTable).where(eq(expensesTable.id, expenseId));
    context.status(204);
    return context.json(expense[0]);
  })
  .get("/total-spent", authMiddleware, async (context) => {
    const user = context.var.user;
    const totalSpentResult = await db.select({ totalSpent: sum(expensesTable.amount) }).from(expensesTable).where(eq(expensesTable.userId, user.id));
    const totalSpent = totalSpentResult[0].totalSpent ?? "0";
    return context.json({ totalSpent });
  });
