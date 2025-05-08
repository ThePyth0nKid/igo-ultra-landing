// src/lib/axios.ts
import axios from "axios"

// 🔐 Helper: Read CSRF cookie
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : null
}

// 🌐 Backend Base Setup
const API = axios.create({
  baseURL: "https://igoultra-backend-v2-7307073ce46e.herokuapp.com",
  withCredentials: true,
})

API.interceptors.request.use(
  (config) => {
    const csrfToken = getCookie("csrftoken")
    if (csrfToken && config.method !== "get") {
      config.headers["X-CSRFToken"] = csrfToken
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default API
