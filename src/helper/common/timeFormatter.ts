function timeFormatter(inputDate: Date | string): string {
  const date = new Date(inputDate);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date provided");
  }

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default timeFormatter;
