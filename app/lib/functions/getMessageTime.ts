import moment from "moment";

export function getMessageTime(timestamp: Date) {
  const now = moment();
  const messageTime = moment(timestamp);

  const diffInSeconds = now.diff(messageTime, "seconds");
  const diffInMinutes = now.diff(messageTime, "minutes");
  const diffInHours = now.diff(messageTime, "hours");
  const diffInDays = now.diff(messageTime, "days");

  if (diffInSeconds < 60) {
    return "just now";
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  if (diffInDays < 365 && now.year() === messageTime.year()) {
    return messageTime.format("DD MMM, h:mm A"); // E.g., "05 Jan, 2:30 PM"
  }

  return messageTime.format("DD MMM YYYY, h:mm A"); // E.g., "05 Jan 2024, 2:30 PM"
}
