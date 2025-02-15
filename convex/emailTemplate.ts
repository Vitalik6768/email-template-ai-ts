import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { v4 as uuidv4 } from 'uuid'

const uniqueId = uuidv4()


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
      public: false,
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
    email: v.string(),
    tid: v.string(),
    design: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("emailsTemplates")
      .filter((q) => q.eq(q.field("tid"), args.tid))
      .collect();

    const template = result[0];
    
    // If template is public, create a new private template
    if (template.email !== args.email && template.public) {
      const newTemplate = await ctx.db.insert("emailsTemplates", {
        tid: uniqueId,
        design: args.design,
        email: args.email,
        public: false,
      });
      return uniqueId;
    }

    // Otherwise update existing template
    await ctx.db.patch(template._id, {
      design: args.design,
    });
    return template;
  },
});

export const deleteEmailTemplate = mutation({
  args: {
    tid: v.string(),
  },
  handler: async (ctx, args) => {
    const template = await ctx.db
      .query("emailsTemplates")
      .filter((q) => q.eq(q.field("tid"), args.tid))
      .first();

    if (!template) {
      throw new Error("Template not found");
    }

    await ctx.db.delete(template._id);
    return true;
  },
});

export const insertUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    picture: v.string(),
    credits: v.number(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    // If user exists, return the existing user
    if (existingUser) {
      return false;
    }

    // If user doesn't exist, create new user
    const result = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      picture: args.picture,
      credits: args.credits,
    });
    return result;
  },
});

export const getUserEmailTemplate = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.query("emailsTemplates").filter((q) => q.eq(q.field("email"), args.email)).collect();
    return result;
  },
});
