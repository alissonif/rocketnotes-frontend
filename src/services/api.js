import axios from "axios";

export const api = axios.create({
  baseURL: "https://rocketnotes-api-d379.onrender.com",
});

api.get("/users/:id");
