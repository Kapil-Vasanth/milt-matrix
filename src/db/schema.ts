import { drizzle } from "drizzle-orm/neon-http";
import { integer, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";

export const db = drizzle(process.env.DATABASE_URL!);

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    clerk_id: varchar().notNull(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    img_url: varchar({ length: 255 }).notNull(),
});

export const userRolesTable = pgTable("user_roles", {
    user_id: integer().notNull().references(() => usersTable.id),
    role_id: integer().notNull().references(() => rolesTable.id),
}, (table) => ({
    pk: primaryKey({ columns: [table.user_id, table.role_id] }),
}));

export const rolesTable = pgTable("roles", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    permissions: varchar({ length: 255 }).notNull().array(),
});