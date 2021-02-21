import {DateTime} from "luxon";

export function relativeDate(timestamp: number) {
  return DateTime.fromMillis(timestamp)
    .toRelative({ style: "narrow" })
    ?.replace("in ", "")
    ?.replace(".", "");
}

export function formatPhone(phone: string) {
  phone = phone.replace('-', '');
  return phone.substr(0, 3) + '-' + phone.substr(3, 3) + '-' + phone.substr(6, 4);
}
