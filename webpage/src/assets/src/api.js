import axios from "axios";

export const api = {
  login: (data) =>
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  register: (data) =>
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),

  uploadFile: (formData) => axios.post("/api/upload", formData), // 🔥 YE IMPORTANT
  fetchDocuments: async () => {
    const res = await fetch("/api/alldocuments");
    if (!res.ok) throw new Error("Failed to fetch documents");
    const data = await res.json();
    return data; // data is an array of resources
  },
};
