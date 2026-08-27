/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/utils/api.js
 * Description: Centralized API helper utility for backend requests.
 * ==============================================================================
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchApi(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Fetch Error:', error);
    return { success: false, message: error.message };
  }
}