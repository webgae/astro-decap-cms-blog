export default async function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  // URL base configurable por entorno (mejor para local y producción)
  const BASE_URL = process.env.BASE_URL || 'http://localhost:4321';
  const CALLBACK_URL = `${BASE_URL}/api/auth`;

  const { code, scope } = req.query;

  console.log('=== AUTH DEBUG START ===');
  console.log('Query params:', req.query);
  console.log('Using callback URL:', CALLBACK_URL);
  console.log('Code present:', !!code);

  // Paso 1: redirigir a GitHub si no hay código
  if (!code) {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope || 'repo'}&redirect_uri=${encodeURIComponent(CALLBACK_URL)}`;
    console.log('Redirecting to GitHub:', githubAuthUrl);
    return res.redirect(302, githubAuthUrl);
  }

  // Paso 2: intercambiar el código por un token
  try {
    console.log('Exchanging code for token...');

    const tokenRequest = {
      client_id,
      client_secret,
      code,
      redirect_uri: CALLBACK_URL
    };

    console.log('Token request (without secret):', {
      client_id,
      code: code.substring(0, 10) + '...',
      redirect_uri: CALLBACK_URL
    });

    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(tokenRequest)
    });

    const data = await response.json();
    console.log('GitHub response:', data.error || 'Success');

    if (data.access_token) {
      console.log('Access token received successfully!');

      // HTML que se ejecuta en la ventana emergente de GitHub
      const html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="utf-8">
          <title>Autenticación exitosa</title>
          <style>
            body {
              font-family: system-ui, sans-serif;
              background: #fafafa;
              color: #222;
              text-align: center;
              padding-top: 4rem;
            }
          </style>
        </head>
        <body>
          <h2>Autenticación completada con éxito</h2>
          <p>Esta ventana se cerrará automáticamente...</p>
          <script>
            (function() {
              const authData = 'authorization:github:success:' + JSON.stringify({
                token: '${data.access_token}',
                provider: 'github'
              });

              try {
                // Verificamos que window.opener exista
                if (window.opener && typeof window.opener.postMessage === "function") {
                  console.log("Enviando token al CMS...");
                  window.opener.postMessage(authData, "${BASE_URL}");
                  setTimeout(() => {
                    console.log("Cerrando ventana...");
                    window.close();
                  }, 1500);
                } else {
                  console.warn("No se encontró window.opener, mostrando mensaje manual.");
                  document.body.innerHTML = "<p>Autenticación exitosa. Cierra esta ventana y vuelve al CMS.</p>";
                }
              } catch (error) {
                console.error("Error al enviar el mensaje:", error);
                document.body.innerHTML = "<h3>Error de autenticación</h3><pre>" + error.message + "</pre>";
              }
            })();
          </script>
        </body>
        </html>
      `;

      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(html);
    } else {
      console.error('No se recibió access_token:', data);
      return res.status(401).json({
        error: 'No access token received',
        details: data
      });
    }
  } catch (err) {
    console.error('OAuth error:', err);
    return res.status(500).send(`
      <h1>Error de autenticación OAuth</h1>
      <pre>${err.message}</pre>
      <p>Revisa tus variables de entorno y el callback URL.</p>
    `);
  }
}
