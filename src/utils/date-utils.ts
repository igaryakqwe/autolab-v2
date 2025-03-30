export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours} год ${minutes} хв`;
  }

  if (hours > 0) {
    return `${hours} год`;
  }
  return `${minutes}хв`;
};
