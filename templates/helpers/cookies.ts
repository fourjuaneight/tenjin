/**
 * Sets a cookie with an optional expiration time.
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
