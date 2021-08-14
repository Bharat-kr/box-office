const BASE_API_URL = 'https://api.tvmaze.com';

export async function apiGet(queryString){
    const response = await fetch(`${BASE_API_URL}${queryString}`).then(r => r.json());
    return response;
}