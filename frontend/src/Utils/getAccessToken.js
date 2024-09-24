export const getAccessToken = async () => {
    const clientId = '1fbd364d32d3464ab2512df49c865349';
    const clientSecret = '6e71f5e0666249ad91f322c5cf880a2c';

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
        }),
    });
    const data = await response.json();
    console.log('data',data);
    
    return data.access_token;
};
