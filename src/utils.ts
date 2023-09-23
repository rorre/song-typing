export function calculateScore(
  expected: string,
  written: string,
  timeLeft: number,
  timeRange: number
) {
  const rowScore = expected
    .split("")
    .map((char, idx) =>
      idx >= written.length
        ? 0
        : written.charAt(idx).toLowerCase() == char.toLowerCase()
        ? 10
        : -5
    )
    .reduce((p, c) => p + c, 0 as number);

  return (
    rowScore +
    (timeLeft / timeRange) * 5 * expected.length -
    5 * (written.length - expected.length)
  );
}
