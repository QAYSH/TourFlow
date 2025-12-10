// // convex/schema.ts
// import { defineSchema, defineTable } from "convex/server";
// import { v } from "convex/values";

// export default defineSchema({
//   // Users table (Convex auth will handle user identities)
//   users: defineTable({
//     name: v.string(),
//     email: v.string(),
//     imageUrl: v.optional(v.string()),
//     createdAt: v.number(),
//     updatedAt: v.number(),
//   })
//     .index("by_email", ["email"])
//     .index("by_creation", ["createdAt"]),

//   // Tours table
//   tours: defineTable({
//     name: v.string(),
//     userId: v.string(),
//     description: v.optional(v.string()),
//     steps: v.array(
//       v.object({
//         id: v.string(),
//         title: v.string(),
//         description: v.string(),
//         target: v.string(),
//         position: v.optional(v.string()),
//         order: v.number(),
//       })
//     ),
//     settings: v.object({
//       theme: v.string(),
//       position: v.string(),
//       colors: v.object({
//         primary: v.string(),
//         background: v.string(),
//         text: v.string(),
//         progress: v.string(),
//       }),
//       features: v.object({
//         showProgress: v.boolean(),
//         allowSkip: v.boolean(),
//         showCounter: v.boolean(),
//         autoStart: v.boolean(),
//         showControls: v.boolean(),
//         closeOnClickOutside: v.boolean(),
//       }),
//     }),
//     isActive: v.boolean(),
//     isPublished: v.boolean(),
//     createdAt: v.number(),
//     updatedAt: v.number(),
//   })
//     .index("by_user", ["userId"])
//     .index("by_user_active", ["userId", "isActive"])
//     .index("by_creation", ["createdAt"]),

//   // Analytics events table
//   analytics: defineTable({
//     tourId: v.string(),
//     stepId: v.optional(v.string()),
//     userId: v.optional(v.string()),
//     sessionId: v.string(),
//     eventType: v.string(), // 'tour_started', 'step_completed', 'tour_completed', 'tour_skipped'
//     metadata: v.optional(v.any()),
//     userAgent: v.optional(v.string()),
//     url: v.optional(v.string()),
//     timestamp: v.number(),
//   })
//     .index("by_tour", ["tourId"])
//     .index("by_tour_event", ["tourId", "eventType"])
//     .index("by_timestamp", ["timestamp"])
//     .index("by_session", ["sessionId"]),

//   // Embed configurations
//   embedConfigs: defineTable({
//     tourId: v.string(),
//     userId: v.string(),
//     name: v.string(),
//     config: v.any(), // Full embed configuration
//     isActive: v.boolean(),
//     createdAt: v.number(),
//     updatedAt: v.number(),
//   })
//     .index("by_tour", ["tourId"])
//     .index("by_user", ["userId"]),
// });