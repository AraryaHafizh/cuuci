import axios from "axios";
import { getSession } from "next-auth/react";

export const cuuciApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CUUCI_API,
});

// Add interceptor to automatically add token
cuuciApi.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user?.accessToken) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`;
  }
  return config;
});
