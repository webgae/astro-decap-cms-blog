export default async function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  // 🔹 Detecta automáticamente si estás en local o en Vercel
  const BASE_URL =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:4321';

  const CALLBACK_URL = `${BASE_URL}/api/auth`;

  const { code, scope } = req.query;

  console.log("=== AUTH DEBUG ===");
  console.log("Query params:", req.query);
  console.log("Using BASE_URL:", BASE_URL);
  console.log("Using CALLBACK_URL:", CALLBACK_URL);

  // 🪄 Paso 1: Redirigir a GitHub si no hay "code"
  if (!code) {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope || "repo"}&redirect_uri=${encodeURIComponent(CALLBACK_URL)}`;
    console.log("Redirecting to GitHub:", githubAuthUrl);
    return res.redirect(302, githubAuthUrl);
  }

  // 🪄 Paso 2: Intercambiar el código por el token de acceso
  try {
    console.log("Exchanging code for token...");

    const tokenRequest = {
      client_id,
      client_secret,
      code,
      redirect_uri: CALLBACK_URL
    };

    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(tokenRequest)
    });

    const data = await response.json();
    console.log("GitHub response:", data.error || "Success");

    if (data.access_token) {
      console.log("✅ Token recibido correctamente");

      // 🔹 Importante: usa un origen explícito (no '*') para evitar perder el token
      const ORIGIN = BASE_URL;

      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>OAuth Success</title>
          </head>
          <body>
            <script>
              (function() {
                const authData = 'authorization:github:success:' + JSON.stringify({
                  token: '${data.access_token}',
                  provider: 'github'
                });

                console.log('✅ Enviando token a ${ORIGIN}');
                
                if (window.opener) {
                  window.opener.postMessage(authData, '${ORIGIN}');
                  setTimeout(() => {
                    console.log('Cerrando ventana');
                    window.close();
                  }, 1000);
                } else {
                  document.body.innerHTML = '<p>Autenticación completada. Puedes cerrar esta ventana.</p>';
                }
              })();
            </script>
            <p>Autenticación completada correctamente. Esta ventana se cerrará en unos segundos...</p>
          </body>
        </html>
      `;

      res.setHeader("Content-Type", "text/html");
      return res.status(200).send(html);
    } else {
      console.error("❌ No se recibió access_token:", data);
      return res.status(401).json({
        error: "No access token received",
        details: data
      });
    }
  } catch (err) {
    console.error("❌ OAuth error:", err);
    return res.status(500).json({
      error: "OAuth server error",
      message: err.message
    });
  }
}
