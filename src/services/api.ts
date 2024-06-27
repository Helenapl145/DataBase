import axios from 'axios';

export const api = axios.create({
    baseURL: ""
});


export async function fetchProfile() {
    const access_token = localStorage.getItem("@db")
    
    const response = await api.get('/users/me', {
        headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${access_token}`
        }
    });
    
    const data = response.data.access_level

    return data
}