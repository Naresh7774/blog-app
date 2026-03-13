export const API_URL = import.meta.env.VITE_API_URL || 'https://blog-app-d7ol.onrender.com';

console.log('Current API URL:', API_URL);
if (!import.meta.env.VITE_API_URL) {
    console.log('Using default production API URL: https://blog-app-d7ol.onrender.com');
}
