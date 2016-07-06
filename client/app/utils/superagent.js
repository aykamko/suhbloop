import superagentDefaults from 'superagent-defaults';

const superagent = superagentDefaults();
superagent.on('request', function (request) {
  if (request.url[0] === '/') {
    request.url = 'http://localhost:3000' + request.url;
  }
});

export default superagent;
