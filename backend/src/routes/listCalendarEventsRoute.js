import { listEvents } from "../commands/calendar.js";
import { oauthClient } from "../util/oauthClient.js";

export const listCalendarEvents = {
  path: "/api/listCalendarEvents",
  method: "post",
  handler: async (req, res) => {
    let { oauthToken } = req.body;
    // console.log(user);
    // console.log(req);
    oauthClient.setCredentials(oauthToken);
    console.log(oauthClient);
    listEvents(oauthClient);

    // req.status(200).json({
    //   message: "Groovy.",
    // });
  },
};
