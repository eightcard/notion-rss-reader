export const timeDifference = (publishedDate: Date) => {
  const now = new Date().getTime() / 1000;
  const pubTime = publishedDate.getTime() / 1000;
  const difference = Math.floor(now) - Math.floor(pubTime);
  const diffInHours = Math.floor(difference / 60 / 60);

  return {
    diffInHours,
  };
};
