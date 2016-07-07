import superagentDefaults from 'superagent-defaults';

const superagent = superagentDefaults();
superagent.on('request', request => {
  /* eslint-disable no-param-reassign, prefer-template */
  if (request.url[0] === '/') {
    request.url = 'http://localhost:3000' + request.url;
  }
  /* eslint-enable no-param-reassign, prefer-template */
});

export default superagent;
