import { describe, it } from "node:test";
import { calculateSum } from "./calculator";
import assert from "node:assert";

/**
 * Create a simple String calculator with a method signature like this:
int add(string numbers)
Input: a string of comma-separated numbers
Output: an integer, sum of the numbers
Examples:

Input: “”, Output: 0
Input: “1”, Output: 1
Input: “1,5”, Output: 6
Allow the add method to handle any amount of numbers.

Allow the add method to handle new lines between numbers (instead of commas). ("1\n2,3" should return 6)

Support different delimiters:

To change the delimiter, the beginning of the string will contain a separate line that looks like this: "//[delimiter]\n[numbers…]". For example, "//;\n1;2" where the delimiter is ";" should return 3.
Calling add with a negative number will throw an exception: "negative numbers not allowed <negative_number>".

If there are multiple negative numbers, show all of them in the exception message, separated by commas.
 */
describe("Calculator", () => {
  it("should add two string numbers", () => {
    const sum = calculateSum("1,2");
    assert.equal(sum, 3);
  });

  it("should add two string numbers with variation", () => {
    const sum = calculateSum("1,4");
    assert.equal(sum, 5);
  });

  it("should add 3 string numbers with variation", () => {
    const sum = calculateSum("1,4,6");
    assert.equal(sum, 11);
  });

  it("should return 0 if empty string is passed as input", () => {
    const sum = calculateSum("");
    assert.equal(sum, 0);
  });

  it("should return same number if single string is passed as input", () => {
    const sum = calculateSum("1");
    assert.equal(sum, 1);
  });

  it("should handle new lines ", () => {
    const sum = calculateSum("1\n2,3");
    assert.equal(sum, 6);
  });

  it("should allow passing delimiter at the start of input ", () => {
    const sum = calculateSum("//[?]10?20?30");
    assert.equal(sum, 60);
  });

  it("should allow passing different delimiter", () => {
    const sum = calculateSum("//[;]10;20;30");
    assert.equal(sum, 60);
  });

  it("should allow passing delimiter along with new lines", () => {
    const sum = calculateSum("//[;]10\n20;30");
    assert.equal(sum, 60);
  });

  it("should throw exception if negative numbers are passed as an input", () => {
    assert.throws(
      () => calculateSum("//[;]10\n-20;30"),
      new Error("negative numbers not allowed -20")
    );
  });

  it("should collect all negative numbers before throwing exception", () => {
    assert.throws(
      () => calculateSum("//[;]10\n-20;-30"),
      new Error("negative numbers not allowed -20,-30")
    );
  });
});
