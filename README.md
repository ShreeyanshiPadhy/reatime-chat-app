# 💬 Realtime Chat Application

A realtime chat application built using **Next.js**, **React**, and **Socket.IO**.  
Users can join a chat room using a username and room ID and exchange messages in realtime.

---

## 🚀 Features

- Realtime messaging using Socket.IO  
- Join chat rooms using a Room ID  
- Displays system messages when users join  
- Message timestamps  
- Clean and responsive UI  
- Thinner, modern chat container  
- Styled system messages  

---

## 🛠 Tech Stack

- **Next.js** – Frontend framework  
- **React** – UI components  
- **Socket.IO** – Realtime communication  
- **TypeScript** – Type safety  
- **Tailwind CSS** – Styling  

---

## ⚙️ How It Works

1. User enters a **username** and **room ID**  
2. Client connects to the Socket.IO server  
3. User joins a room  
4. Messages are broadcast to all users in the same room  
5. System messages are shown when users join  

---

## 🏃‍♂️ Running the Project Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/ShreeyanshiPadhy/reatime-chat-app.git
cd reatime-chat-app
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the application (frontend + socket server together)

```bash
npm run dev:socket
```

### 4️⃣ Open in browser

```text
http://localhost:3000
```

---

## 📁 Project Structure

```
reatime-chat-app/
├── app/                 # Next.js app pages
├── components/          # UI components (ChatForm, ChatMsg)
├── lib/                 # Socket client setup
├── server.mts           # Socket.IO server
├── public/              # Static assets
├── package.json
└── README.md
```

---

## 🔌 Socket Events

### Client → Server

```
joinRoom → { roomId, username }
message  → { roomId, sender, message, timestamp }
```

### Server → Client

```
userJoined → { message }
message    → { sender, message, timestamp }
```

---

## ⚠️ Deployment Note

Socket.IO requires a **persistent server**.
Serverless platforms like **Vercel** do not support long-running WebSocket connections.

This project is intended to be run locally or deployed on platforms that support persistent servers (e.g. Railway, Render).

---
