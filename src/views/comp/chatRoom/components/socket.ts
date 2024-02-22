import { io } from "socket.io-client";
const appEnv = import.meta.env.VITE_APP_ENV;
const baseApi = import.meta.env.VITE_BASE_API;
const URL =appEnv=='production'? baseApi :"http://localhost:3080"

export const socket = io(URL);