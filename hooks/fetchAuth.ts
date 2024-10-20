// Function to make an API request with an access token
async function fetchWithAuthAndJson(url, accessToken, refreshToken, jsonData) {
  const response = await fetch(url, {
    method: 'POST', // or 'PUT', 'DELETE', etc. depending on your request type
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',  // This indicates you're sending JSON
    },
    body: JSON.stringify(jsonData), // Converts JavaScript object to JSON string
  });

  // If the access token is expired (e.g., 401 Unauthorized)
  if (response.status === 401) {
    // Try refreshing the access token
    const newAccessToken = await refreshAccessToken(refreshToken);

    if (newAccessToken) {
      // Retry the original request with the new access token
      return fetch(url, {
        method: 'POST', // or other methods like 'PUT', 'DELETE'
        headers: {
          'Authorization': `Bearer ${newAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
    } else {
      throw new Error('Unable to refresh access token');
    }
  }

  return response; // Return the original response if successful
}
async function fetchWithAuthAndJson(url, accessToken, refreshToken, jsonData) {
    const response = await fetch(url, {
      method: 'POST', // or 'PUT', 'DELETE', etc. depending on your request type
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',  // This indicates you're sending JSON
      },
      body: JSON.stringify(jsonData), // Converts JavaScript object to JSON string
    });
  
    // If the access token is expired (e.g., 401 Unauthorized)
    if (response.status === 401) {
      // Try refreshing the access token
      const newAccessToken = await refreshAccessToken(refreshToken);
  
      if (newAccessToken) {
        // Retry the original request with the new access token
        return fetch(url, {
          method: 'POST', // or other methods like 'PUT', 'DELETE'
          headers: {
            'Authorization': `Bearer ${newAccessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
        });
      } else {
        throw new Error('Unable to refresh access token');
      }
    }
  
    return response; // Return the original response if successful
  }
  

  
  // Function to refresh the access token
  async function refreshAccessToken(refreshToken) {
    const response = await fetch('https://your-auth-server.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });
  
    if (response.ok) {
      const data = await response.json();
      return data.access_token; // Return the new access token
    } else {
      // Handle refresh token failure (e.g., if refresh token is also expired)
      console.error('Failed to refresh access token');
      return null;
    }
  }
  