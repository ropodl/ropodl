// import { BetaAnalyticsDataClient } from "@google-analytics/data";

export default defineEventHandler(async (event) => {
  console.log(process.env.GOOGLE_ANALYTICS_ID);
  // const analyticsDataClient = new BetaAnalyticsDataClient();

  // const response = await analyticsDataClient.runReport({
  //   property: `properties/${process.env.GOOGLE_ANALYTICS_ID}`,
  //   dateRanges: [
  //     {
  //       startDate: "2020-03-31",
  //       endDate: "today",
  //     },
  //   ],
  //   dimensions: [
  //     {
  //       name: "city",
  //     },
  //   ],
  //   metrics: [
  //     {
  //       name: "activeUsers",
  //     },
  //   ],
  // });

  // console.log(response);

  return { test: "Hello Nitro" };
});
