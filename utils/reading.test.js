import { 
  getReadings, 
  groupByDay, 
  sortByTime,
  calculateLast30DaysConsumption,
  calculateCostOfConsumption,
  calculateFootprint
} from "./reading";

describe("#reading", function () {
  describe("#getReadings", () => {
    it("should generate readings with specified length", async () => {
      const length = 100;
      expect(await getReadings(length)).toHaveLength(length);
    });

    it("should generate readings with timestamps and random values", async () => {
      const reading = (await getReadings(1))[0];

      expect(typeof reading.time).toBe("number");
      expect(typeof reading.value).toBe("number");
    });

    it("should generate readings by hours and ordered by time descending", async () => {
      const readings = await getReadings(4);

      expect(readings).toHaveLength(4);
      const OneHourInMilliseconds = 60 * 60 * 1000;
      expect(readings[0].time - readings[1].time).toBe(OneHourInMilliseconds);
      expect(readings[1].time - readings[2].time).toBe(OneHourInMilliseconds);
      expect(readings[2].time - readings[3].time).toBe(OneHourInMilliseconds);
    });
  });

  describe("#groupedByDay", () => {
    it("should get readings with timestamps and values", () => {
      const readings = [
        { time: new Date(2021, 12, 17, 10, 24).getTime(), value: 50 },
        {
          time: new Date(2021, 12, 17, 9, 24).getTime(),
          value: 40,
        },
        {
          time: new Date(2021, 12, 16, 10, 34).getTime(),
          value: 35,
        },
      ];

      const groupedReadings = groupByDay(readings);
      expect(groupedReadings).toHaveLength(2);
      expect(typeof groupedReadings[0].time).toBe("number");
      expect(typeof groupedReadings[0].value).toBe("number");
    });

    it("should get readings grouped by day", async () => {
      const readings = [
        { time: new Date(2021, 12, 17, 10, 24).getTime(), value: 50 },
        {
          time: new Date(2021, 12, 17, 9, 24).getTime(),
          value: 40,
        },
        {
          time: new Date(2021, 12, 16, 10, 34).getTime(),
          value: 35,
        },
        {
          time: new Date(2021, 12, 15, 11, 34).getTime(),
          value: 25,
        },
      ];

      const groupedReadings = groupByDay(readings);
      expect(groupedReadings).toHaveLength(3);
      expect(
        groupedReadings.find(
          (reading) => reading.time === new Date(2021, 12, 17).getTime()
        ).value
      ).toBe(90);
      expect(
        groupedReadings.find(
          (reading) => reading.time === new Date(2021, 12, 16).getTime()
        ).value
      ).toBe(35);
    });
  });

  describe("#sortByTime", () => {
    it("should put latest reading to the last", () => {
      const readings = [
        { time: new Date(2021, 12, 17, 10, 24).getTime(), value: 50 },
        {
          time: new Date(2021, 12, 17, 9, 24).getTime(),
          value: 40,
        },
        {
          time: new Date(2021, 12, 17, 11, 34).getTime(),
          value: 35,
        },
        {
          time: new Date(2021, 12, 15, 11, 34).getTime(),
          value: 25,
        },
      ];

      const sortedReading = sortByTime(readings);
      expect(sortedReading).toHaveLength(4);
      expect(sortedReading[0]).toMatchObject({
        time: new Date(2021, 12, 15, 11, 34).getTime(),
        value: 25,
      });
      expect(sortedReading[3]).toMatchObject({
        time: new Date(2021, 12, 17, 11, 34).getTime(),
        value: 35,
      });
    });

    it("should not change original array", () => {
      const readings = [
        { time: new Date(2021, 12, 17, 10, 24).getTime(), value: 50 },
        {
          time: new Date(2021, 12, 17, 9, 24).getTime(),
          value: 40,
        },
        {
          time: new Date(2021, 12, 15, 11, 34).getTime(),
          value: 25,
        },
      ];

      sortByTime(readings);
      expect(readings).toHaveLength(3);
      expect(readings).toEqual([
        { time: new Date(2021, 12, 17, 10, 24).getTime(), value: 50 },
        {
          time: new Date(2021, 12, 17, 9, 24).getTime(),
          value: 40,
        },
        {
          time: new Date(2021, 12, 15, 11, 34).getTime(),
          value: 25,
        },
      ]);
    });
  });

  describe("#calculateLast30DaysConsumption", () => {
    it.each([null, undefined, "string", []])("should return 0 for invalid or empty array", (value) => {
      expect(calculateLast30DaysConsumption(value)).toBe(0);
    });

    it("should calculate rounded consumption for single day", () => {
      const readings = [
        { time: new Date(2021, 12, 17, 10, 24).getTime(), value: 50.5 }
      ];
      
      expect(calculateLast30DaysConsumption(readings)).toBe(51);
    });

    it("should sum and round consumption for multiple readings", () => {
      const readings = [
        { time: new Date(2021, 12, 17, 10, 24).getTime(), value: 50.3 },
        { time: new Date(2021, 12, 16, 9, 24).getTime(), value: 30.7 },
        { time: new Date(2021, 12, 15, 8, 24).getTime(), value: 20.1 }
      ];
      
      expect(calculateLast30DaysConsumption(readings)).toBe(101);
    });

    it("should limit to last 30 days only", () => {
      const readings = [];
      for (let i = 0; i < 35; i++) {
        readings.push({
          time: new Date(2021, 12, i + 1).getTime(),
          value: 1
        });
      }
      
      expect(calculateLast30DaysConsumption(readings)).toBe(30);
    });
  });

  describe("#calculateCostOfConsumption", () => {
    it.each([null, undefined, "string", []])("should return 0 for invalid or empty array", (value) => {
      expect(calculateLast30DaysConsumption(value)).toBe(0);
    });

    it("should round cost to nearest integer", () => {
      const readings = [
        { time: new Date(2021, 12, 17).getTime(), value: 50.5 },
        { time: new Date(2021, 12, 16).getTime(), value: 49.5 }
      ];
      
      expect(calculateCostOfConsumption(readings)).toBe(14);
    });
  });

  describe("#calculateFootprint", () => {
    it.each([null, undefined, "string", []])("should return 0 for invalid or empty array", (value) => {
      expect(calculateLast30DaysConsumption(value)).toBe(0);
    });

    it("should return footprint with accuracy of 4 decimal places", () => {
      const readings = [
        { time: new Date(2021, 12, 17).getTime(), value: 1234.5678 }
      ];
      
      expect(calculateFootprint(readings)).toBe(0.3127);
    });
  });
});