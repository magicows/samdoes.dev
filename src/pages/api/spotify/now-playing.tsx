import { NextApiRequest, NextApiResponse } from 'next';
import { getCurrentlyPlayingTrack } from '../spotify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.setHeader('Cache-Control', 'no-store, max-age=0');
        const currentlyPlaying = await getCurrentlyPlayingTrack();
        res.status(200).json({ currentlyPlaying });
    } catch (error) {
        console.error('Error handling request', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
