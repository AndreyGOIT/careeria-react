# 🌍 Northwind Full Stack Application

## 🧩 Overview

This project is a **fully functional full stack web application**, developed as part of the Full Stack Developer program.  
It combines a **React (Vite)** frontend and a **.NET 8 Web API** backend connected to an **Azure SQL Database**.  
The app follows RESTful principles and uses **JWT authentication** for secure access.

---

## 💻 Technologies Used

### 🔹 Frontend

- React + Vite + TypeScript
- Axios for API requests
- Bootstrap & CSS styling
- Azure Static Web Apps (deployment)

### 🔹 Backend

- ASP.NET Core 8 Web API
- Entity Framework Core
- SQL Server (Azure SQL Database)
- JWT Authentication & Authorization
- Azure App Service (deployment)

---

## ⚙️ Features

✅ **JWT-based Login & Authentication**  
✅ **Role-based Access Control**  
✅ **CRUD operations** for:

- Users
- Customers
- Products

✅ **Password confirmation validation** during user creation  
✅ **Protected Routes** on the frontend  
✅ **Dynamic feedback messages** (success & error)  
✅ **Consistent UI with Navbar, Modal dialogs & Footer**

---

## 🔐 User Roles

| Role      | AccessLevelID | Permissions                              |
| --------- | ------------- | ---------------------------------------- |
| **Admin** | 1             | Full access (Users, Customers, Products) |
| **User**  | 2             | Limited access                           |

---

## 🌐 Live Demo

| Component                  | URL                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 🎨 Frontend (React + Vite) | [https://ashy-sand-0e2743f03.3.azurestaticapps.net/](https://ashy-sand-0e2743f03.3.azurestaticapps.net/)                 |
| ⚙️ Backend (Swagger UI)    | [https://nwbackendandy.azurewebsites.net/swagger/index.html](https://nwbackendandy.azurewebsites.net/swagger/index.html) |

---

## 🔑 Test Credentials

```text
Role Admin:
Username: TestAdmin
Password: test123

Role User:
Username: TestUser
Password: test123


⸻

🧠 Learning Goals
	•	Implement a full-stack CRUD application
	•	Practice RESTful API integration between frontend and backend
	•	Secure routes with JWT-based authentication
	•	Deploy both client and server on Microsoft Azure

⸻

🧰 Project Structure

/NorthwindVite      → React + Vite frontend
/NWRestfulAPI       → ASP.NET Core backend (C#)
/publish             → Deployed build output


⸻

🧑‍💻 Author

Andrey Erokhin
📍 Porvoo, Finland 🇫🇮
🎓 Full Stack Developer Student — Careeria
💼 GitHub: @andreygoit

⸻

🏁 Status

✅ All requirements have been successfully implemented and tested.
The application is fully deployed and operational on Azure.

---
```
