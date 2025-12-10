// // convex/tours.ts - COMPLETE FIXED VERSION
// import { v } from "convex/values";
// import { mutation, query } from "./_generated/server";
// import { Id } from "./_generated/dataModel";

// // Get all tours for the current user
// export const getUserTours = query({
//   args: {},
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       return [];
//     }

//     return await ctx.db
//       .query("tours")
//       .withIndex("by_user", (q) => q.eq("userId", identity.subject))
//       .order("desc")
//       .collect();
//   },
// });

// // Get a single tour by ID
// export const getTour = query({
//   args: { tourId: v.id("tours") }, // Changed from v.string() to v.id("tours")
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       return null;
//     }

//     // Direct query with ID
//     const tour = await ctx.db.get(args.tourId);
    
//     // Check ownership
//     if (!tour || tour.userId !== identity.subject) {
//       return null;
//     }
    
//     return tour;
//   },
// });

// // Create a new tour
// export const createTour = mutation({
//   args: {
//     name: v.string(),
//     description: v.optional(v.string()),
//     steps: v.array(
//       v.object({
//         title: v.string(),
//         description: v.string(),
//         target: v.string(),
//       })
//     ),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const now = Date.now();
//     const tourId = await ctx.db.insert("tours", {
//       name: args.name,
//       userId: identity.subject,
//       description: args.description || "",
//       steps: args.steps.map((step, index) => ({
//         ...step,
//         id: `step_${now}_${index}`,
//         order: index,
//       })),
//       settings: {
//         theme: "auto",
//         position: "bottom-right",
//         colors: {
//           primary: "#3b82f6",
//           background: "#ffffff",
//           text: "#1f2937",
//           progress: "#10b981",
//         },
//         features: {
//           showProgress: true,
//           allowSkip: true,
//           showCounter: true,
//           autoStart: false,
//           showControls: true,
//           closeOnClickOutside: true,
//         },
//       },
//       isActive: true,
//       isPublished: false,
//       createdAt: now,
//       updatedAt: now,
//     });

//     return tourId;
//   },
// });

// // Update a tour
// export const updateTour = mutation({
//   args: {
//     tourId: v.id("tours"), // Changed from v.string() to v.id("tours")
//     name: v.optional(v.string()),
//     description: v.optional(v.string()),
//     steps: v.optional(
//       v.array(
//         v.object({
//           id: v.string(),
//           title: v.string(),
//           description: v.string(),
//           target: v.string(),
//           order: v.number(),
//         })
//       )
//     ),
//     isPublished: v.optional(v.boolean()),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     // Get the tour first to check ownership
//     const tour = await ctx.db.get(args.tourId);
//     if (!tour || tour.userId !== identity.subject) {
//       throw new Error("Tour not found or access denied");
//     }

//     // Prepare updates
//     const updates: any = { updatedAt: Date.now() };
//     if (args.name !== undefined) updates.name = args.name;
//     if (args.description !== undefined) updates.description = args.description;
//     if (args.steps !== undefined) updates.steps = args.steps;
//     if (args.isPublished !== undefined) updates.isPublished = args.isPublished;

//     await ctx.db.patch(args.tourId, updates);
//     return args.tourId;
//   },
// });

// // Delete a tour
// export const deleteTour = mutation({
//   args: { tourId: v.id("tours") }, // Changed from v.string() to v.id("tours")
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     // Verify ownership
//     const tour = await ctx.db.get(args.tourId);
//     if (!tour || tour.userId !== identity.subject) {
//       throw new Error("Tour not found or access denied");
//     }

//     await ctx.db.delete(args.tourId);
//     return args.tourId;
//   },
// });

// // Publish a tour
// export const publishTour = mutation({
//   args: { tourId: v.id("tours") }, // Changed from v.string() to v.id("tours")
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     // Verify ownership
//     const tour = await ctx.db.get(args.tourId);
//     if (!tour || tour.userId !== identity.subject) {
//       throw new Error("Tour not found or access denied");
//     }

//     await ctx.db.patch(args.tourId, {
//       isPublished: true,
//       updatedAt: Date.now(),
//     });

//     return args.tourId;
//   },
// });

// // Get published tour (public access)
// export const getPublishedTour = query({
//   args: { tourId: v.id("tours") }, // Changed from v.string() to v.id("tours")
//   handler: async (ctx, args) => {
//     const tour = await ctx.db.get(args.tourId);
    
//     // Type guard to check if it's a tour document
//     if (tour && 'isPublished' in tour && tour.isPublished) {
//       return tour;
//     }
    
//     return null;
//   },
// });

// // Get published tour by name (alternative public access)
// export const getPublishedTourByName = query({
//   args: { name: v.string() },
//   handler: async (ctx, args) => {
//     const tours = await ctx.db
//       .query("tours")
//       .filter((q) => 
//         q.and(
//           q.eq(q.field("isPublished"), true),
//           q.eq(q.field("name"), args.name)
//         )
//       )
//       .collect();
    
//     return tours[0] || null;
//   },
// });