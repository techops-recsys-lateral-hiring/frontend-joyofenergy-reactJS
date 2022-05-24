import { getReadings } from "./reading";

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
});
