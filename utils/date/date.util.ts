export function getFormattedDate(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}