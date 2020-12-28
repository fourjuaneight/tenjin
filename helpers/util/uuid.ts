// 0-255 numbers array > hex string > prepend a 0 = 256 hex values
// hoisted to avoid recalculating
const hex: string[] = [...Array(256).keys()].map((index: number) =>
  index.toString(16).padStart(2, '0')
);

/**
 * Simple UUID generating.
 * @function
 *
 * @return {string} natively randomized uuid string
 */
const uuid = (): string => {
  // randomized 16 byte buffer
  const rand: Uint8Array = crypto.getRandomValues(new Uint8Array(16));

  // https://tools.ietf.org/html/rfc4122#section-4.4
  // set bits for version
  rand[6] = (rand[6] & 0x0f) | 0x40;
  // set bits for `clock_seq_hi_and_reserved`
  rand[8] = (rand[8] & 0x3f) | 0x80;

  // pull random hex value by buffer integer and insert dashes
  const randString: string[] = [...rand.entries()].map(([index, int]) =>
    [4, 6, 8, 10].includes(index) ? `-${hex[int]}` : hex[int]
  );

  return randString.join('');
};

export default uuid;
