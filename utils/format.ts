import {DateTime} from "luxon";

export function relativeDate(timestamp: number) {
  return DateTime.fromMillis(timestamp)
    .toRelative({ style: "narrow" })
    ?.replace("in ", "")
    ?.replace(".", "");
}
