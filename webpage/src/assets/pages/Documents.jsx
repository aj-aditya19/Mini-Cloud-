import React, { useEffect, useState } from "react";
import { api } from "../src/api"; // your backend API
import "../styles/Document.css";
const DocumentsPage = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const data = await api.fetchDocuments(); // already JSON
      if (data.success) {
        // Add hit counter if it doesn't exist
        const docsWithHits = data.documents.map((doc) => ({
          ...doc,
          hits: doc.hits || 0,
        }));
        setDocs(docsWithHits);
      } else {
        console.error("Failed to fetch documents:", data);
      }
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  };

  const handleDownload = (url, index) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    link.click();

    // Increase hits when downloaded
    setDocs((prevDocs) => {
      const newDocs = [...prevDocs];
      newDocs[index].hits += 1;
      return newDocs;
    });
  };

  const handlePreview = (url, index) => {
    window.open(url, "_blank");

    // Increase hits when previewed
    setDocs((prevDocs) => {
      const newDocs = [...prevDocs];
      newDocs[index].hits += 1;
      return newDocs;
    });
  };

  return (
    <div className="container">
      <h2>Documents Library</h2>
      {docs.length === 0 ? (
        <p>No documents available</p>
      ) : (
        <div
          className="docs-grid"
          style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
        >
          {docs.map((doc, i) => (
            <div
              key={i}
              className="doc-card"
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                width: "180px",
                textAlign: "center",
              }}
            >
              {doc.resource_type === "image" ? (
                <img
                  src={doc.url}
                  alt={`doc-${i}`}
                  width={150}
                  style={{ borderRadius: "4px" }}
                />
              ) : (
                <div
                  className="file-placeholder"
                  style={{
                    height: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#f0f0f0",
                    borderRadius: "4px",
                    fontWeight: "bold",
                  }}
                >
                  {doc.format.toUpperCase()}
                </div>
              )}
              <div className="doc-actions" style={{ marginTop: "8px" }}>
                <button
                  onClick={() => handlePreview(doc.url, i)}
                  style={{ marginRight: "5px" }}
                >
                  Preview
                </button>
                <button onClick={() => handleDownload(doc.url, i)}>
                  Download
                </button>
              </div>
              <div
                className="hits"
                style={{ marginTop: "5px", fontSize: "14px" }}
              >
                Hits: {doc.hits}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;
