# 🔐 MERN User Authentication Task

A secure **MERN stack application** implementing user registration, email confirmation, sessions, 2FA (Two-Factor Authentication via email), encrypted data storage, and profile management.  

---

## 🚀 Features

- **User Registration & Email Confirmation**  
  New users must verify their email before login.  

- **Secure Login with 2FA**  
  After password verification, a 6-digit OTP is sent to the user’s email for login confirmation.  

- **Sessions for Authentication**  
  Session-based authentication using `express-session` and `connect-mongo`.  

- **Encrypted User Data**  
  Sensitive fields (name, email) stored in MongoDB with **AES-256-CBC encryption**.  

- **Password Security**  
  Passwords hashed with **bcrypt**.  

- **User Dashboard**  
  Displays decrypted user profile data after login.  

- **Profile Editing**  
  Users can update name, email, and password securely.  

---

## 📦 Tech Stack

- **Frontend:** React, Axios  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** express-session, bcrypt, connect-mongo  
- **Encryption:** crypto (AES-256-CBC)  
- **Email Service:** Nodemailer  

---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/hrudaykumar96/userAuthenticationTask.git
cd userAuthenticationTask

2. Install Dependencies

Install backend dependencies:

cd server
npm install


Install frontend dependencies:

cd ../client
npm install

3. Configure Environment Variables

In the server folder, create a .env file:

MONGO_URI=mongodb://127.0.0.1:27017/mern-auth
SESSION_SECRET=supersecretkey
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
ENCRYPTION_KEY=32characterslongsecretkeyforaes

4. Run the Project

Start the backend:

cd server
npm run dev


Backend runs at http://localhost:5000

Start the frontend:

cd ../client
npm start


Frontend runs at http://localhost:3000


📖 Usage Flow

Register a new account

Confirm email via the otp sent

Login with email + password

Enter the 2FA code received by email

Access Dashboard with profile info

Edit profile (name, email, password) anytime

Logout to end session

🔐 Security Highlights

AES-256-CBC encryption for sensitive fields

Passwords hashed with bcrypt (12 salt rounds)

Session-based authentication (no JWT stored in frontend)

Email confirmation + 2FA required for login


👨‍💻 Author

Hruday Kumar
