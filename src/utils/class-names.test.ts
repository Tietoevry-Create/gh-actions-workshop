import { describe, it, expect } from "vitest";
import { classNames } from "./class-names";

describe(classNames, () => {
  it("should create a space separated string of class names", () => {
    const names = ["foo", "bar", "baz"];

    const expected = "foo bar baz";
    const actual = classNames(...names);

    expect(actual).toBe(expected);
  });

  it("should support falsy values and filter them out", () => {
    const names = ["foo", null, undefined, false, "bar"];

    const expected = "foo bar";
    const actual = classNames(...names);

    expect(actual).toBe(expected);
  });

  it("should return an empty string if no arguments are provided", () => {
    const expected = "";
    const actual = classNames();

    expect(actual).toBe(expected);
  });

  it("should return an empty string if only falsy values are provided", () => {
    const names = [null, undefined, false];

    const expected = "";
    const actual = classNames(...names);

    expect(actual).toBe(expected);
  });

  it("should support using only one argument", () => {
    const names = ["foo"];

    const expected = "foo";
    const actual = classNames(...names);

    expect(actual).toBe(expected);
  });
});
