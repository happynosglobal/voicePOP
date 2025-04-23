import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';

const FileUploader = ({
  audioFile,
  setAudioFile,
}) => {
  const [uploadedFile, setUploadedFile] = useState(null); // dropzone STATE
  
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]); // 파일 1개만 저장
      setAudioFile(acceptedFiles[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null); // 파일 삭제 시 다시 업로드 UI 표시
    setAudioFile(null)
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop,
    accept: {
      "audio/*": [],
    }, // 오디오 파일만 허용
    maxSize: 5 * 1024 * 1024, // 5MB 제한
  });
  return (
    <div className="w-full overflow-hidden">
      {/* 파일이 없을 때만 업로드 UI 표시 */}
      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className="p-4 border-2 border-dashed rounded-[10px] cursor-pointer text-center transition hover:border-primary"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-primary text-sm">
              여기에 파일을 놓으세요.
            </p>
          ) : (
            <p className="text-gray-400 text-sm">
              최대 5MB 이하, 오디오 파일을 업로드 하세요
            </p>
          )}
          <button className="mt-2 btn btn-sm btn-accent">
            파일 가져오기
          </button>
        </div>
      ) : (
        // 파일이 업로드되면 업로드 UI 숨기고 파일 정보 표시

        <div className="flex items-center justify-between p-4 border rounded-[10px]">
          <span className="text-gray-700 truncate w-4/5">
            {uploadedFile.name} (
            {(uploadedFile.size / 1024 / 1024).toFixed(4)}MB)
          </span>
          <button onClick={removeFile} className="btn btn-error btn-xs">
            삭제
          </button>
        </div>
      )}
    </div>
  )
}

export default FileUploader