// src/pages/Dashboard.jsx

import { useState, useEffect } from "react";
import UploadDropbox from "../components/UploadDropbox";
import { useNavigate } from "react-router-dom";

// Define the shape of a file object from the API
interface FileData {
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
  url: string;
  userId: string;
}

const Dashboard = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [userFiles, setUserFiles] = useState<FileData[]>([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleUploadClick = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const formData = new FormData();

      // Only uploading the first file selected
      formData.append("file", files![0]);

      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      if (data.success) {
        console.log("Upload successful");
        // After a successful upload, fetch the updated list of files
        fetchFiles();
        setFiles(null);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  // Helper function to fetch files, so it can be called in useEffect and after upload
  const fetchFiles = async () => {
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3000/upload/files", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Fetch failed");
      }

      const data = await response.json();

      if (data.success) {
        setUserFiles(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle file download by forcing a download using Blob and a temporary link
  const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      // 1. Fetch the file content
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      // 2. Convert the response to a Blob
      const blob = await response.blob();

      // 3. Create a temporary URL
      const blobUrl = window.URL.createObjectURL(blob);

      // 4. Create a temporary anchor element
      const link = document.createElement("a");
      link.href = blobUrl;

      // 5. Use the 'download' attribute to force download
      link.setAttribute("download", fileName);

      // 6. Click it and clean up
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error during download:", error);
      alert("Could not start download. Check console for details.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    
    fetchFiles();
  }, [token]);

  const fileArray = files ? Array.from(files) : [];
  const totalSize = fileArray.reduce((sum, file) => sum + file.size, 0);
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
  const totalCount = fileArray.length;

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-medium text-slate-700">Upload Files</h1>
        <div className="text-sm font-normal text-slate-500">
          Your files will be saved securely in your cloud storage
        </div>
      </div>

      {/* --- RESTORED: Upload Dropbox Component --- */}
      <UploadDropbox files={files} setFiles={setFiles} />

      {/* --- RESTORED: File List & Upload Button (for local selection) --- */}
      {totalCount > 0 && (
        <div className="w-full max-w-sm mt-8 p-4 bg-white shadow-lg rounded-lg border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-700 border-b pb-2 mb-3">
            Selected Files ({totalCount})
          </h2>

          {/* List of Files to Upload */}
          <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {fileArray.map((file, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <span className="truncate text-slate-600">{file.name}</span>
                <span className="text-xs text-slate-400 ml-2 flex-shrink-0">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </li>
            ))}
          </ul>

          {/* Total Summary */}
          <div className="mt-3 pt-3 border-t flex justify-between text-sm font-medium text-slate-600">
            <span>Total:</span>
            <span>{totalSizeMB} MB</span>
          </div>

          {/* Upload Button */}
          <button
            disabled={loading}
            onClick={handleUploadClick}
            className="disabled:bg-gray-500 w-full mt-4 py-2 text-white font-medium bg-blue-600 rounded-md transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? "Uploading" : "Upload Now"}
          </button>
        </div>
      )}
      {/* --- End File List & Upload Button --- */}

      <hr className="w-full max-w-sm my-8 border-slate-300" />

      {/* --- User's Uploaded Files List (The new section) --- */}
      {userFiles.length > 0 && (
        <div className="w-full max-w-sm p-4 bg-white shadow-lg rounded-lg border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-700 border-b pb-2 mb-3">
            Your Uploaded Files ({userFiles.length})
          </h2>

          {/* List of Uploaded Files */}
          <ul className="space-y-3 max-h-64 overflow-y-auto">
            {userFiles.map((file) => (
              <li
                key={file.id}
                className="flex justify-between items-center text-sm border-b pb-1"
              >
                <div className="flex flex-col flex-grow truncate">
                  <span className="truncate text-slate-700 font-medium">
                    {file.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    Uploaded: {new Date(file.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {/* Download Button */}
                <button
                  onClick={() => handleDownload(file.url, file.name)}
                  className="ml-4 px-3 py-1 text-xs text-white font-medium bg-green-500 rounded-md transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 flex-shrink-0"
                >
                  Download
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* --- End User's Uploaded Files List --- */}
    </div>
  );
};

export default Dashboard;
