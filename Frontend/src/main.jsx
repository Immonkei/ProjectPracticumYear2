import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { BrowserRouter, Routes, Route } from "react-router"
import Root from "./Layout/Root.jsx"
import About from "./Page/About.jsx"
import Jobs from "./Page/Jobs.jsx"
import Services from "./Page/Services.jsx"
import Login from "./Auth/Login.jsx"
import Resgister from "./Auth/Resgister.jsx"
import Profile from "./Auth/Profile.jsx"

createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <Routes>
        <Route element={<Root />}>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/services" element={<Services />} />

        </Route>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Resgister />} />
        <Route path="/profile" element={<Profile />} />


      </Routes>
    </BrowserRouter>

)
