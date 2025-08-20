# 🎬 Mini Movie Search & Save App - Backend

This is the **backend** for the MERN stack machine test project.  
It is built with **Node.js, Express, MongoDB, and TypeScript**.  
The backend provides REST APIs for authentication, searching movies (via OMDb API), and saving user favorites.

---

## 🚀 Features
- 🔐 JWT Authentication (Register, Login, Protected Routes)
- 🎥 Search movies from **OMDb API**
- ❤️ Save and retrieve user favorites
- 🗄️ MongoDB database connection
- ⚙️ Modular code structure with TypeScript


---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/AbhijithTA/MovieSearcher_backend.git
cd backend
```
### 2. Install Dependencies
```
npm Install
```

### 3. Configure Environment Variables
Create a .env file inside the backend folder:

```
PORT=7777
MONGO_URI=mongodb://localhost:27017/moviesdb
JWT_SECRET=your_jwt_secret_key
OMDB_API_KEY=your_omdb_api_key
```

### 4. Start the Development Server
```
npm run dev
```
