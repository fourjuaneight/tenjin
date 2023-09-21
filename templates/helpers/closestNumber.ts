/**
 * Returns the number in the array that is closest to the target number.
 */
export const closestNumber = (numbers: number[], target: number): number => {
  let closestNumber: number | null = null;
  let closestDistance = Infinity;

  for (let i = 0; i < numbers.length; i++) {
    const distance = Math.abs(numbers[i] - target);

    if (distance < closestDistance) {
      closestNumber = numbers[i];
      closestDistance = distance;
    }
  }

  return closestNumber as number;
};
