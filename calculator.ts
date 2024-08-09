export const calculateSum = (numbers: string) => {
  const containsDelimiter = numbers.startsWith("//");
  //assuming pattern //[delimiter] hence magic number 3 & 5
  const delimiterIndex = 3;
  const inputStartIndex = 5;
  const delimiter = containsDelimiter ? numbers.at(delimiterIndex) || "," : ",";
  const input = containsDelimiter
    ? numbers.substring(inputStartIndex)
    : numbers;

  const either: { negatives: number[]; normals: number[] } = {
    negatives: [],
    normals: [],
  };
  const maybeResult = input
    .replace("\n", delimiter)
    .split(delimiter)
    .reduce((e, x) => {
      const integer = Number(x);
      integer < 0 ? e.negatives.push(integer) : e.normals.push(integer);
      return e;
    }, either);

  if (maybeResult.negatives.length > 0)
    throw new Error(
      `negative numbers not allowed ${maybeResult.negatives.join(",")}`
    );

  return maybeResult.normals.reduce((x: number, sum: number) => x + sum, 0);
};
