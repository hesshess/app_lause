import { Settings } from "luxon";

// export const APP_TIME_ZONE = "Asia/Seoul";
// export const APP_LOCALE = "ko";
export const APP_TIME_ZONE = "America/Toronto";
export const APP_LOCALE = "en-CA";


Settings.defaultLocale = APP_LOCALE;
Settings.defaultZone = APP_TIME_ZONE;
