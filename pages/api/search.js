// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { searchPlaylists } from '../../lib/spotify';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const { token } = await getSession({ req });
  const response = await searchPlaylists(token.accessToken);
  const { playlists } = await response.json();

  return res.status(200).json({ playlists });
};

export default handler;
