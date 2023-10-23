export function formatTimeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const timeDifference = now.getTime() - date.getTime();
  const seconds = Math.floor(timeDifference / 1000);

  if (seconds < 60) {
    return seconds + (seconds === 1 ? ' second ago' : ' seconds ago');
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return hours + (hours === 1 ? ' hour ago' : ' hours ago');
  }

  const days = Math.floor(hours / 24);
  return days + (days === 1 ? ' day ago' : ' days ago');
}
