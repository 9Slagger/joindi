# JoinDi

## 📘 Description

JoinDi คือ ระบบกลาง

## 📦 Built With

### Frontend

- [x] React
- [x] Ant Design

### Backend

- [x] NodeJS
- [x] Express
- [x] MySQL2

## 🛠 Structure

```mermaid
graph LR;
  JoinDi-frontend --> JoinDi-backend;
  JoinDi-backend -->JWT
  JWT -->|Authentication| JoinDi-backend;
  JoinDi-backend --> Sequelize;
  Sequelize --> MySQL;
```

## 📋 Features

- สามารถสร้าง Event ได้
- สามารถเข้าร่วม Event ได้
- สามารถจัดการ Event ได้

## 💡 Getting Started

Clone Project

```bash
git clone https://gitlab.com/vgteam/joindi
```

### Frontend

```bash
cd cd joindi/front-end
npm install
npm start
```

### Backend

```bash
cd joindi/back-end
npm install
node index.js
```

Before `node index.js` edit your password and database name in config/config.json

## ⚙️ Configurations

Edit your password and database name in config/config.json

```bash
{
  "development": {
    "username": "root",
    "password": "your-password",
    "database": "your-db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "your-password",
    "database": "your-db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "your-password",
    "database": "your-db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```