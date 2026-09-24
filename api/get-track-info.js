export default async function handler(req, res) {
  const { title, artist } = req.query;
  if (!title || !artist) return res.status(400).json({ error: "Missing title or artist" });

  const term = encodeURIComponent(`${title} ${artist}`);
  const response = await fetch(
    `https://itunes.apple.com/search?term=${term}&media=music&limit=1`
  );

  const data = await response.json();
  res.status(200).json(data.results[0] || null);
}