const request = require('request');
const settings = require('./settings');

const sendMessageToLine = message => {
  return new Promise((resolve, reject) => {
    const headers = {
      'Content-Type'  : 'application/json',
      'Authorization' : 'Bearer ' + settings.token
    };
    const options =
     {
       'url'     : 'https://notify-api.line.me/api/notify',
       'method'  : 'post',
       'headers' : headers,
       'form'    : {message}
     };

    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      }
      resolve(body);
    });
  });
};

const sleep = t => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
};

(async () => {
  for(let i = 0; i < 10; i++) {
    await sleep(1000);
    const body = await sendMessageToLine(i);
    console.log(body);
  }
})().catch(e => console.log(e));
