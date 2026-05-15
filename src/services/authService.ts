import type { AuthResponse, User } from "../types";
import api from "./api";

export const registerApi = async (
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/register", {
    name,
    email,
    password,
  });
  return data;
};

export const loginApi = async (email: string, password: string) : Promise<AuthResponse> => {
    const {data} = await api.post<AuthResponse>('/auth/login', {
        email, password
    })
    return data
};

export const getProfileApi = async () : Promise<User> => {
    const { data } = await api.get<User>('/auth/profile')
    return data
};
