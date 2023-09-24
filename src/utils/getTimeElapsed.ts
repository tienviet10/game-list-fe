export default function getTimeElapsed(timestamp: string) {
  const currentDate = new Date();
  const previousDate = new Date(timestamp);
  const timeDifference = currentDate.getTime() - previousDate.getTime();
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysElapsed = Math.floor(timeDifference / millisecondsPerDay);
  const hoursElapsed = Math.floor(
    (timeDifference % millisecondsPerDay) / (60 * 60 * 1000)
  );
  return { daysElapsed, hoursElapsed };
}
