export default async function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Missing code parameter" });
  }

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ client_id, client_secret, code })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("OAuth error:", err);
    res.status(500).json({ error: "OAuth server error" });
  }
}
