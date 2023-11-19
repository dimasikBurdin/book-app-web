import { getShortString } from "../get-short-string";

describe("get-short-string", () => {
  it("get-init-string-if-limit-more-init-length", () => {
    const initString = "base string";
    const res = getShortString(initString, initString.length + 5);

    expect(res).toEqual(initString);
  });

  it("get-string-with-crop", () => {
    const initString = "1234567";
    const res = getShortString(initString, 5);

    expect(res).toEqual("12345...");
  });

  it("get-string-with-crop-if-last-element-space", () => {
    const initString = "1234 567";
    const res = getShortString(initString, 5);

    expect(res).toEqual("1234...");
  });

  it("get-empty-string-if-init-string-is-only-space", () => {
    const initString = "     ";
    const res = getShortString(initString, 5);

    expect(res).toEqual("");
  });
});
