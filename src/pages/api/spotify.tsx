import { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

const refresh_token = process.env.SPOT_REF as string;
let accessToken: string | null = null;
let tokenExpiryTime: number | null = null;

// Create the api object with the credentials
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOT_ID as string,
    clientSecret: process.env.SPOT_SECRET as string,
    refreshToken: refresh_token
});

// Type definition for track data
interface TrackData {
    artists: string[];
    track: string;
    album: string;
    albumArt: string;
}

// Function to get a new access token if it has expired or is not set
async function refreshAccessTokenIfNeeded(): Promise<void> {
    const currentTime = new Date().getTime();
    
    if (!accessToken || (tokenExpiryTime && currentTime >= tokenExpiryTime)) {
        try {
            const data = await spotifyApi.refreshAccessToken();
            accessToken = data.body['access_token'];
            tokenExpiryTime = currentTime + data.body['expires_in'] * 1000; // Convert expires_in from seconds to milliseconds
            spotifyApi.setAccessToken(accessToken);
            console.log('Access token refreshed');
        } catch (err) {
            console.error('Error refreshing access token', err);
            throw new Error('Could not refresh access token');
        }
    }
}

// This function will get the currently playing track
async function getCurrentlyPlayingTrack(): Promise<TrackData | null> {
    await refreshAccessTokenIfNeeded(); // Refresh token if needed
    
    try {
        const data = await spotifyApi.getMyCurrentPlayingTrack();
        const resp = data.body.item;

        if (!resp) {
            return null; // No track currently playing
        }

        if (resp && resp.type === 'track') {
            const track = resp.name;
            const album = resp.album.name;
            const art = resp.album.images[0].url;
            const artists = resp.artists.map(artist => artist.name);

            return {
                artists: artists,
                track: track,
                album: album,
                albumArt: art
            };
        }

        return null; // No track currently playing or it's an episode
    } catch (err) {
        console.error('Error fetching current track', err);
        return null;
    }
}

async function getTopTracks(): Promise<TrackData[] | null> {
    await refreshAccessTokenIfNeeded();
    
    try {
        const data = await spotifyApi.getMyTopTracks({ time_range: 'short_term', limit: 10 });
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

// Next.js API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const currentlyPlaying = await getCurrentlyPlayingTrack();
        const top10 = await getTopTracks();
        res.status(200).json({ currentlyPlaying, top10 });
    } catch (error) {
        console.error('Error handling request', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}