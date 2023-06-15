import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const getSteamUpdates = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        return await getCSGOUpdates(req, res);
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error processing Steam API request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCSGOUpdates = async (req: NextApiRequest, res: NextApiResponse) => {
  const url =
    'https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=730&count=15&maxlength=300&format=json';

  const response = await axios.get(url);
  const data = response.data;

  res.status(200).json(data.appnews.newsitems);
};

export default getSteamUpdates;
