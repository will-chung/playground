/**
 * Convert from radians to degrees. 
 * @param {*} radians - Value of angle, in radians.
 * @returns Value of angle, in degrees.
 */
export function fromRad(radians) {
  return Math.round(radians * (180 / Math.PI));
}

/**
 * Convert from degrees to radians.
 * @param {*} degrees - Value of angle, in degrees.
 * @returns Value of angle, in radians.
 */
export function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Calculate n mod d.
 * @param {*} n - Dividend. 
 * @param {*} d - Modulus.
 * @returns Result of computing n mod d.
 */
export function mod(n, d) {
  // Ensures result of modulo is always positive.
  return ((n % d) + d) % d;
}