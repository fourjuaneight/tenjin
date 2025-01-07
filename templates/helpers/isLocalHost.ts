/**
 * Determines if the current hostname is localhost.
 *
 * Checks for:
 * - 'localhost' (standard hostname)
 * - '[::1]' (IPv6 localhost address)
 * - Any IPv4 address in the range 127.0.0.0/8
 */
export const isLocalhost: boolean = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);
