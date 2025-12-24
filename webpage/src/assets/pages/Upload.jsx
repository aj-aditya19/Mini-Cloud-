import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../src/api";

const Upload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const res = await api.uploadFile(formData);
    const data = res.data;

    console.log(data);

    if (data.success) {
      navigate("/success");
    } else {
      navigate("/error");
    }
  };

  return (
    <div className="container">
      <h2>Upload File</h2>

      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
