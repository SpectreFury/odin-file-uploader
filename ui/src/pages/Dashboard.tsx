// src/pages/Dashboard.jsx

import { useState } from "react";
import UploadDropbox from "../components/UploadDropbox";

const Dashboard = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleUploadClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const formData = new FormData();

      formData.append("file", files![0]);

      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

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

      <UploadDropbox files={files} setFiles={setFiles} />

      {/* --- File List & Upload Button --- */}
      {totalCount > 0 && (
        <div className="w-full max-w-sm mt-8 p-4 bg-white shadow-lg rounded-lg border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-700 border-b pb-2 mb-3">
            Selected Files ({totalCount})
          </h2>

          {/* List of Files */}
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
            onClick={handleUploadClick}
            className="w-full mt-4 py-2 text-white font-medium bg-blue-600 rounded-md transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Upload Now
          </button>
        </div>
      )}
      {/* --- End File List & Upload Button --- */}
    </div>
  );
};

export default Dashboard;
