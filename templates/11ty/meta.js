const meta = async () => {
  let url;
  switch (process.env.ELEVENTY_ENV) {
    case 'local':
      url = '';
      break;
    case 'development':
      url = 'https://development...com';
      break;
    case 'staging':
      url = 'https://staging...com';
      break;
    default:
      url = 'https://www...com';
  }
  return {
    datefmt: { day: 'numeric', month: 'long', year: 'numeric' },
    description:'',
    domain: url,
    image: '',
    social: '',
    title: '',
  };
};

module.exports = meta;