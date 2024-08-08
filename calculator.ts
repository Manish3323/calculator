export const calculateSum = (numbers: string) => {
  const containsDelimiter = numbers.startsWith("//");
  const delimiter = containsDelimiter ? numbers.at(3) || "," : ",";
  const input = containsDelimiter ? numbers.substring(5) : numbers;

  const either: { left: number[]; right: number[] } = { left: [], right: [] };
  input
    .replace("\n", delimiter)
    .split(delimiter)
    .reduce((e, x) => {
      const integer = Number(x);
      integer < 0 ? e.left.push(integer) : e.right.push(integer);
      return e;
    }, either);

  if (either.left.length > 0)
    throw new Error(`negative numbers not allowed ${either.left.join(",")}`);
  
  return either.right.reduce((x: number, sum: number) => x + sum, 0);
};
