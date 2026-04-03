# ✈️ AeroDesk – Airport Check-in Queue Simulator

## 📌 Project Overview

AeroDesk is a full-stack web application that simulates an airport check-in system using a **priority-based queue mechanism**. Passengers are processed based on their travel class priority:
**Business > Priority > Economy**.

---

## 🚀 Features

* Add passenger details (Name, Flight Number, Travel Class)
* Priority-based queue management
* Real-time queue display
* Check-in processing (serve next passenger)
* Checked-in passenger history tracking
* Dynamic UI updates using JavaScript

---

## 🛠️ Technologies Used

* **Frontend:** HTML5, CSS3, JavaScript (ES6)
* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **Other:** CORS, Fetch API

---

## ⚙️ How It Works

### 1. Passenger Check-in

User enters passenger details → Data sent to backend using POST request → Stored in database.

### 2. Queue Management

Passengers are sorted based on priority:

* Business (Highest)
* Priority
* Economy (Lowest)

### 3. Check-in Process

Highest priority passenger is removed from queue and added to checked-in history.

### 4. History Tracking

All processed passengers are stored and displayed with timestamps.

---

## 📂 Project Structure

airport-checkin/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── package-lock.json

---

## ▶️ How to Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start server:

```bash
node server.js
```

3. Open in browser:

```
http://localhost:3000
```

---

## 🌍 Deployment Note

For online deployment, a cloud database (like PlanetScale) is required instead of localhost MySQL.

---

## 🎯 Key Concept

This project demonstrates the implementation of a **Priority Queue (DSA concept)** in a real-world application.

---

## 👩‍💻 Author

Bushra Shaikh
