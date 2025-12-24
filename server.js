import express from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fetch from "node-fetch";
import multer from "multer";
// import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= CLOUDINARY CONFIG =================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  if (
    email == process.env.TEMP_EMAIL &&
    password == process.env.TEMP_PASSWORD
  ) {
    console.log("Email: ", email, "Password: ", password);
    res.json({ success: true, message: "Login Success" });
  } else {
    res.json({ success: false, message: "Login  Failed" });
  }
});

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  res.json({ success: true, message: "Registration Done" });
});

const storage = multer.memoryStorage();
// const upload = multer({ storage });
const upload = multer({
  storage: multer.memoryStorage(),
});

// ================= CLOUD UPLOAD API =================
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file received",
      });
    }

    const fileStr = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(fileStr, {
      folder: "uploads",
      resource_type: "auto",
    });

    res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});
// ================= LIST DOCUMENTS API =================
app.get("/api/alldocuments", async (req, res) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload?max_results=100&prefix=uploads/`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${apiKey}:${apiSecret}`).toString("base64"),
      },
    });

    if (!response.ok) {
      const text = await response.text(); // get raw error
      console.error("Cloudinary error:", text);
      return res
        .status(response.status)
        .json({ error: "Cloudinary request failed" });
    }

    const data = await response.json();
    res.json({ success: true, documents: data.resources }); // wrap array into object
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
