# 👗 Snapwear Frontend

Snapwear is a smart fashion e-commerce platform with AI-powered style recommendations, virtual try-ons, and personalized shopping experiences. This is the **frontend** built with **React**, **Vite**, and **Tailwind CSS**.

---

## 🚀 Features

- 🧠 **AI Chatbot** for outfit suggestions
- 🛍️ **Product browsing, cart, and checkout**
- �꩞ **Virtual try-on interface**
- 🔐 **User authentication & profile management**
- 💳 **Stripe payment integration**
- 🎨 Responsive, modern UI with Tailwind CSS

---

## 🧱 Tech Stack

- **React 18**
- **Vite** (for fast dev & build)
- **Tailwind CSS**
- **React Router**
- **Axios** (for API requests)
- **Stripe.js**

---

## 📁 Project Structure

```
src/
├── assets/                  # Images, icons
├── components/              # Shared UI components
├── data/                    # Static data
├── pages/                   # Route-based page components
│   ├── ai/                  # AI chatbot and try-on pages
│   ├── auth/                # Login/Register/Password reset
│   ├── cart and checkout/   # Cart & order handling
│   ├── product/             # Single product page
│   └── user/                # User dashboard & profile
├── routes/                  # Route configuration
├── utils/                   # Helper functions (e.g., api.js)
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/snapwear-frontend.git
cd snapwear-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file if needed (e.g., for AI or backend base URLs).

```env
VITE_API_URL=http://localhost:5000
VITE_AI_SERVICE_URL=http://localhost:8000
```

### 4. Start Development Server

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
```

---

## 🔗 Connected Services

- 🌐 [Snapwear Backend](https://github.com/yourusername/snapwear-backend)
- 🧠 [Snapwear AI Service](https://github.com/yourusername/snapwear-ai-service)

---

## 📸 Screenshots

> _Add UI screenshots here to visually showcase your project_

---

## 📄 License

MIT © [Your Name](https://github.com/yourusername)
