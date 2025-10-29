export default async function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;
  
  const { code, provider, site_id, scope } = req.query;

  // LOG PARA DEBUG
  console.log('=== DEBUG INFO ===');
  console.log('site_id:', site_id);
  console.log('code:', code ? 'present' : 'missing');
  console.log('full query:', req.query);

  // PASO 1: Si no hay 'code', redirigir a GitHub para autorización
  if (!code) {
    const redirect_uri = `https://${site_id}/api/auth`;
    console.log('redirect_uri being used:', redirect_uri);
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope || 'repo,user'}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
    
    console.log('Redirecting to:', githubAuthUrl);
    return res.redirect(302, githubAuthUrl);
  }

  // PASO 2: Si hay 'code', intercambiarlo por access_token
  try {
    const redirect_uri = `https://${site_id}/api/auth`;
    console.log('Exchanging code with redirect_uri:', redirect_uri);
    
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "Accept": "application/json" 
      },
      body: JSON.stringify({ 
        client_id, 
        client_secret, 
        code,
        redirect_uri
      })
    });

    const data = await response.json();
    console.log('GitHub response:', data);

    if (data.access_token) {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>OAuth Success</title>
          </head>
          <body>
            <script>
              (function() {
                const receiveMessage = (message) => {
                  window.opener.postMessage(
                    'authorization:github:success:${JSON.stringify({
                      token: data.access_token,
                      provider: 'github'
                    })}',
                    message.origin
                  );
                };
                
                window.addEventListener("message", receiveMessage, false);
                
                window.opener.postMessage(
                  'authorization:github:success:${JSON.stringify({
                    token: data.access_token,
                    provider: 'github'
                  })}',
                  window.location.origin
                );
                
                setTimeout(() => window.close(), 1000);
              })();
            </script>
            <p>Authorization successful! This window should close automatically.</p>
          </body>
        </html>
      `;
      
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(html);
    } else {
      console.error("GitHub OAuth error:", data);
      return res.status(401).json({ 
        error: "No access token received", 
        details: data 
      });
    }
  } catch (err) {
    console.error("OAuth error:", err);
    return res.status(500).json({ 
      error: "OAuth server error",
      message: err.message 
    });
  }
}