import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Add uuid package if not already installed

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  // Initialize or retrieve tabId
  useEffect(() => {
    let tabId = sessionStorage.getItem("tabId");
    if (!tabId) {
      tabId = uuidv4();
      sessionStorage.setItem("tabId", tabId);
      console.log("AuthContext: New tabId generated", { tabId });
    } else {
      console.log("AuthContext: Existing tabId retrieved", { tabId });
    }

    // Initial authentication check
    const storedToken = sessionStorage.getItem(`adminToken_${tabId}`);
    const storedUsername = sessionStorage.getItem(`loggedInAdmin_${tabId}`);
    const loggedIn = localStorage.getItem(`loggedInAdmin_${tabId}`) !== null;

    console.log("AuthContext: Initial storage check", {
      tabId,
      storedToken: !!storedToken,
      storedUsername,
      loggedIn,
    });

    if (storedToken && storedUsername && loggedIn) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUsername(storedUsername);
    }
    setIsLoading(false);
  }, []); // Runs once on mount

  // Set up and update Axios interceptor
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        const currentTabId = sessionStorage.getItem("tabId");
        const adminToken = sessionStorage.getItem(`adminToken_${currentTabId}`);
        console.log("AuthContext: Axios interceptor", {
          url: config.url,
          tabId: currentTabId,
          hasToken: !!adminToken,
          stateToken: !!token, // Compare with state for debugging
        });
        if (adminToken) {
          config.headers.Authorization = `Bearer ${adminToken}`;
          console.log("AuthContext: Added Authorization header", `Bearer ${adminToken.substring(0, 10)}...`);
        } else {
          console.warn("AuthContext: No token found for request", config.url);
        }
        return config;
      },
      (error) => {
        console.error("AuthContext: Interceptor error", error);
        return Promise.reject(error);
      }
    );

    return () => {
      console.log("AuthContext: Ejecting Axios interceptor");
      axios.interceptors.request.eject(interceptor);
    };
  }, [token]); // Re-run when token changes

  const login = (newToken, newUsername) => {
    const tabId = sessionStorage.getItem("tabId");
    console.log("AuthContext: Login called", { newToken, newUsername, tabId });
    if (tabId) {
      sessionStorage.setItem(`adminToken_${tabId}`, newToken);
      sessionStorage.setItem(`loggedInAdmin_${tabId}`, newUsername);
      localStorage.setItem(`loggedInAdmin_${tabId}`, newUsername);
      const activeSessions = JSON.parse(localStorage.getItem("activeAdminSessions") || "{}");
      activeSessions[tabId] = newUsername;
      localStorage.setItem("activeAdminSessions", JSON.stringify(activeSessions));
      console.log("AuthContext: Stored auth data", {
        token: newToken.substring(0, 10) + "...",
        username: newUsername,
        tabId,
      });
    }
    setIsAuthenticated(true);
    setToken(newToken);
    setUsername(newUsername);
  };

  const logout = () => {
    const tabId = sessionStorage.getItem("tabId");
    console.log("AuthContext: Logout called", { tabId });
    if (tabId) {
      sessionStorage.removeItem(`adminToken_${tabId}`);
      sessionStorage.removeItem(`loggedInAdmin_${tabId}`);
      localStorage.removeItem(`loggedInAdmin_${tabId}`);
      const activeSessions = JSON.parse(localStorage.getItem("activeAdminSessions") || "{}");
      delete activeSessions[tabId];
      localStorage.setItem("activeAdminSessions", JSON.stringify(activeSessions));
      console.log("AuthContext: Cleared auth data for tab", tabId);
    }
    setIsAuthenticated(false);
    setToken(null);
    setUsername(null);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);