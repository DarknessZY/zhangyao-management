import { reactive } from "vue";
import { io } from "socket.io-client";

const URL = "http://localhost:3080"

export const socket = io(URL);