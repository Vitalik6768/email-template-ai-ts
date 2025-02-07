import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// export const updateEmailTemplate = mutation({
//     args: {
//         tid: v.string(),
//         design: v.any(),
//     },
//     handler: async (ctx, args) => {
//         const template = await ctx.db
//             .query("emailsTemplates")
//             .filter((q) => q.eq(q.field("tid"), args.tid))
//             .first();

//         if (!template) {
//             throw new Error("Template not found");
//         }

//         const result = await ctx.db.patch(template._id, {
//             design: args.design
//         });
//         return result;
//     }
// });

export const saveEmailTemplate = mutation({
  args: {
    tid: v.string(),
    design: v.any(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("emailsTemplates", {
      tid: args.tid,
      design: args.design,
      email: args.email,
    });
    return result;
  },
});

export const getEmailTemplate = query({
  args: {
    tid: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db
        .query("emailsTemplates")
        .filter((q) => q.eq(q.field("tid"), args.tid))
        .collect();
      return result[0] || null;
    } catch (error) {
      console.error("Error fetching email template:", error);
      return null;
    }
  },
});

export const updateEmailTemplate = mutation({
  args: {
    tid: v.string(),
    design: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("emailsTemplates")
      .filter((q) => q.eq(q.field("tid"), args.tid))
      .collect();

    const docId = result[0]._id;

    await ctx.db.patch(docId, {
      design: args.design,
    });
  },
});
