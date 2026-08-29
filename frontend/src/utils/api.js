/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/utils/api.js
 * Description: Centralized API helper utility with custom key support (vara_hobe_token).
 * ==============================================================================
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function fetchApi(endpoint, options = {}) {
  try {
    let token = "";

    if (typeof window !== "undefined") {
      // আপনার প্রজেক্টে সেভ করা সঠিক কি (Key) 'vara_hobe_token' প্রথমে চেক করা হচ্ছে
      token =
        localStorage.getItem("vara_hobe_token") ||
        localStorage.getItem("token") ||
        localStorage.getItem("authToken") ||
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("token");

      // যদি সরাসরি টোকেন না পাওয়া যায়, তবে 'vara_hobe_user' অবজেক্ট থেকে চেক করা
      if (!token) {
        const userStr =
          localStorage.getItem("vara_hobe_user") ||
          localStorage.getItem("user");
        if (userStr) {
          try {
            const userObj = JSON.parse(userStr);
            token = userObj.token || userObj.accessToken || "";
          } catch (e) {
            // JSON parse error ignore
          }
        }
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    return { success: false, message: error.message };
  }
}
