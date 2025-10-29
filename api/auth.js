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
      headers: { 
        "Content-Type": "application/json", 
        "Accept": "application/json" 
      },
      body: JSON.stringify({ client_id, client_secret, code })
    });

    const data = await response.json();

    if (data.access_token) {
      // Devolver HTML con postMessage para comunicarse con el popup de Decap CMS
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>OAuth Success</title>
          </head>
          <body>
            <script>
              (function() {
                function receiveMessage(message) {
                  window.opener.postMessage(
                    'authorization:github:success:${JSON.stringify({
                      token: data.access_token,
                      provider: 'github'
                    })}',
                    message.origin
                  );
                }
                window.addEventListener("message", receiveMessage, false);
                // Enviar mensaje inmediatamente también
                window.opener.postMessage(
                  'authorization:github:success:${JSON.stringify({
                    token: data.access_token,
                    provider: 'github'
                  })}',
                  window.location.origin
                );
                // Cerrar ventana después de 1 segundo
                setTimeout(function() {
                  window.close();
                }, 1000);
              })();
            </script>
            <p>Authorization successful! This window should close automatically.</p>
          </body>
        </html>
      `;
      
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(html);
    } else {
      return res.status(401).json({ error: "No access token received", data });
    }
  } catch (err) {
    console.error("OAuth error:", err);
    res.status(500).json({ error: "OAuth server error" });
  }
}