# 🔐 Forgot Password & Authentication System

This is a full-stack user authentication system built using **Node.js**, **Express.js**, **MongoDB**, and **EJS**. It includes login, signup, and secure password reset functionality using OTP verification via email.

---

## 🚀 Features

- ✅ User Signup & Login
- 🔐 Password Hashing with **bcrypt**
- 📧 Forgot Password with OTP Verification
- 🛡️ Secure Password Reset via Hashed Update
- ✉️ Email-based OTP verification
- 🎨 Responsive UI using **Bootstrap 5**
- 📂 Clean MVC-based folder structure

---

## 🛠️ Tech Stack

| Tech         | Description                    |
|--------------|--------------------------------|
| Node.js      | JavaScript runtime             |
| Express.js   | Web framework for Node.js      |
| MongoDB      | NoSQL Database                 |
| Mongoose     | MongoDB ODM                    |
| EJS          | Template Engine for Views      |
| bcrypt       | Password Hashing               |
| Bootstrap 5  | Frontend Styling               |

---

## 📁 Folder Structure

project/
├── models/ # Mongoose Models (User, OTP)
├── views/ # EJS Templates (login, signup, reset, etc.)
├── routes/ # Express Routers
├── controllers/ # Route Controllers
├── public/ # Static CSS files
├── app.js # Main server file
├── .env # Environment variables (for email config)


---

## ⚙️ How It Works

1. User visits **Forgot Password** page and enters their registered email.
2. OTP is sent to the user's email.
3. User submits OTP on the **Verify OTP** page.
4. If OTP is valid, user is redirected to the **Reset Password** page.
5. New password is hashed and saved to the database securely.

---

## 🧪 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
