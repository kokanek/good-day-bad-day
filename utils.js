export function formatDate(date) {
  const year = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return `${year}-${mm}-${dd}`;
}