export const timeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const seconds = Math.floor((now - postDate) / 1000);
    let interval = Math.floor(seconds / 31536000); // seconds in a year
  
    if (interval > 1) {
      return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000); // seconds in a month
    if (interval > 1) {
      return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400); // seconds in a day
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600); // seconds in an hour
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60); // seconds in a minute
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  };
  