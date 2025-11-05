// src/services/Auth.ts
import api from "./api"; // common axios instance with interceptor

export interface AuthCredentials {
  username: string;
  password: string;
}

// User login
// use: AuthService.authenticate(credentials).then(data => ...)
const authenticate = async (credentials: AuthCredentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export default { authenticate };