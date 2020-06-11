const { get } = require('axios');

const url = '';
const config = {
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
};

// API data
const summary = get(`${url}/`, config)
  .then(results => ({
    data: results.data.data,
    name: '',
  }))
  .catch(err => console.error(err));
const trends = get(`${url}/`, config)
  .then(results => ({
    data: results.data.data,
    name: '',
  }))
  .catch(err => console.error(err));

/* ************** */

const fetchData = () =>
  Promise.all([summary, trends])
    .then(results => results.map(obj => ({ [obj.name]: obj.data })))
    .then(results => Object.assign({}, ...results))
    .catch(err => console.error(err));

module.exports = async () => fetchData();
