import { NextApiRequest, NextApiResponse } from 'next';
import { getTopTracks, TimeRange } from '../spotify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.setHeader('Cache-Control', 'no-store, max-age=0');
        
        const rangeRaw = Array.isArray(req.query.range) ? req.query.range[0] : req.query.range;
        const range = (rangeRaw === 'short_term' || rangeRaw === 'medium_term' || rangeRaw === 'long_term')
            ? (rangeRaw as TimeRange)
            : 'short_term';

        const top10 = await getTopTracks(range);
        res.status(200).json({ top10, range });
    } catch (error) {
        console.error('Error handling request', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
