# Spotify widget: changing Top Tracks range should NOT reload Now Playing (design)

Date: 2026-02-20

## Problem
Currently the Spotify widget fetches `currentlyPlaying` and `top10` together from `/api/spotify?range=...`. The UI ties its `useEffect` to `[range]`, so changing the range triggers a refetch that updates **both** `top10` and `currentlyPlaying`, causing the “now playing vinyl” section to rerender/reset unnecessarily.

## Goals
- Range changes update **only** the Top Tracks list.
- Now Playing remains stable and continues polling on its own cadence.
- UX: keep showing the previous top-tracks list while the new range loads (“optimistic”), then swap to the new list with a staggered animation.
- Reduce unnecessary Spotify API calls where possible.

## Non-goals
- Reworking the overall visual design of the widget.
- Adding caching/persistence beyond what’s needed to avoid reload flicker.

## Proposed approach (Option A)
Split the API and split the client state.

### API
Create two endpoints:
1) `GET /api/spotify/now-playing`
   - returns: `{ currentlyPlaying: TrackData | null }`
   - does not accept a range

2) `GET /api/spotify/top-tracks?range=short_term|medium_term|long_term`
   - returns: `{ top10: TrackData[], range }`

Implementation detail:
- Both endpoints reuse the same token refresh + Spotify client configuration.
- The existing `/api/spotify` endpoint can be kept for backwards compatibility temporarily, or removed once the UI migrates.

### Client (component)
In `src/components/spotify/TopTracks.tsx`:
- Maintain two independent data sources:
  - **Now Playing**
    - state: `currentlyPlaying`
    - polling: every ~30s (and on visibilitychange)
    - **not dependent on `range`**

  - **Top Tracks**
    - state: `top10`
    - fetch when `range` changes
    - UX: keep old list visible while fetching new list

#### Loading + transitions
- No full-widget `loading` spinner for range changes.
- Introduce an `isTopTracksUpdating` boolean (or similar) to:
  - disable the range buttons briefly while a request is in-flight (optional)
  - show a subtle “Updating…” indicator near the range control (optional)
- When new `top10` arrives:
  - swap list data in one state update
  - allow existing `Reveal` / animation utilities to stagger items (either by keying each list item to track identity, or by triggering a lightweight “animate in” state).

## Error handling
- Now Playing failures should not break Top Tracks and vice versa.
- If Top Tracks range fetch fails:
  - keep showing the previous list
  - show a small inline error message near the range controls

## Testing / verification
- Manual:
  - Change range: vinyl continues rotating/does not reset; list updates.
  - While range request is in-flight: old list stays rendered.
  - Polling still updates Now Playing over time.
- API sanity checks:
  - Both endpoints return expected shapes.
  - Range validation rejects invalid values.

## Notes
- This design deliberately avoids relying on browser state preservation tricks; it reduces rerenders by separating state and data flows.
