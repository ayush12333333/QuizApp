# 📚 QuizApp

A **Quiz Application** built with **Spring Boot (backend)** and **React + Tailwind (frontend)**.  
It allows admins to create quizzes and questions, while users can attempt quizzes, view results, and track their progress.

---

## 🚀 Features

### 👤 User
- Signup/Login with JWT authentication  
- Browse available quizzes  
- Attempt quizzes with timer  
- View score and leaderboard  
- Manage profile  

### 🛠️ Admin
- Create, update, and delete quizzes  
- Add and manage questions for each quiz  
- View all users and their attempts  
- Manage leaderboard  

---

## 🏗️ Tech Stack

**Frontend:**  
- React.js  
- Tailwind CSS  
- Context API & React Router  

**Backend:**  
- Spring Boot  
- Spring Security (JWT Auth)  
- MySQL Database  

**Other Tools:**  
- Git & GitHub for version control  
- Postman for API testing  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/ayush12333333/QuizApp
cd quizapp
```
2️⃣ Setup Database (MySQL)
```bash
Install MySQL and create a database:
sql
CREATE DATABASE quizapp;
```

3️⃣ Configure application.properties
```bash
application.properties
spring.application.name=Quiz
spring.datasource.url=jdbc:mysql://localhost:3306/quizapp
spring.datasource.username=root
spring.datasource.password=your_password


# ⚡ JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Server Port
server.port=8081
```
4️⃣ Run Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
Backend will start at: http://localhost:8081
```

5️⃣ Run Frontend (React + Tailwind)
```bash
cd frontend
npm install
npm start
Frontend will start at: http://localhost:5173
```
📸 Screenshot
### 🏠 Dashboard
![Dashboard](screenshots/QuizApp%20Screenshot.png)



