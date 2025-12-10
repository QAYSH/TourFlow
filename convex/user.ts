// // convex/users.ts
// import { v } from "convex/values";
// import { mutation, query, internal } from "./_generated/server";
// import { internal as internalApi } from "./_generated/api";

// // Get or create user profile (automatically called on authentication)
// export const getOrCreateUser = internal.mutation({
//   args: {},
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     // Check if user already exists by email
//     const existingUser = await ctx.db
//       .query("users")
//       .withIndex("by_email", (q) => q.eq("email", identity.email!))
//       .first();

//     if (existingUser) {
//       // Update user if their info changed
//       const updates: any = {};
//       if (identity.name && identity.name !== existingUser.name) {
//         updates.name = identity.name;
//       }
//       if (identity.pictureUrl && identity.pictureUrl !== existingUser.imageUrl) {
//         updates.imageUrl = identity.pictureUrl;
//       }
      
//       if (Object.keys(updates).length > 0) {
//         updates.updatedAt = Date.now();
//         await ctx.db.patch(existingUser._id, updates);
//       }
      
//       return existingUser._id;
//     }

//     // Create new user
//     const userId = await ctx.db.insert("users", {
//       name: identity.name || identity.email!.split('@')[0],
//       email: identity.email!,
//       imageUrl: identity.pictureUrl || "",
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//     });

//     return userId;
//   },
// });

// // Get current user profile
// export const getCurrentUser = query({
//   args: {},
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       return null;
//     }

//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_email", (q) => q.eq("email", identity.email!))
//       .first();

//     // If user doesn't exist in our database yet, create them
//     if (!user) {
//       // Schedule user creation for next run
//       await ctx.scheduler.runAfter(0, internalApi.users.getOrCreateUser, {});
//       return null;
//     }

//     return user;
//   },
// });

// // Update user profile
// export const updateUser = mutation({
//   args: {
//     name: v.optional(v.string()),
//     imageUrl: v.optional(v.string()),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_email", (q) => q.eq("email", identity.email!))
//       .first();

//     if (!user) {
//       throw new Error("User not found");
//     }

//     const updates: any = {
//       updatedAt: Date.now(),
//     };

//     if (args.name !== undefined) {
//       updates.name = args.name;
//     }
//     if (args.imageUrl !== undefined) {
//       updates.imageUrl = args.imageUrl;
//     }

//     await ctx.db.patch(user._id, updates);
//     return user._id;
//   },
// });

// // Get user by ID (for public profiles or admin)
// export const getUserById = query({
//   args: { userId: v.string() },
//   handler: async (ctx, args) => {
//     // For now, only return limited public info
//     const user = await ctx.db.get(args.userId);
//     if (!user) {
//       return null;
//     }

//     return {
//       _id: user._id,
//       name: user.name,
//       imageUrl: user.imageUrl,
//       createdAt: user.createdAt,
//     };
//   },
// });

// // Get user statistics
// export const getUserStats = query({
//   args: {},
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       return null;
//     }

//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_email", (q) => q.eq("email", identity.email!))
//       .first();

//     if (!user) {
//       return null;
//     }

//     // Get user's tours
//     const tours = await ctx.db
//       .query("tours")
//       .withIndex("by_user", (q) => q.eq("userId", user._id))
//       .collect();

//     // Get analytics for user's tours
//     const allEvents = await Promise.all(
//       tours.map(async (tour) => {
//         return await ctx.db
//           .query("analytics")
//           .withIndex("by_tour", (q) => q.eq("tourId", tour._id))
//           .collect();
//       })
//     );

//     const events = allEvents.flat();

//     // Calculate statistics
//     const totalTours = tours.length;
//     const publishedTours = tours.filter(t => t.isPublished).length;
//     const totalSteps = tours.reduce((sum, tour) => sum + (tour.steps?.length || 0), 0);
//     const totalViews = events.filter(e => e.eventType === 'tour_started').length;
//     const totalCompletions = events.filter(e => e.eventType === 'tour_completed').length;
//     const completionRate = totalViews > 0 ? (totalCompletions / totalViews) * 100 : 0;

//     // Calculate recent activity (last 7 days)
//     const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
//     const recentEvents = events.filter(e => e.timestamp > sevenDaysAgo);
//     const recentActivity = recentEvents.length;

//     return {
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         imageUrl: user.imageUrl,
//         createdAt: user.createdAt,
//       },
//       stats: {
//         totalTours,
//         publishedTours,
//         totalSteps,
//         totalViews,
//         totalCompletions,
//         completionRate: Math.round(completionRate),
//         recentActivity,
//       },
//       tours: tours.map(tour => ({
//         id: tour._id,
//         name: tour.name,
//         isPublished: tour.isPublished,
//         steps: tour.steps?.length || 0,
//         createdAt: tour.createdAt,
//       })),
//     };
//   },
// });

// // Helper function to ensure user exists before tour operations
// export const ensureUserExists = internal.mutation({
//   args: {},
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     // Try to get existing user
//     const existingUser = await ctx.db
//       .query("users")
//       .withIndex("by_email", (q) => q.eq("email", identity.email!))
//       .first();

//     if (existingUser) {
//       return existingUser._id;
//     }

//     // Create user if doesn't exist
//     return await ctx.db.insert("users", {
//       name: identity.name || identity.email!.split('@')[0],
//       email: identity.email!,
//       imageUrl: identity.pictureUrl || "",
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//     });
//   },
// });

// // Search users (admin only - placeholder for future)
// export const searchUsers = query({
//   args: {
//     query: v.string(),
//     limit: v.optional(v.number()),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       return [];
//     }

//     // For now, only return current user
//     // In future, implement proper search with permissions
   