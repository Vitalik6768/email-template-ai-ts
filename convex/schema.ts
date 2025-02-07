import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  emailsTemplates: defineTable({
    tid: v.string(),
    design: v.any(),
    email: v.string(),
  }),
});



