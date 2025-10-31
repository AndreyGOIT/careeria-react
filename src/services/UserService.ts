import axios from "axios";
import type { User } from "../types/UserType";

const baseUrl = "http://localhost:5109/api/Users";

// export interface User {
//   userId: number;
//   firstname: string;
//   lastname: string;
//   username: string;
//   password: string;
//   accesslevel: number;
// }

// Fetch all users
// use: UserService.getAll().then(data => ...)
const getAll = () => {
  const requestOptions = axios.get(baseUrl);
  return requestOptions.then((response) => response.data);
};

// Create a new user
// use: UserService.create(newUser).then(response => ...)
const create = (newUser: Omit<User, "userId">) => {
  const requestOptions = axios.post(baseUrl, newUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });

  return requestOptions.then((response) => response.data);
};

// Edit an existing customer
// use: UserService.update(userId, updatedUser).then(response => ...)
const update = (userId: number, updatedUser: User) => {
  const requestOptions = axios.put(`${baseUrl}/${userId}`, updatedUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });

  return requestOptions.then((response) => response.data);
};

// Delete a user by ID
// use: UserService.remove(userId).then(response => ...)
const remove = (userId: number) => {
  const requestOptions = axios.delete(`${baseUrl}/${userId}`);

  return requestOptions.then((response) => response.data);
}

export default { getAll, create, update, remove };
