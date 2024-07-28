// pages/api/someEndpoint.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axiosInstance from '../../pages/api/axiosInstance';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axiosInstance.get('/someEndpoint', {
      headers: {
        Authorization: req.headers.authorization, // Forward client's token to backend
      },
    });
    res.status(200).json(response.data);
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.status || 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
