type UploadProps = {
  files: FileList | null;
  setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
};

const UploadDropbox = ({ setFiles }: UploadProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    setFiles(selectedFiles);
  };

  return (
    // The main container acts as the dropbox
    <div
      className="
        relative                      /* To position the input file over the div */
        w-full max-w-sm h-40          /* Set a size (full width, max-w-sm, h-40 height) */
        flex flex-col justify-center items-center /* Center content */
        p-6                           /* Padding */

        border-2 border-dashed border-gray-400 /* Dashed Border! */
        rounded-lg                    /* Rounded corners */
        bg-gray-50                    /* Light background */
        cursor-pointer                /* Cursor to indicate clickability */
        transition-colors duration-200 /* Smooth hover effect */

        hover:bg-gray-100 hover:border-blue-500 /* Hover state changes */
      "
    >
      {/* The input is made invisible and stretched to cover the entire div.
        When the user clicks the div, they are actually clicking the input.
      */}
      <input
        onChange={handleFileChange}
        type="file"
        className="
          absolute inset-0           /* Position it over the div */
          w-full h-full               /* Make it cover the whole div */
          opacity-0                   /* Hide the default input look */
          cursor-pointer              /* Ensure the cursor stays a pointer */
        "
      />

      {/* Visual content for the drag-and-drop area */}
      <svg
        className="w-8 h-8 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 16a4 4 0 01-.88-7.903A5.002 5.002 0 0112 5a5.002 5.002 0 014.88 3.097A4 4 0 0117 16m-7-4l-4 4m0 0l4 4m-4-4h14"
        />
      </svg>
      <p className="mt-2 text-sm text-center text-gray-600">
        <span className="font-semibold text-blue-600">Click to upload</span> or
        drag and drop
      </p>
      <p className="text-xs text-gray-500">SVG, PNG, JPG, or GIF (Max 5MB)</p>
    </div>
  );
};

export default UploadDropbox;
