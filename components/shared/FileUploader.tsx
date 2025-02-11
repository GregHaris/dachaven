'use client';

import { useCallback, useState, useRef, Dispatch, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { Button } from '@ui/button';

type FileUploaderProps = {
  imageUrls: string[];
  onFieldChange: (...event: any[]) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export default function FileUploader({
  imageUrls,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const [files, setFilesState] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles];
      const totalSize = newFiles.reduce((acc, file) => acc + file.size, 0);

      if (newFiles.length > 6 || totalSize > 128 * 1024 * 1024) {
        alert('Maximum 6 files and total size of 128MB allowed.');
        return;
      }

      setFilesState(newFiles);
      setFiles(newFiles);
    },
    [files, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(['image/*']),
  });

  const handleAddMoreFiles = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} ref={fileInputRef} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Selected Files:</h3>
          <ul className="list-disc pl-5 mb-4">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      <Button onClick={handleAddMoreFiles} className="w-full mt-3">
        {files.length > 0 ? 'Add More Files' : 'Add Files'}
      </Button>
    </div>
  );
}
