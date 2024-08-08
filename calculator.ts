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
  input
    .replace("\n", delimiter)
    .split(delimiter)
    .reduce((e, x) => {
      const integer = Number(x);
      integer < 0 ? e.negatives.push(integer) : e.normals.push(integer);
      return e;
    }, either);

  if (either.negatives.length > 0)
    throw new Error(
      `negative numbers not allowed ${either.negatives.join(",")}`
    );

  return either.normals.reduce((x: number, sum: number) => x + sum, 0);
};
