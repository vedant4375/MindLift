import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  NotificationProvider,
  useNotification,
} from "./context/NotificationContext";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Dashboard from "./pages/Dashboard";
import Relax from "./pages/Relax";
import Games from "./pages/Games";
import Journey from "./pages/Journey";
import defaultUser from "./data/defaultUser";
import { initializeUserData } from "./utils/storage";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/relax" element={<Relax />} />
        <Route path="/games" element={<Games />} />
        <Route path="/journey" element={<Journey />} />
      </Routes>
    </AnimatePresence>
  );
};

const GlobalNotifications = () => {
  const { addNotification } = useNotification();

  useEffect(() => {
    const alerts = [
      { msg: "Remember to drink water! 💧", type: "info" },
      { msg: "Time for a quick stretch? 🧘", type: "success" },
      { msg: "Your focus score is rising! 🚀", type: "success" },
      { msg: "Take a deep breath... 🌬️", type: "info" },
    ];

    const timer = setInterval(() => {
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      addNotification(randomAlert.msg, randomAlert.type);
    }, 60000);

    return () => clearInterval(timer);
  }, [addNotification]);

  return null;
};

function App() {
  useEffect(() => {
    initializeUserData(defaultUser);
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen text-white overflow-hidden bg-gradient-to-br from-indigo-950 via-black to-purple-950">
        <NotificationProvider>
          <GlobalNotifications />
          <AnimatedRoutes />
        </NotificationProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;