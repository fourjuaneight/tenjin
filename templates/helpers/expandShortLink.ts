/* eslint-disable sort-keys */
/**
 * Expand shortend URLs via Fetch.
 */
export const expandLinks = async (url: string): Promise<string> => {
  try {
    const response: Response = await fetch(url);

    if (!response.ok) {
      throw new Error('Link Fetch:', {
        code: response.status,
        type: response.type,
        text: response.statusText,
      });
    }

    return response.url;
  } catch (error) {
    throw new Error('Expanding Link:', error);
  }
};

/**
 * Get expanded URLs.
 */
export const expandShortLink = async (str: string, regex: RegExp): Promise<string> => {
  const promises: Promise<string>[] = [];
  const pattern: RegExp = new RegExp(regex);

  // eslint-disable-next-line no-unused-vars
  str.replace(pattern, (match, ...args) => {
    const promise = expandLinks(match);
    promises.push(promise);

    return match;
  });

  const data: string[] = await Promise.all(promises);
  const replacer = () => data.shift() ?? '';

  return str.replace(regex, replacer);
};
