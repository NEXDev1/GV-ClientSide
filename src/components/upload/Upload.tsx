// import React, { useState, ChangeEvent } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:8000");

// const Upload: React.FC = () => {
//   const [progress, setProgress] = useState<number>(0);
//   const [fileName, setFileName] = useState<string>("");

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setFileName(file.name);
//     }
//   };

//   const handleUploadButtonClick = () => {
//     const fileInput = document.getElementById("file") as HTMLInputElement;
//     if (fileInput && fileInput.files) {
//       const file = fileInput.files[0];
//       if (file) {
//         const fileSize = file.size;
//         console.log(fileSize);

//         const reader = new FileReader();

//         reader.onload = () => {
//           const fileData = reader.result;
//           socket.emit("upload", {
//             fileName: file.name,
//             data: fileData,
//             size: fileSize,
//             progress: 0, // Initial progress
//           });

//           // Listen for progress updates
//           socket.on("progress", (progress: number) => {
//             setProgress(progress); // Update progress state
//           });
//         };

//         reader.readAsArrayBuffer(file);
//       }
//     }
//   };

//   // const handleUploadButtonClick = () => {
//   //   const fileInput = document.getElementById("file") as HTMLInputElement;
//   //   if (fileInput && fileInput.files) {
//   //     const file = fileInput.files[0];
//   //     if (file) {
//   //       const fileSize = file.size;
//   //       console.log(fileSize);

//   //       const reader = new FileReader();

//   //       reader.onload = () => {
//   //         const fileData = reader.result;
//   //         socket.emit("upload", {
//   //           fileName: file.name,
//   //           data: fileData,
//   //           size: fileSize,
//   //           progress: 100,
//   //           // Assuming progress is 100% since the entire file is being sent at once
//   //         });
//   //       };

//   //       reader.readAsArrayBuffer(file);
//   //     }
//   //   }
//   // };

//   return (
//     <div className="p-6 bg-gray-100 rounded-lg shadow-md">
//       <h1 className="text-3xl font-bold text-gray-800 mb-4">File upload</h1>
//       <div className="flex items-center justify-between">
//         <input
//           type="file"
//           id="file"
//           // accept=".gz"
//           className="hidden"
//           onChange={handleFileChange}
//         />
//         <label
//           htmlFor="file"
//           className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
//         >
//           Select File
//         </label>
//         <button
//           onClick={handleUploadButtonClick}
//           className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded cursor-pointer ml-4"
//         >
//           Upload
//         </button>
//         {fileName && <p className="ml-4">{fileName}</p>}
//         {progress > 0 && (
//           <div className="ml-4 w-1/2">
//             <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
//               <div
//                 className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
//                 style={{ width: `${progress}%` }}
//               >
//                 {progress.toFixed(2)}%
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Upload;

import React, { useState, ChangeEvent } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");
console.log(socket);
const CHUNK_SIZE = 1024 * 1024; // 1 MB
const Upload: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };
  // const handleUploadButtonClick = () => {
  //   const fileInput = document.getElementById("file") as HTMLInputElement;
  //   console.log("fileInput :", fileInput);

  //   if (fileInput && fileInput.files) {
  //     const file = fileInput.files[0];
  //     console.log("The file is :", file);

  //     if (file) {
  //       const fileSize = file.size;
  //       console.log("file size :", fileSize);
  //       let offset = 0;
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const fileData = reader.result as ArrayBuffer;
  //         let count =1

  //         while (offset < fileSize) {
  //           count++
  //           console.log("count :",count,offset);

  //           const chunk = fileData.slice(offset, offset + CHUNK_SIZE)

  //           socket.emit("uploadChunk", {
  //             fileName: file.name,
  //             data: chunk,
  //             size: fileSize,
  //             offset,
  //             progress: (offset / fileSize) * 100,
  //           });

  //           offset += CHUNK_SIZE;
  //         }
  //         // Reset progress after upload
  //         setProgress(0);
  //       };

  //       reader.readAsArrayBuffer(file);
  //     }
  //   }
  // };

  const handleUploadButtonClick = async () => {
    const fileInput = document.getElementById("file") as HTMLInputElement;
  
    if (fileInput && fileInput.files) {
      const file = fileInput.files[0];
  
      if (file) {
        const fileSize = file.size;
        let offset = 0;
        const reader = new FileReader();
  
        reader.onload = async () => {
          const fileData = reader.result as ArrayBuffer;
          let count = 1;
  
          while (offset < fileSize) {
            count++;
            console.log("count:", count, "offset:", offset);
  
            const chunk = fileData.slice(offset, offset + CHUNK_SIZE);
  
            // Wrap the socket.emit in a Promise to await the response

            await new Promise<void>((resolve) => {
              socket.emit("uploadChunk", {
                fileName: file.name,
                data: chunk,
                size: fileSize,
                offset,
                progress: (offset / fileSize) * 100,
              }, () => {
            
                // Resolve the Promise after the response is received
                resolve();
            
              });
            });
  
            offset += CHUNK_SIZE;
          }
  
          // Reset progress after upload
          setProgress(0);
        };
  
        reader.readAsArrayBuffer(file);
      }
    }
  };
  


  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">File upload</h1>
      <div className="flex items-center justify-between">
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
        >
          Select File
        </label>
        <button
          onClick={handleUploadButtonClick}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded cursor-pointer ml-4"
        >
          Upload
        </button>
        {fileName && <p className="ml-4">{fileName}</p>}
        {progress > 0 && (
          <div className="ml-4 w-1/2">
            <div className="w-full bg-gray-200 rounded-full">
              <div
                className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{ width: `${progress}%` }}
              >
                {progress.toFixed(2)}%
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
