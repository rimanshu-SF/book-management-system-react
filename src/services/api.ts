import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3003/auth"
});

export const googleLogin = (code: string) => 
  api.get(`/google/login?code=${code}`);

export const googleSignup = (code: string) => 
  api.get(`/google/signup?code=${code}`);