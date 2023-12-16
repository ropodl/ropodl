// import { BetaAnalyticsDataClient } from "@google-analytics/data";

export default defineEventHandler(async (event) => {
  // console.log(process.env.GOOGLE_ANALYTICS_ID);

  const blogCount = await BlogSchema.countDocuments();
  const portfolioCount = await BlogSchema.countDocuments();
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

  return {
    stats: [
      {
        title: "Blogs",
        number: blogCount,
        icon: "mdi:newspaper",
        color: "error",
      },
      {
        title: "Portfolio",
        number: portfolioCount,
        icon: "mdi:image",
        color: "primary",
      },
      {
        title: "Total",
        number: "0",
        icon: "mdi:user",
        color: "purple",
      },
      {
        title: "Contact Request",
        number: "0",
        icon: "mdi:email",
        color: "warning",
      },
    ],
  };
});
