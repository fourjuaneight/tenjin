const tags = collection => {
  const tagSet = new Set();
  collection.getAll().forEach(item => {
    if ('tag' in item.data) {
      let tagsList = item.data.tag;

      tagsList = tagsList.filter(item => {
        switch (item) {
          case 'all':
          case 'tags':
          case 'feed':
          case 'posts':
            return false;
        }

        return true;
      });

      for (const tag of tagsList) {
        tagSet.add(tag);
      }
    }
  });

  // returning an array in addCollection works in Eleventy 0.5.3
  return [...tagSet];
};

module.exports = tags;