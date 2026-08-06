import * as Sentry from "@sentry/react-router";
Sentry.init({
  dsn: "https://e83f3a32010ab7b015f9eb2a5a8ffcd5@o4511647421300736.ingest.us.sentry.io/4511647425757184",
  sendDefaultPii: false,
  dataCollection: {
    userInfo: false,
    httpBodies: [],
  },
});
