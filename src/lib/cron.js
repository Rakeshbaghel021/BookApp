import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(process.env.API_URL, (response) => {
      if (response.statusCode === 200) {
        console.log("GET req sent successfully");
      } else {
        console.error(`GET req Failed ${response.statusCode}`);
      }
    })
    .on("error", (error) => {
      console.error(`Error executing cron job: ${error.message}`);
    });
});

export default job;
