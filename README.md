# MERN Stack Blog Application

## 🚀 Live Demo

[View the live app here](https://your-live-app-url.com)

---

## 🌐 Deployment on Netlify

This project can be deployed on [Netlify](https://www.netlify.com/). Follow these steps for a smooth deployment:

1. **Ensure React and ReactDOM are dependencies**
   - In `client/package.json`:
     ```json
     "dependencies": {
       "react": "^18.0.0",
       "react-dom": "^18.0.0",
       "react-router-dom": "^7.7.0"
     }
     ```
   - If missing, run:
     ```sh
     cd client
     npm install react@latest react-dom@latest react-router-dom@latest
     ```

2. **Use npm and package-lock.json**
   - Netlify prefers `npm` and `package-lock.json`.
   - If you have a `yarn.lock` file in `client/`, delete it:
     ```sh
     rm client/yarn.lock
     ```

3. **Set the build command and publish directory in Netlify**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

4. **Set environment variables on Netlify**
   - Add your frontend `.env` variables (e.g., `VITE_API_URL`) in the Netlify dashboard.

5. **Deploy**
   - Connect your GitHub repo to Netlify and deploy the `client` folder as a site.

---

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project demonstrates seamless integration between front-end and back-end, including database operations, API communication, and state management.

---

## 🚀 Project Overview

This application allows users to:
- View all blog posts
- View individual post details
- Create new posts (with category selection)
- Manage categories

The backend is built with Node.js, Express, and MongoDB (via Mongoose). The frontend is built with React (Vite) and communicates with the backend via RESTful API endpoints.

---

## 📂 Project Structure

```
week-4-mern-integration-assignment-Shacni/
├── client/         # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── ...
├── server/         # Express backend
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env.example
│   └── ...
├── README.md
└── Week4-Assignment.md
```

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm (v8+ recommended)
- MongoDB (local or Atlas)

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd week-4-mern-integration-assignment-Shacni
```

### 2. Install Dependencies

#### Backend

```sh
cd server
npm install
```

#### Frontend

```sh
cd ../client
npm install
```

### 3. Configure Environment Variables

#### Backend (`server/.env`)

Create a `.env` file in the `server` directory:

```
MONGODB_URI=mongodb://localhost:27017/mernblog
JWT_SECRET=your_jwt_secret
PORT=5000
```

#### Frontend (`client/.env`)

Create a `.env` file in the `client` directory (optional for local dev):

```
VITE_API_URL=http://localhost:5000/api
```

### 4. Start the Application

#### Start Backend

```sh
cd server
npm run dev
```

#### Start Frontend

```sh
cd ../client
npm run dev
```

- The frontend will run on [http://localhost:5173](http://localhost:5173)
- The backend runs on [http://localhost:5000](http://localhost:5000)

---

## 📚 API Documentation

### Categories

- `GET /api/categories` — Get all categories
- `POST /api/categories` — Create a new category  
  **Body:** `{ "name": "Category Name" }`

### Posts

- `GET /api/posts` — Get all posts
- `POST /api/posts` — Create a new post  
  **Body:**  
  ```json
  {
    "title": "Post Title",
    "content": "Post content...",
    "category": "<category_id>"
  }
  ```

---

## ✨ Features Implemented

- Modern, responsive UI with React and Vite
- View all posts and post details
- Create new posts with category selection
- Category management
- MongoDB integration with Mongoose
- RESTful API with Express
- Error handling and loading states
- Clean code structure and separation of concerns

---

## 🖼️ Screenshots

> _Add screenshots of your Home page, Create Post page, and MongoDB Compass showing your data here!_

---

## 🧪 Testing the API with Postman

- Test endpoints like `GET /api/categories` and `POST /api/posts` using Postman.
- Example POST request to create a category:
  - URL: `http://localhost:5000/api/categories`
  - Method: `POST`
  - Body: `{ "name": "Test Category" }`

---

## 📝 .env.example Files

**server/.env.example**
```
MONGODB_URI=mongodb://localhost:27017/mernblog
JWT_SECRET=your_jwt_secret
PORT=5000
```

**client/.env.example**
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🧑‍💻 Author

- [Your Name]
- [Your Email or GitHub Profile]

---

## 📄 License

This project is for educational purposes.

---

## 💡 Notes

- Make sure MongoDB is running before starting the backend.
- If you use MongoDB Atlas, update the `MONGODB_URI` in your `.env` file.
- For any issues, check the browser console and backend terminal for error messages.

---

**Good luck and happy coding!** 🚀 
