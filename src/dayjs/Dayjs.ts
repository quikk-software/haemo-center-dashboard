import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import "dayjs/locale/de";
import "dayjs/locale/en";
import updateLocale from "dayjs/plugin/updateLocale";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.updateLocale("en", {
  relativeTime: {
    future: "%s",
    past: "%s",
    s: "recently",
    m: "1 minute",
    mm: "%d minutes",
    h: "1 hour",
    hh: "%d hours",
    d: "yesterday",
    dd: (value: string) => {
      const now = dayjs();
      const difference = now.add(-Number(value), "day");
      return dayjs(difference).format("MM/DD/YYYY");
    },
  },
});
dayjs.updateLocale("de", {
  relativeTime: {
    future: "%s",
    past: "%s",
    s: "kürzlich",
    m: "1 Minute",
    mm: "%d Minuten",
    h: "1 Stunde",
    hh: "%d Stunden",
    d: "Gestern",
    dd: (value: string) => {
      const now = dayjs();
      const difference = now.add(-Number(value), "day");
      return dayjs(difference).format("DD.MM.YYYY");
    },
  },
});

const BACKEND_DATE_FORMAT = "YYYY-MM-DD";
const DATE_FORMAT = "DD.MM.YYYY";
const TIME_FORMAT = "HH:mm";
const getDateFormat = (date?: Dayjs | string) => {
  if (date === undefined) {
    return "";
  }
  return (typeof date === "string" ? dayjs(date) : date).format(DATE_FORMAT);
};

const getTimeFormat = (date?: Dayjs | string) => {
  if (date === undefined) {
    return "";
  }
  return (typeof date === "string" ? dayjs(date) : date).format(TIME_FORMAT);
};

export {
  dayjs,
  BACKEND_DATE_FORMAT,
  DATE_FORMAT,
  TIME_FORMAT,
  getDateFormat,
  getTimeFormat,
};
