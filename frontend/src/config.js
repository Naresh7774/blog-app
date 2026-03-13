export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log('Current API URL:', API_URL);
if (!import.meta.env.VITE_API_URL) {
    console.warn('VITE_API_URL is not defined! Falling back to localhost:5000');
}
