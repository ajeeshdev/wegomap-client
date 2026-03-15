export const API_URL = (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim() !== '')  
    ? process.env.NEXT_PUBLIC_API_URL.trim() 
    : 'http://127.0.0.1:5001/api';
