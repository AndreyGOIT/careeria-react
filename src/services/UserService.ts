// src/services/UserService.ts
import api from "./api"; // общий axios-инстанс с интерцептором
import type { User } from "../types/UserType";

const resource = "/Users";

// Fetch all users
const getAll = async () => {
  const response = await api.get(resource);
  return response.data;
};

// Create a new user
const create = async (newUser: Omit<User, "userId">) => {
  const response = await api.post(resource, newUser);
  return response.data;
};

// Edit an existing user
const update = async (userId: number, updatedUser: User) => {
  const response = await api.put(`${resource}/${userId}`, updatedUser);
  return response.data;
};

// Delete a user by ID
const remove = async (userId: number) => {
  const response = await api.delete(`${resource}/${userId}`);
  return response.data;
};

export default { getAll, create, update, remove };