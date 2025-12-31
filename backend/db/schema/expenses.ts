import { pgTable, serial, text, numeric, index, timestamp } from "drizzle-orm/pg-core";

export const expenses = pgTable("expenses", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    date: timestamp("date", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (expenses) => {
    return {
        userIdIndex: index("user_id_idx").on(expenses.userId),
    }
});