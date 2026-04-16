# 🏋️‍♂️ Fitness Tracker (Full Stack Project)

## 📌 Project Description
This is a full-stack Fitness Tracker application that allows users to monitor and manage their daily fitness activities efficiently. The system enables users to log workouts, track calories burned, and receive personalized recommendations based on their activity.

The project is built using modern backend and frontend technologies, focusing on clean architecture, RESTful APIs, and user-friendly UI.

---

## 🚀 Features
- User registration and login (authentication & authorization)
- Add, update, delete fitness activities
- Track activity duration and calories burned
- View activity history
- Personalized fitness recommendations
- REST API integration with frontend
- Responsive user interface

---

## 🛠️ Tech Stack

### 🔹 Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL (or any relational database)
- REST APIs
- Swagger UI (API testing)

### 🔹 Frontend
- HTML
- CSS
- JavaScript
- Fetch API (for API calls)

---

## 📂 Project Structure

### Backend
```
fitness-backend/
 ┣ src/main/java/com/project/fitness_app/
 ┃ ┣ controller/
 ┃ ┣ service/
 ┃ ┣ repository/
 ┃ ┣ model/
 ┃ ┗ dto/
 ┣ src/main/resources/
 ┃ ┣ application.properties
 ┣ pom.xml
```

### Frontend
```
fitness-frontend/
 ┣ index.html
 ┣ login.html
 ┣ dashboard.html
 ┣ css/
 ┣ js/
```

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup
1. Clone the repository
2. Open project in IntelliJ IDEA or Eclipse
3. Configure database in `application.properties`
4. Run the Spring Boot application
5. Access Swagger UI:
   http://localhost:8080/swagger-ui/index.html

### 💻 Frontend Setup
1. Open frontend folder
2. Run using Live Server or open `index.html`
3. Make sure backend is running

---

## 🔗 API Endpoints (Sample)
- POST /auth/login
- POST /auth/register
- GET /activities
- POST /activities
- DELETE /activities/{id}
- GET /recommendations

---

## 📊 Future Enhancements
- Add JWT authentication
- Add charts/analytics dashboard
- Mobile app version
- Social features (sharing progress)

---

## 👨‍💻 Author
Nikhil Kumar
  
