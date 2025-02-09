"use client";

// create a function that takes in a date 2025-02-07T13:38:52.219Z and returns a string like
// "New" for less than 1 hour
// example 23h, 21h, or 1h for less than 24 hours
// example 2d, 1d for less than 7 days
// example 1w, 2w for less than 30 days
// example 1m, 2m for less than 365 days
// example 1y, 2y for more than 365 days

const TimeCalculator = (date: string) => {
  const currentDate = new Date();
  const createdDate = new Date(date);
  const diff = currentDate.getTime() - createdDate.getTime();
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;
  const years = days / 365;

  if (hours < 1) {
    return "New";
  } else if (hours < 24) {
    return `${Math.floor(hours)}h`;
  } else if (days < 7) {
    return `${Math.floor(days)}d`;
  } else if (days < 30) {
    return `${Math.floor(weeks)}w`;
  } else if (days < 365) {
    return `${Math.floor(months)}m`;
  } else {
    return `${Math.floor(years)}y`;
  }
}

export default TimeCalculator;