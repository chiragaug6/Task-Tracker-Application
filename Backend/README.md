# 🛠️ Task Tracker - Backend

This is the **backend** for the **Task Tracker Application**, built using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**. It provides RESTful APIs to support user authentication and task management, using **JWT**, **HTTP-only cookies**, and **secure validation** practices.

---

## 🌍 Deployed API

🔗 **Live API Base URL:**  
[https://task-tracker-bgh4.onrender.com/](https://task-tracker-bgh4.onrender.com/)

---

## ✨ Features

- 🔐 Secure User Authentication with JWT (stored in HTTP-only cookies)
- ✅ Task Management (Create, Read, Update, Delete)
- 📄 Paginated Task Retrieval
- 🧼 Input Validation with Joi
- 🧠 Modular Code Structure
- 🔒 Password Hashing using bcryptjs
- 🍪 Cookie handling via `cookie-parser`
- ⚙️ Configurable via `.env`
- 🔗 CORS-enabled for frontend integration

---

## 🧱 Tech Stack

| Category        | Tech Used                    |
| --------------- | ---------------------------- |
| Server Runtime  | Node.js                      |
| Framework       | Express.js                   |
| Database        | MongoDB + Mongoose ORM       |
| Auth            | JWT, bcryptjs, cookie-parser |
| Validation      | Joi, validator               |
| Env Management  | dotenv                       |
| Deployment Tool | render                       |

---

### 🔧 Local Development

#### 1. Clone the Repository

```bash
git clone https://github.com/chiragaug6/Task-Tracker-Application.git
cd Task-Tracker-Application/backend
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Create .env File

```bash
PORT=3000
MONGO_URI=""
NODE_ENV=""
JWT_EXPIRY=""
JWT_SECRET=""
FRONTEND_URL=""
```

#### 4. Run Development Server

```bash
npm run dev
```

#### 5. Run Production Server

```bash
npm start
```
