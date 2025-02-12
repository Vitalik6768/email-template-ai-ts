import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    credits: v.number(),
    name:v.string(),
    picture:v.string(),
  }),
  emailsTemplates: defineTable({
    tid: v.string(),
    design: v.any(),
    email: v.string(),
  }),
  messages: defineTable({
    body: v.string(),
    author: v.string(),
    format: v.string(),
  }),
});



