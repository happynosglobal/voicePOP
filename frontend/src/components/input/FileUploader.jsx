import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({ audioFile, setAudioFile }) => {
  const [uploadedFile, setUploadedFile] = useState(null); // Dropzone 상태
  const [audioPreviewUrl, setAudioPreviewUrl] = useState(null); // 미리 듣기 URL

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      setAudioFile(file);
      setAudioPreviewUrl(URL.createObjectURL(file)); // Blob URL 생성
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setAudioFile(null);
    setAudioPreviewUrl(null);
  };

  // Dropzone 훅
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop,
    accept: {
      "audio/*": [],
    },
    maxSize: 5 * 1024 * 1024, // 5MB 제한
  });

  // 컴포넌트 언마운트 시 URL 해제
  useEffect(() => {
    return () => {
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
      }
    };
  }, [audioPreviewUrl]);

  return (
    <div className="w-full overflow-hidden">
      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className="p-4 border-2 border-dashed rounded-[10px] cursor-pointer text-center transition hover:border-primary"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-primary text-sm">여기에 파일을 놓으세요.</p>
          ) : (
            <p className="text-gray-400 text-sm">
              최대 5MB 이하, 오디오 파일을 업로드 하세요
            </p>
          )}
          <button className="mt-2 btn btn-sm btn-accent">파일 가져오기</button>
        </div>
      ) : (
        <div className="p-4 border rounded-[10px] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 truncate w-4/5">
              {uploadedFile.name} (
              {(uploadedFile.size / 1024 / 1024).toFixed(2)}MB)
            </span>
            <button onClick={removeFile} className="btn btn-error btn-xs">
              삭제
            </button>
          </div>
          {/* 오디오 플레이어 추가 */}
          {audioPreviewUrl && (
            <audio controls className="w-full mt-2">
              <source src={audioPreviewUrl} type={uploadedFile.type} />
              브라우저가 audio 태그를 지원하지 않습니다.
            </audio>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
