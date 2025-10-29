export default async function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;
  
  // URL base hardcodeada para evitar problemas
  const BASE_URL = 'https://astro-decap-cms-blog.vercel.app';
  const CALLBACK_URL = `${BASE_URL}/api/auth`;
  
  const { code, scope } = req.query;

  // LOG para debug
  console.log('=== AUTH ENDPOINT DEBUG ===');
  console.log('Query params:', req.query);
  console.log('Code present:', !!code);
  console.log('Using callback URL:', CALLBACK_URL);

  // PASO 1: Si no hay 'code', redirigir a GitHub
  if (!code) {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope || 'repo'}&redirect_uri=${encodeURIComponent(CALLBACK_URL)}`;
    console.log('Redirecting to GitHub:', githubAuthUrl);
    return res.redirect(302, githubAuthUrl);
  }

  // PASO 2: Intercambiar código por token
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
      console.log('Token received successfully');
      
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>OAuth Success</title>
          </head>
          <body>
            <script>
              (function() {
                const authData = 'authorization:github:success:${JSON.stringify({
                  token: data.access_token,
                  provider: 'github'
                })}';
                
                console.log('Sending message to opener');
                
                if (window.opener) {
                  window.opener.postMessage(authData, '*');
                  setTimeout(() => {
                    console.log('Closing window');
                    window.close();
                  }, 1000);
                } else {
                  document.body.innerHTML = '<p>Authentication successful! Please close this window and return to the CMS.</p>';
                }
              })();
            </script>
            <p>Authorization successful! This window should close automatically...</p>
          </body>
        </html>
      `;
      
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(html);
    } else {
      console.error("No access token in response:", data);
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