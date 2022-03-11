import fetch from 'node-fetch';

const proxyUrl =
  'https://us-central1-unsplash-proxy.cloudfunctions.net/unsplash';

const search = async () => {
  const searchTerm = 'dog';
  const next = 1;

  // Search: `${proxyUrl}/search/photos/?query=${searchTerm}&page=${next}`
  // Download: `${proxyUrl}/photos/${photoId}/download/`

  const response = await fetch(
    `${proxyUrl}/search/photos/?query=${searchTerm}&page=${next}`
  );

  if (!response.ok) {
    console.error('Invalid response', response);
    return;
  }

  console.log(await response.json());
};

await search();
