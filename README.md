# 💰 Advanced Expense Tracker

> A modern, full-stack personal finance application built with the MERN stack (MongoDB, Express, React, Node.js) and Vite.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

---

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Architecture & Technologies](#-architecture--technologies)
- [Project Preview](#-project-preview)
- [Getting Started](#-getting-started)
- [Folder Structure](#-folder-structure)
- [API Endpoints](#-api-endpoints)
- [License](#-license)

---

## 🎯 About the Project

The **Advanced Expense Tracker** is a sleek, dynamic web application designed to help users take control of their finances. Traditional expense trackers often lack intuitive visualizations and smooth user experiences. This project solves that by integrating beautifully crafted interactive charts, secure JWT-based authentication, and a clean, split-component dashboard layout.

Whether you're tracking daily coffee runs or monitoring large business investments, this application provides clarity through detailed history logs, customizable transaction categories, and one-click data extraction directly to Excel.

---

## ✨ Key Features

- **🔐 Secure Authentication:** Complete Login/Register flows utilizing `jsonwebtoken` (JWT) and `bcryptjs` for hashed password encryption.
- **📊 Intuitive Dashboard:** A central hub calculating Total Balance, Total Income, and Total Expenses dynamically.
- **📉 Visual Analytics:** Interactive Data visualization using `recharts` for immersive Area (Wave), Bar (Tower), and Pie charts.
- **💼 Transactions Management:** Fully functional CRUD (Create, Read, Update, Delete) operations separated into distinct Income and Expense interfaces.
- **🗂️ Categorization:** Organized tracking via customizable categories enriched with thematic UI icons (`flat-color-icons`).
- **📥 Data Export:** "Export to Excel" functionality leveraging the `xlsx` library, enabling offline spreadsheet reporting.
- **📱 Responsive Layout:** Clean Vanilla CSS with flexbox/grid integration tailored for seamless rendering across screen dimensions, including a beautiful split-screen UI.

---

## 🛠 Architecture & Technologies

**Frontend (Client)**
- **Framework:** React 18 powered by Vite for rapid HMR and optimized builds.
- **State Management:** React Context API (`AuthContext`, `TransactionContext`).
- **Routing:** `react-router-dom` (Protected routes applied to Dashboard/History).
- **Styling:** Vanilla CSS3 (Custom Variables, Flexbox, CSS Grid, Modals).
- **Charting & Utilities:** `recharts`, `axios`, `react-icons`, `xlsx`.

**Backend (Server)**
- **Runtime:** Node.js
- **Framework:** Express.js (RESTful architecture).
- **Database:** MongoDB configured with Mongoose Document Object Mapper.
- **Security:** JWT Authentication, `cors` middleware configurations.

---

## 📸 Hình ảnh Dự án

### Giao diện Bảng Điều khiển (Dashboard)
Biểu diễn thông minh trực quan với thẻ phân loại, đồ thị sóng và tháp phân bổ dòng tiền:
![Dashboard Preview](./frontend/public/assets/dashboard_preview.png)

### Giao diện Đăng Nhập/Đăng ký (Authentication)
Xây dựng theo cấu trúc phân tách (Split-screen), mang lại cảm giác bảo mật và chuyên nghiệp:
![Login Preview](./frontend/public/assets/login_preview.png)

---

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.0 or higher)
- [MongoDB](https://www.mongodb.com/) (Local server or MongoDB Atlas URI)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nguyendinhtrang3112/expense-tracker.git
   cd expense-tracker
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   * Create a `.env` file in the `backend/` directory:
     ```env
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_super_secret_key_here
     ```
   * Start the server:
     ```bash
     npm start # or npm run dev
     ```

3. **Frontend Setup:**
   ```bash
   # Open a new terminal
   cd frontend
   npm install
   ```
   * Start the Vite development server:
     ```bash
     npm run dev
     ```

4. **Access the Application:**
   Open your browser and navigate to `http://localhost:5173`.

---

## 📁 Folder Structure

```text
expense-tracker/
├── backend/
│   ├── controllers/      # Route logic (authController, transactionController)
│   ├── middleware/       # JWT Authorization hooks
│   ├── models/           # Mongoose schemas (User, Transaction)
│   ├── routes/           # Express router endpoints
│   ├── server.js         # Backend Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI (Sidebar, Charts, AuthSidebar)
    │   ├── context/      # Global State Management (Auth, Transactions)
    │   ├── pages/        # Main Views (Dashboard, Income, Expenses, Auth)
    │   ├── utils/        # Helper functions (Export to Excel)
    │   ├── App.jsx       # Routing & Protect Routes wrapper
    │   ├── main.jsx      # React Entry Point
    │   └── index.css     # Global CSS themes and reset
    ├── index.html        
    ├── vite.config.js    # Vite Build configuration
    └── package.json
```

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| POST | `/register` | Create a new user profile | No |
| POST | `/login` | Authenticate and obtain JWT | No |

### Transactions (`/api/transactions`) - *All require JWT*
| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/dashboard` | Retrieve aggregated stats for chart rendering |
| GET | `/income` | Fetch all incomes for the auth session |
| POST | `/income` | Create a new income record |
| DELETE| `/income/:id`| Remove a specific income record |
| GET | `/expenses` | Fetch all expenses for the auth session |
| POST | `/expenses` | Create a new expense record |
| DELETE| `/expenses/:id`| Remove a specific expense record |

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Built with ❤️ by [Nguyễn Đình Tráng](https://github.com/nguyendinhtrang3112)*
