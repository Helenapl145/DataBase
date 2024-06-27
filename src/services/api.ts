import axios from 'axios';

export const api = axios.create({
    baseURL: "https://ftcfke7dq3sryag5zumeerufkm0fiwvv.lambda-url.us-east-1.on.aws"
});


export async function fetchProfile() {
    const access_token = localStorage.getItem("@dtlabs")
    
    const response = await api.get('/users/me', {
        headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${access_token}`
        }
    });
    
    const data = response.data.access_level

    return data
}