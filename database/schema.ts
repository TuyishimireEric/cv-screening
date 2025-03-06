// drizzle/schema.ts
import { pgTable, text, varchar, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: varchar("name", { length: 255 }),
  email: text("email").unique(),
  password: text("password"),
  image: text("image"),
  role: varchar("role", { length: 30 }),
  created_at: text("created_at"),
  updated_at: text("updated_at"),
});

export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  created_by: uuid("created_by").references(() => users.id).notNull(),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  required_staff: text("required_staff"),
  requirements: text("requirements"),
  location: text("location"),
  open_date: text("open_date"),
  close_date: text("close_date"),
  created_at: text("created_at"),
  updated_at: text("updated_at"),
});

export const applications = pgTable("user_applications", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  user_id: uuid("user_id").references(() => users.id).notNull(),
  job_id: uuid("job_id").references(() => jobs.id).notNull(),
  status: varchar("status", { length: 30 }),
  match_score: text("match_score"),
  application_id: text("application_id"),
  created_at: text("created_at"),
  updated_at: text("updated_at"),
});