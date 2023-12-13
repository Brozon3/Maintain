import { addEvents } from "../commands/calendar.js";
import { oauthClient } from "../util/oauthClient.js";

export const addCalendarEvents = {
  path: "/api/addCalendarEvents",
  method: "post",
  handler: async (req, res) => {
    let { oauthToken, propertyID } = req.body;
    // console.log(user);
    // console.log(req);
    oauthClient.setCredentials(oauthToken);
    console.log(oauthClient);
    addEvents(oauthClient, propertyID);

    // req.status(200).json({
    //   message: "Groovy.",
    // });
  },
};