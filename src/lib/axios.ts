import axios from "axios";

export const cuuciApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CUUCI_API,
});
