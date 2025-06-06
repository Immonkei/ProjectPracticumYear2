import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { BrowserRouter, Routes, Route } from "react-router"
import Root from "./Layout/Root.jsx"
import About from "./Page/About.jsx"
import Services from "./Page/Services.jsx"
import Login from "./Auth/Login.jsx"
import Resgister from "./Auth/Resgister.jsx"
import Profile from "./Auth/Profile.jsx"
import AuthCallback from "./Auth/AuthCallback.jsx"

createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <Routes>
        <Route element={<Root />}>
          <Route path="/" element={<App />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />

        </Route>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Resgister />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/callback" element={<AuthCallback />} />


      </Routes>
    </BrowserRouter>

)
