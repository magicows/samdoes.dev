import { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

const refresh_token = process.env.SPOT_REF as string;
let accessToken: string | null = null;
let tokenExpiryTime: number | null = null;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOT_ID as string,
    clientSecret: process.env.SPOT_SECRET as string,
    refreshToken: refresh_token
});

export interface TrackData {
    artists: string[];
    track: string;
    album: string;
    albumArt: string;
}

export async function refreshAccessTokenIfNeeded(): Promise<void> {
    const currentTime = new Date().getTime();
    if (!accessToken || (tokenExpiryTime && currentTime >= tokenExpiryTime)) {
        try {
            const data = await spotifyApi.refreshAccessToken();
            accessToken = data.body['access_token'];
            tokenExpiryTime = currentTime + data.body['expires_in'] * 1000;
            spotifyApi.setAccessToken(accessToken);
        } catch (err) {
            console.error('Error refreshing access token', err);
            throw new Error('Could not refresh access token');
        }
    }
}

export async function getCurrentlyPlayingTrack(): Promise<TrackData | null> {
    await refreshAccessTokenIfNeeded();
    try {
        const data = await spotifyApi.getMyCurrentPlayingTrack();
        const resp = data.body.item;
        if (resp && resp.type === 'track') {
            return {
                artists: resp.artists.map(artist => artist.name),
                track: resp.name,
                album: resp.album.name,
                albumArt: resp.album.images[0].url
            };
        }
        return null;
    } catch (err) {
        console.error('Error fetching current track', err);
        return null;
    }
}

export type TimeRange = 'short_term' | 'medium_term' | 'long_term';

export async function getTopTracks(timeRange: TimeRange = 'short_term'): Promise<TrackData[] | null> {
    await refreshAccessTokenIfNeeded();
    try {
        const data = await spotifyApi.getMyTopTracks({ time_range: timeRange, limit: 10 });
        return data.body.items.map((track: SpotifyApi.TrackObjectFull): TrackData => ({
            track: track.name,
            album: track.album.name,
            artists: track.artists.map(artist => artist.name),
            albumArt: track.album.images[0].url
        }));
    } catch (err) {
        console.error('Error fetching top tracks', err);
        return null;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.setHeader('Cache-Control', 'no-store, max-age=0');
        const { type, range: rangeRaw } = req.query;

        // Route: GET /api/spotify?type=now-playing
        if (type === 'now-playing') {
            const currentlyPlaying = await getCurrentlyPlayingTrack();
            return res.status(200).json({ currentlyPlaying });
        }

        // Route: GET /api/spotify?type=top-tracks&range=...
        if (type === 'top-tracks') {
            const range = (rangeRaw === 'short_term' || rangeRaw === 'medium_term' || rangeRaw === 'long_term')
                ? rangeRaw
                : 'short_term';
            const top10 = await getTopTracks(range);
            return res.status(200).json({ top10, range });
        }

        // Backwards compatibility: GET /api/spotify?range=...
        const range = (rangeRaw === 'short_term' || rangeRaw === 'medium_term' || rangeRaw === 'long_term')
            ? rangeRaw
            : 'short_term';
        const currentlyPlaying = await getCurrentlyPlayingTrack();
        const top10 = await getTopTracks(range);
        res.status(200).json({ currentlyPlaying, top10, range });
    } catch (error) {
        console.error('Error handling request', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
