import querystring from 'querystring';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token =
  'AQCzBYSeAGd4Vce2wMRZ-RHbUTArO6wEn311TLG2U4wpLjUKn0d8F3R1E0TVntYfCPUs52csbHdpLkTvGA4hXFDhnwGRb2yS8tzG8sheoZPamIwbMSiZz18p0Dm5wb1YaXk';

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async (refresh_token) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

export const searchPlaylists = async (query) => {
  const SEARCH_URL = `https://api.spotify.com/v1/search?q=fun&type=playlist`;
  const { access_token } = await getAccessToken();

  return fetch(SEARCH_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const userPlaylists = async (refresh_token) => {
  const PLAYLISTS =
    'https://api.spotify.com/v1/me/playlists?limit=10&offset=0&market=ZA';
  const { access_token } = await getAccessToken(refresh_token);
  console.log(access_token);
  return fetch(PLAYLISTS, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
