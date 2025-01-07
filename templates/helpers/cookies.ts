/**
 * Sets a cookie with an optional expiration time.
 *
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param expires - The expiration time in seconds or a specific Date object.
 */
export const setCookie = (
  name: string,
  value: string,
  expires?: number | Date,
) => {
  let expiration = ''

  if (expires) {
    if (typeof expires === 'number') {
      // calculated expiration date = current time + specified seconds
      const date = new Date(Date.now() + expires * 1000)

      expiration = `; expires=${date.toUTCString()}`
    }
    else {
      expiration = `; expires=${expires.toUTCString()}`
    }
  }

  document.cookie = `${name}=${value || ''}${expiration}; path=/`
}

/**
 * Retrieves the value of a specified cookie.
 *
 * @param name - The name of the cookie to retrieve.
 * @returns The value of the cookie, or null if not found.
 */
export const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`
  const cookies = document.cookie.split(';')

  // iterate through cookies to find a match by the specified name.
  for (const cookie of cookies) {
    const ck = cookie.trim()

    if (ck.startsWith(nameEQ)) {
      return ck.substring(nameEQ.length)
    }
  }

  return null
}
