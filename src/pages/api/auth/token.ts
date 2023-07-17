import { NextResponse } from 'next/server';
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse)  {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const tokenResponse = await fetch('https://api.dev.monite.com/v1/auth/token', {
    method: 'POST',
    body: JSON.stringify({
      grant_type: 'entity_user',
      entity_user_id: "2c695ff9-acdf-4958-9571-b787e251bfd9",
      client_id: "8c7c78b0-8379-48e5-81ba-484297a0da29",
      client_secret: "de0ec8a2-123c-4fbd-a6c1-0e43db3c74a8",
    }),
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json(await tokenResponse.json());
}

