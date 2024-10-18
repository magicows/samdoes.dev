import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate secret token
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // Revalidate the homepage
    await res.revalidate("/");

    // Revalidate the specific post page by slug
    if (req.query.slug) {
      await res.revalidate(`/posts/${req.query.slug}`);
    }

    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: "Error revalidating" });
  }
}
