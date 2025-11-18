// First, install the js-cookie library:
// npm install js-cookie

import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

// Basic cookie utility functions
export const cookieUtils = {
  // Set a cookie with options
  setCookie: (name, value, options = {}) => {
    Cookies.set(name, value, {
      expires: options.expires || 365, // Default: 1 year
      path: options.path || '/',
      sameSite: options.sameSite || 'Lax',
      secure: options.secure !== undefined ? options.secure : window.location.protocol === 'https:'
    });
  },

  // Get a cookie value
  getCookie: (name) => {
    return Cookies.get(name);
  },

  // Remove a cookie
  removeCookie: (name, options = {}) => {
    Cookies.remove(name, {
      path: options.path || '/',
    });
  },

  // Check if a cookie exists
  hasCookie: (name) => {
    return Cookies.get(name) !== undefined;
  }
};

// Cookie consent component
export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsented = cookieUtils.getCookie('ipet_cookie_consent');
    if (!hasConsented) {
      setVisible(true);
    } else if (hasConsented === 'accepted') {
      // Initialize cookies if consent was previously given
      initializeEssentialCookies();
    }
  }, []);

  const handleAccept = () => {
    cookieUtils.setCookie('ipet_cookie_consent', 'accepted', { expires: 365 });
    setVisible(false);
    initializeEssentialCookies();
  };

  const handleDecline = () => {
    cookieUtils.setCookie('ipet_cookie_consent', 'declined', { expires: 7 });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#2D387D] text-white p-4 flex justify-between items-center z-50">
      <div className="flex-1 pr-4">
        <p className="text-sm md:text-base">
          This website uses cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. 
          <a href="/privacy-policy" className="underline ml-1">Learn more</a>
        </p>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={handleAccept}
          className="bg-white text-[#2D387D] px-4 py-1 rounded text-sm font-medium">
          Accept
        </button>
        <button 
          onClick={handleDecline}
          className="border border-white px-4 py-1 rounded text-sm font-medium">
          Decline
        </button>
      </div>
    </div>
  );
};

// Initialize essential cookies
function initializeEssentialCookies() {
  // Session cookie
  if (!cookieUtils.hasCookie('ipet_session')) {
    const sessionId = Math.random().toString(36).substring(2, 15) + 
                      Math.random().toString(36).substring(2, 15);
    cookieUtils.setCookie('ipet_session', sessionId, { expires: null }); // Session cookie
  }
  
  // User preferences
  if (!cookieUtils.hasCookie('ipet_ui_preferences')) {
    cookieUtils.setCookie('ipet_ui_preferences', JSON.stringify({
      theme: 'light',
      fontSize: 'medium'
    }), { expires: 90 });
  }
  
  // Last visit timestamp
  cookieUtils.setCookie('ipet_last_visit', new Date().toISOString());
}

// Authentication cookies
export const authCookies = {
  // Save authentication data
  saveAuth: (userId, token, remember = false) => {
    const expires = remember ? 30 : 1; // 30 days if "remember me" is checked, otherwise 1 day
    cookieUtils.setCookie('ipet_auth_user', userId, { expires });
    cookieUtils.setCookie('ipet_auth_token', token, { expires });
  },
  
  // Get authentication data
  getAuth: () => {
    return {
      userId: cookieUtils.getCookie('ipet_auth_user'),
      token: cookieUtils.getCookie('ipet_auth_token')
    };
  },
  
  // Clear authentication data (logout)
  clearAuth: () => {
    cookieUtils.removeCookie('ipet_auth_user');
    cookieUtils.removeCookie('ipet_auth_token');
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return cookieUtils.hasCookie('ipet_auth_user') && cookieUtils.hasCookie('ipet_auth_token');
  }
};

// Usage example in a login component
export const enhanceLoginWithCookies = (originalLogin) => {
  return async (membershipNumber, password, remember = false) => {
    try {
      const response = await originalLogin(membershipNumber, password);
      
      if (response.success) {
        // Save to cookies and localStorage
        authCookies.saveAuth(response.userId, response.token, remember);
        localStorage.setItem("loggedInUser", membershipNumber);
        localStorage.setItem("userId", response.userId);
      }
      
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };
};

// Example of integrating with your Login component
export const modifyLoginComponent = (LoginComponent) => {
  return (props) => {
    // Check if already logged in via cookies on mount
    useEffect(() => {
      if (authCookies.isAuthenticated()) {
        const auth = authCookies.getAuth();
        const membershipNumber = localStorage.getItem("loggedInUser");
        
        if (auth.userId && membershipNumber) {
          // Auto-redirect to user page if already authenticated
          props.navigate(`/user/${auth.userId}`);
        }
      }
    }, []);
    
    // Wrap original login handler to include cookies
    const enhancedProps = {
      ...props,
      handleLogin: async (e) => {
        e.preventDefault();
        
        try {
          const response = await axios.post("http://localhost:5000/api/user/login", {
            membershipNumber: props.membershipNumber,
            password: props.password,
          });
          
          if (response.data.success) {
            // Save in cookies with "remember me" value
            authCookies.saveAuth(
              response.data.userId, 
              response.data.token || 'dummy-token', // Use actual token if available
              document.getElementById('remember')?.checked || false
            );
            
            // Regular localStorage as in your original code
            localStorage.setItem("loggedInUser", props.membershipNumber);
            localStorage.setItem("userId", response.data.userId);
            
            props.navigate(`/user/${response.data.userId}`);
          } else {
            props.setError("Invalid membership number or password");
          }
        } catch (error) {
          console.error("Login error:", error);
          props.setError("Failed to login. Please try again.");
        }
      }
    };
    
    return <LoginComponent {...enhancedProps} />;
  };
};