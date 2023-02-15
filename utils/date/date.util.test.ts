import { getFormattedDate } from "@/utils/date/date.util";

describe("Date Util", () => {
  describe("getFormattedDate", () => {
    it("should return a formatted date", () => {
      const date = new Date("2020-01-01T00:00:00.000Z");
      const formattedDate = getFormattedDate(date);

      expect(formattedDate).toBe("2020-1-1");
    });
  });
});
