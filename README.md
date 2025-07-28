# 🧩 Full Stack Assessment – Nuramira Ahmad Mahmud

This is my submission for the Mid-Level Full Stack Developer Technical Assessment. It includes a **RESTful backend API** and a **React frontend interface** for managing courses. The project follows best practices in architecture, modularity, and documentation.

## 🔧 Technologies Used

### Backend
- Node.js, Express.js
- MongoDB, Mongoose
- Joi (input validation)
- Swagger UI (API documentation)
- dotenv
- MVC structure
- Soft delete logic

### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Axios
- Formik + Yup (form validation)

---

## 🧪 Features Implemented

### ✅ Backend (Task 1)
- RESTful course API (CRUD)
- MVC pattern with services and controllers
- Mongoose models
- Joi request validation
- Soft delete using `isDeleted` and `deleted_at`
- Swagger API docs at `/api-docs`

### ✅ Frontend (Task 2)
- Course listing with title, price, and instructor
- "View" button linking to course detail
- Filter by status or instructor (Drowndown)
- Course creation form
- Form validation with Yup
- API integration using Axios

---

## ⚙️ Setup Instructions

### 📦 1. Clone the repo

```bash
git clone https://github.com/Mira2714/FSAssessment_NuramiraBintiAhmadMahmud.git
cd FSAssessment_NuramiraBintiAhmadMahmud
```

### 🧩 2. Setup Backend
```bash
cd backend
npm install
copy .env.example .env
```
Then run:
```bash
npm run dev
```
Summary: 
API runs on: http://localhost:3000
Swagger UI: http://localhost:3000/api-docs

### 🎨 3. Setup Frontend
```bash
cd frontend
npm install
copy .env.example .env
```
**Copy `.env.example` to `.env` and update `REACT_APP_API_URL` if your backend runs on a different URL or port.

Then run:
```bash
npm start
```

