import * as Sentry from "@sentry/react-router";
Sentry.init({
  dsn: "https://e83f3a32010ab7b015f9eb2a5a8ffcd5@o4511647421300736.ingest.us.sentry.io/4511647425757184",
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
});