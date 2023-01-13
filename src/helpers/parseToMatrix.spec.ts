import { parseToMatrix } from "./parseToMatrix";

describe("Parse To Matrix", () => {
  it("should parse the array to a matrix", () => {
    const dummyArray = new Array(20).fill("0");

    expect(parseToMatrix(5, dummyArray)).toHaveLength(4);
  });
});
