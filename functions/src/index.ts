import * as cors from 'cors';
import * as express from 'express';
import * as proxy from 'express-http-proxy';
import * as functions from 'firebase-functions';
import {Request} from 'firebase-functions';

const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));

const apiUrl = 'https://api.unsplash.com';

// $ firebase functions:config:set unsplash.key="..."
const accessKey: string = functions.config().unsplash.key;

// We use:
// https://api.unsplash.com/search/photos/?query={searchTerm}&page={next}&client_id={secret_key}
// https://api.unsplash.com/photos/{photoId}/download/?client_id={secret_key}

app.use(
  '/',
  proxy(apiUrl, {
    proxyReqPathResolver: ({url, query}: Request) => {
      const separator: '?' | '&' =
        Object.keys(query || {}).length === 0 &&
        url.charAt(url.length - 1) !== '?'
          ? '?'
          : '&';

      return `${url}${separator}client_id=${accessKey}`;
    },
  })
);

exports.unsplash = functions.https.onRequest(app);
