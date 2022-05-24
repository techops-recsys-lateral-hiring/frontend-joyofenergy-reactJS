export const getReadings = async (length = 1200) => {
  const current = Date.now();
  const hour = 1000 * 60 * 60;
  return [...new Array(length)].map((_, index) => ({
    time: current - index * hour,
    value: Math.random() * 0.7 + 0.4,
  }));
};
