export const getReadings = async (length = 1200) => {
  const current = Date.now();
  const hour = 1000 * 60 * 60;
  return [...new Array(length)].map((_, index) => ({
    time: current - index * hour,
    value: Math.random() * 0.7 + 0.4,
  }));
};

export const groupByDay = (readings) => {
  const groupedByDay = readings.reduce((curr, { time, value }) => {
    const readingDate = new Date(time);
    const day = new Date(
      readingDate.getFullYear(),
      readingDate.getMonth(),
      readingDate.getDate()
    ).getTime();
    if (!curr[day]) curr[day] = 0;
    curr[day] += value;
    return curr;
  }, {});

  return Object.entries(groupedByDay).map(([day, value]) => ({
    time: Number(day),
    value,
  }));
};

export const sortByTime = (readings) => {
  return [...readings].sort(
    (readingA, readingB) => readingA.time - readingB.time
  );
};

export const calculateLast30DaysConsumption = (readings) => {
	if (!Array.isArray(readings)) return 0;

	const getConsumption = sortByTime(groupByDay(readings)).slice(-30);
	const totalConsumption = getConsumption.reduce((total, reading) => total + reading.value, 0);

	return Math.round(totalConsumption);
};

export const calculateCostOfConsumption = (readings) => {
	if (!Array.isArray(readings)) return 0;
	
	const electricityPrice = 0.138;
	const totalConsumption = calculateLast30DaysConsumption(readings);
	
	if (isNaN(totalConsumption)) return 0;
	
	const cost = totalConsumption * electricityPrice;
	return Math.round(cost);
};

export const calculateFootprint = (readings) => {
	if (!Array.isArray(readings)) return 0;

	const footprint = 0.0002532;
	const totalConsumption = calculateLast30DaysConsumption(readings);
	
	if (isNaN(totalConsumption)) return 0;
	
	const footprintValue = totalConsumption * footprint;
	return Number(footprintValue.toFixed(4));
}