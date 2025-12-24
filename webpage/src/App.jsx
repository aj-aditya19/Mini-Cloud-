import { Routes, Route } from "react-router-dom";
import Login from "./assets/pages/Login";
import Register from "./assets/pages/Register";
import MainLayout from "./assets/Layout/MainLayout";
import Error from "./assets/pages/Error";
import Other from "./assets/pages/Other";
import DocumentsPage from "./assets/pages/Documents";
import Upload from "./assets/pages/Upload";
import { useState } from "react";
export default function App() {
  const [user, setUser] = useState(null);
  return (
    <Routes>
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route path="/registerpage" element={<Register />} />
      <Route element={<MainLayout user={user} />}>
        <Route path="/toupload" element={<Upload />} />
        <Route path="/document" element={<DocumentsPage />} />
      </Route>
      <Route path="/other" element={<Other />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
