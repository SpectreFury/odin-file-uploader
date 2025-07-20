const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

const ENDPOINTS = {
  auth: {
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
    logout: `${BASE_URL}/auth/logout`
  },
};

export { ENDPOINTS };
