// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { userPlaylists } from '../../lib/spotify';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const { token } = await getSession({ req });
  const response = await userPlaylists(token.accessToken);
  const { items } = await response.json();

  return res.status(200).json({ items });
};

export default handler;
