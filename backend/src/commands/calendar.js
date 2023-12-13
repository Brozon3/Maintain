import { google } from "googleapis";
import { getPropertyTasks } from "properties.js"
import "dotenv/config";

export const listEvents = async (auth) => {
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log("No upcoming events found.");
    return;
  }
  console.log("Upcoming 10 events:");
  events.map((event, i) => {
    const start = event.start.dateTime || event.start.date;
    console.log(`${start} - ${event.summary} - Event id: ${event.id} `);
  });

  // authorize().then(listEvents).catch(console.error);
};

export const addEvents = async (auth, propertyID) => {
  const calendar = google.calendar({ version: "v3", auth });
  // Get user calendar events...
  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  // Calendar events. This is a list of all calendar events.
  const events = res.data.items
  console.log(events.id, "Event IDs");

  // Get Property Tasks
  let propertyTasks = getPropertyTasks(propertyID);
  console.log(propertyTasks.eventID, "Task IDs");
  //If successful, insert event...
  // calendar.events.insert({
  //   auth: auth,
  //   calendarId: 'primary',
  //   resource: event,
  // }, function(err, event) {
  //   if (err) {
  //     console.log('There was an error contacting the Calendar service: ' + err);
  //     return;
  //   }
  //   console.log('Event created: %s', event.htmlLink);
  // });
}
