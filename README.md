## 🔗 App Navigation (Important for Evaluator)

Please visit the following routes after running the project:

- 🧾 **Registration & Auth:** [http://localhost:3000/register](http://localhost:3000/register)
  - Register with your email, roll number, and access code
  - Automatically retrieves `clientID`, `clientSecret`, and `access_token`
  
- ✂️ **URL Shortener (Home):** [http://localhost:3000/](http://localhost:3000/)
  - Shorten up to 5 URLs with optional custom code and expiry

- 📊 **Statistics Dashboard:** [http://localhost:3000/stats](http://localhost:3000/stats)
  - View short link history, click analytics, and expiry info

# 🔗 URL Shortener App (Evaluation Project)

This is a full-featured **React + Material UI** based URL Shortener application developed as part of the evaluation challenge.

---

## 🚀 Features

- ✅ Shorten up to **5 URLs concurrently**
- 📝 Supports **custom shortcodes** (optional)
- ⏳ Allows setting **validity period** in minutes (optional)
- 📬 Displays shortened links with:
  - Original URL
  - Short URL
  - Expiry time
- 🛡️ Complete **client-side validation** and error handling
- 📊 Dedicated **Statistics Page** showing:
  - Total click count per short link
  - Click timestamp, referrer, and location (simulated)
- 🧠 All data persisted in `localStorage` for demonstration

---

## 📌 Tech Stack

- ⚛️ **React** (Functional components, Hooks)
- 🎨 **Material UI (MUI)** for styling (no external CSS libraries used)
- 📦 **Axios** for API communication
- 🗃️ `localStorage` for storing auth, stats, and links

---

## 🔐 Authentication Flow

The app uses the official **evaluation-service API** for:

- Registration (`/register`)
- Authentication (`/auth`) to get a valid `access_token`
- Access token is stored in localStorage and used in protected calls

---

## 📁 Project Structure

```
src/
├── components/
│   ├── RegisterAndAuth.jsx
│   ├── StatisticsPage.jsx
│   └── [Other UI Components]
├── App.js / index.js
```

---

## 🧪 How to Run Locally

1. Clone the repo  
   ```bash
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Start the app  
   ```bash
   npm start
   ```

4. Navigate to:
   - `/register` for registration + auth
   - `/` for URL shortener
   - `/stats` for statistics dashboard

---

## ✅ Screenshots

*(Add screenshots here if required by the evaluator)*

---

## 📃 License

This project is submitted for evaluation purposes only. All API integrations are for demo/testing under the instructions provided.

