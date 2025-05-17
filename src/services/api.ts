import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:4004/auth",
});

export const googleLogin = async (code: string) => {
    const response = await api.get('/google', {
      params: { code },
    });
    return response; 
};

// If you have a separate signup flow, you can keep this or adjust it similarly
export const googleSignup = () => {
  window.location.href = `${api.defaults.baseURL}/google/signup`;
};