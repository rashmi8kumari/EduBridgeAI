# 📘 EduBridge — Educational Notes Management System
EduBridge is a full-stack MERN (MongoDB, Express.js, React, Node.js) web application designed to streamline note sharing between teachers and students. It provides a secure, role-based platform where teachers can upload notes, and students can view and download them efficiently.

🚀 Features
👩‍🏫 For Teachers
Upload notes in PDF format with title, subject, and description

Only logged-in teachers can upload

Notes are stored securely and publicly accessible to students



👨‍🎓 For Students
Browse all uploaded notes

Filter notes by subject or teacher

View teacher info associated with each note

Access evaluation history

🔐 Authentication
JWT-based authentication

Role-based access: teacher vs student

Secure protected routes

💻 Frontend
Built with React.js and styled using Bootstrap 5

Responsive and user-friendly UI

Real-time note rendering

Role-specific navigation bar (conditional links for students/teachers)

🧰 Backend
Express.js REST API

MongoDB Atlas with Mongoose for database

Multer for secure file uploads

Role-based access control middleware

🛠️ Tech Stack
Frontend	Backend	Database	Auth	Upload
React.js	Node.js	MongoDB Atlas	JWT	Multer

📂 Folder Structure
pgsql
Copy code
edubridgeai/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── api.js

🧪 How to Run Locally

🧬 Backend
cd backend
npm install
npm run dev

🌐 Frontend
cd frontend
npm install
npm start
Ensure MongoDB URI and JWT_SECRET are configured in .env

🧭 Roadmap / Upcoming Features
🔍 Global search bar for notes

🗂️ Notes categorization by semester/year

🧠 AI-generated summaries of uploaded notes

📈 Dashboard for teacher analytics

📬 Automated email notification system

🌐 Cloud deployment (Render, Netlify, MongoDB Atlas)

🤝 Contribution
Contributions, issues, and feature requests are welcome!

📜 License
This project is licensed under the MIT License.

✨ Acknowledgements
Bootstrap 5

MongoDB Atlas

React Router

Multer for file handling

📬 Contact
Built with ❤️ by Rashmi Kumari
📧 Email: rashmi8shahi@gmail.com
💼 Portfolio: https://personal-portfolio-website-theta-ashen.vercel.app/
