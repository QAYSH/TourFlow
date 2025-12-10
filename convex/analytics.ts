// // convex/analytics.ts - FIXED FILTERS
// import { v } from "convex/values";
// import { mutation, query } from "./_generated/server";

// // Log an analytics event
// export const logEvent = mutation({
//   args: {
//     tourId: v.string(),
//     stepId: v.optional(v.string()),
//     eventType: v.string(),
//     metadata: v.optional(v.any()),
//     userAgent: v.optional(v.string()),
//     url: v.optional(v.string()),
//     sessionId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
    
//     await ctx.db.insert("analytics", {
//       tourId: args.tourId,
//       stepId: args.stepId,
//       userId: identity?.subject,
//       sessionId: args.sessionId,
//       eventType: args.eventType,
//       metadata: args.metadata,
//       userAgent: args.userAgent,
//       url: args.url,
//       timestamp: Date.now(),
//     });

//     return { success: true };
//   },
// });

// // Get analytics for a tour
// export const getTourAnalytics = query({
//   args: { 
//     tourId: v.string(), 
//     startDate: v.optional(v.number()), 
//     endDate: v.optional(v.number()) 
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       return null;
//     }

//     // First, verify the user owns a tour with this ID
//     const tours = await ctx.db
//       .query("tours")
//       .filter((q) => 
//         q.and(
//           q.eq(q.field("_id"), args.tourId),
//           q.eq(q.field("userId"), identity.subject)
//         )
//       )
//       .collect();
    
//     if (tours.length === 0) {
//       return null;
//     }

//     let queryBuilder = ctx.db
//       .query("analytics")
//       .withIndex("by_tour", (q) => q.eq("tourId", args.tourId));

//     // Apply date filters if provided - FIXED with type guards
//     if (args.startDate !== undefined) {
//       const startDate = args.startDate; // TypeScript now knows this is number
//       queryBuilder = queryBuilder.filter((q) => q.gte(q.field("timestamp"), startDate));
//     }
//     if (args.endDate !== undefined) {
//       const endDate = args.endDate; // TypeScript now knows this is number
//       queryBuilder = queryBuilder.filter((q) => q.lte(q.field("timestamp"), endDate));
//     }

//     const events = await queryBuilder.order("desc").collect();

//     // Calculate metrics
//     const metrics = {
//       totalEvents: events.length,
//       tourStarts: events.filter(e => e.eventType === 'tour_started').length,
//       tourCompletions: events.filter(e => e.eventType === 'tour_completed').length,
//       tourSkips: events.filter(e => e.eventType === 'tour_skipped').length,
//       stepCompletions: events.filter(e => e.eventType === 'step_completed').length,
//       uniqueSessions: new Set(events.map(e => e.sessionId)).size,
//     };

//     // Calculate step-by-step analytics
//     const stepAnalytics: Record<string, { views: number; completions: number; dropOff: number }> = {};
    
//     // Group events by session
//     const sessions: Record<string, typeof events> = {};
//     events.forEach(event => {
//       if (!sessions[event.sessionId]) {
//         sessions[event.sessionId] = [];
//       }
//       sessions[event.sessionId].push(event);
//     });

//     // Analyze each session
//     Object.values(sessions).forEach(sessionEvents => {
//       const sortedEvents = sessionEvents.sort((a, b) => a.timestamp - b.timestamp);
      
//       sortedEvents.forEach((event, index) => {
//         if (event.eventType === 'step_completed' && event.stepId) {
//           const stepId = event.stepId;
//           if (!stepAnalytics[stepId]) {
//             stepAnalytics[stepId] = { views: 0, completions: 0, dropOff: 0 };
//           }
//           stepAnalytics[stepId].completions++;
          
//           // Count views (previous step completions lead to this step)
//           if (index > 0 && sortedEvents[index - 1].stepId) {
//             const prevStepId = sortedEvents[index - 1].stepId;
//             if (prevStepId) {
//               if (!stepAnalytics[prevStepId]) {
//                 stepAnalytics[prevStepId] = { views: 0, completions: 0, dropOff: 0 };
//               }
//               stepAnalytics[prevStepId].views++;
//             }
//           }
//         }
//       });
//     });

//     // Calculate drop-off rates
//     Object.keys(stepAnalytics).forEach(stepId => {
//       const step = stepAnalytics[stepId];
//       if (step.views > 0) {
//         step.dropOff = ((step.views - step.completions) / step.views) * 100;
//       } else {
//         step.dropOff = 0;
//       }
//     });

//     return {
//       metrics,
//       stepAnalytics,
//       events: events.slice(0, 100), // Return recent events
//     };
//   },
// });

// // Get dashboard analytics overview
// export const getDashboardAnalytics = query({
//   args: { timeframe: v.optional(v.string()) },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       return null;
//     }

//     // Get user's tours
//     const tours = await ctx.db
//       .query("tours")
//       .withIndex("by_user", (q) => q.eq("userId", identity.subject))
//       .collect();

//     const tourIds = tours.map(tour => tour._id);

//     // Calculate timeframe
//     const now = Date.now();
//     let startTime = now - 7 * 24 * 60 * 60 * 1000; // Default: last 7 days
    
//     if (args.timeframe === '24h') {
//       startTime = now - 24 * 60 * 60 * 1000;
//     } else if (args.timeframe === '30d') {
//       startTime = now - 30 * 24 * 60 * 60 * 1000;
//     }

//     // Get analytics for user's tours
//     const analyticsPromises = tourIds.map(async (tourId) => {
//       return await ctx.db
//         .query("analytics")
//         .withIndex("by_tour", (q) => q.eq("tourId", tourId))
//         .filter((q) => q.gte(q.field("timestamp"), startTime))
//         .collect();
//     });

//     const allEvents = await Promise.all(analyticsPromises);
//     const events = allEvents.flat();

//     // Calculate metrics
//     const totalViews = events.filter(e => e.eventType === 'tour_started').length;
//     const totalCompletions = events.filter(e => e.eventType === 'tour_completed').length;
    
//     // Group events by day for time series
//     const dailyData: Record<string, { date: string; views: number; completions: number }> = {};
    
//     events.forEach(event => {
//       const date = new Date(event.timestamp).toISOString().split('T')[0];
//       if (!dailyData[date]) {
//         dailyData[date] = { date, views: 0, completions: 0 };
//       }
      
//       if (event.eventType === 'tour_started') {
//         dailyData[date].views++;
//       } else if (event.eventType === 'tour_completed') {
//         dailyData[date].completions++;
//       }
//     });

//     // Convert to array and sort by date
//     const timeSeries = Object.values(dailyData).sort((a, b) => 
//       new Date(a.date).getTime() - new Date(b.date).getTime()
//     );

//     // Calculate tour-specific metrics
//     const tourMetrics = await Promise.all(
//       tours.map(async (tour) => {
//         const tourEvents = events.filter(e => e.tourId === tour._id);
//         return {
//           id: tour._id,
//           name: tour.name,
//           views: tourEvents.filter(e => e.eventType === 'tour_started').length,
//           completions: tourEvents.filter(e => e.eventType === 'tour_completed').length,
//           isActive: tour.isActive,
//           isPublished: tour.isPublished,
//         };
//       })
//     );

//     return {
//       overview: {
//         totalTours: tours.length,
//         totalViews,
//         totalCompletions,
//         completionRate: totalViews > 0 ? (totalCompletions / totalViews) * 100 : 0,
//         activeTours: tours.filter(t => t.isActive).length,
//         publishedTours: tours.filter(t => t.isPublished).length,
//       },
//       timeSeries,
//       tours: tourMetrics,
//     };
//   },
// });