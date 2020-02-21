/**
 * Module to contain common utiltiy functions.
 */

/**
 * Parses the given string as integer and checks if it is in the given ragne (optional).
 * @param s string to parse
 * @param defValue default value to use in case of parsing error
 * @param min minimal allowed value
 * @param max maximal allowed value
 */
export function parseInt(
  s: string | undefined | null,
  defValue: number,
  min: number = -Number.MAX_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER
): number {
  if (s) {
    try {
      const result = Number.parseInt(s, 10);

      return result < min ? min : result > max ? max : result;
    } catch {
      return defValue;
    }
  } else {
    return defValue;
  }
}
