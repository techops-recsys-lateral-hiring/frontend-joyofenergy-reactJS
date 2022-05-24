import { formatDateLabel, groupByDay, sortByTime } from "./chart";

describe("#chart formatDateLabel", () => {
  it("should format date label", () => {
    expect(formatDateLabel(new Date(2021, 0, 1).getTime())).toBe("01/01");
    expect(formatDateLabel(new Date(2021, 1, 1).getTime())).toBe("01/02");
    expect(formatDateLabel(new Date(2021, 5, 1).getTime())).toBe("01/06");
    expect(formatDateLabel(new Date(2021, 11, 1).getTime())).toBe("01/12");
    expect(formatDateLabel(new Date(2021, 11, 25).getTime())).toBe("25/12");
    expect(formatDateLabel(new Date(2021, 11, 31).getTime())).toBe("31/12");
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
});
