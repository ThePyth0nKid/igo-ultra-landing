import axios from "axios"

// 🔐 Helper to extract CSRF cookie
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : null
}

// 🌐 Axios instance with dynamic baseURL from .env
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
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
