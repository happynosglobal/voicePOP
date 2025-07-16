import React, { useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({
  audioFile,
  setAudioFile,
  setDuration,
  audioPreviewUrl,
  setAudioPreviewUrl,
}) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const tempPreviewUrlRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      setAudioFile(file);

      if (tempPreviewUrlRef.current) {
        URL.revokeObjectURL(tempPreviewUrlRef.current);
      }

      const blobUrl = URL.createObjectURL(file);
      tempPreviewUrlRef.current = blobUrl;
      setAudioPreviewUrl(blobUrl);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setAudioFile(null);
    setAudioPreviewUrl(null);
    if (tempPreviewUrlRef.current) {
      URL.revokeObjectURL(tempPreviewUrlRef.current);
      tempPreviewUrlRef.current = null;
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop,
    accept: { "audio/*": [] },
    maxSize: 5 * 1024 * 1024,
  });

  useEffect(() => {
    if (audioFile) {
      setUploadedFile(audioFile);
    } else {
      setUploadedFile(null);
      setAudioPreviewUrl(null);
    }
  }, [audioFile]);

  useEffect(() => {
    return () => {
      if (tempPreviewUrlRef.current) {
        URL.revokeObjectURL(tempPreviewUrlRef.current);
      }
    };
  }, []);

  const getAudioDuration = (file) => {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const audio = new Audio(url);
      audio.addEventListener("loadedmetadata", () => {
        resolve(audio.duration);
        URL.revokeObjectURL(url);
      });
      audio.addEventListener("error", reject);
    });
  };

  useEffect(() => {
    if (audioFile) {
      if (audioFile.size > 0 && audioPreviewUrl?.startsWith("blob:")) {
        getAudioDuration(audioFile)
          .then((seconds) => {
            setDuration(seconds.toFixed(1));
          })
          .catch((err) => {
            console.error("오디오 재생시간 추출 실패", err);
          });
      }
    }
  }, [audioFile, audioPreviewUrl]);

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
          {audioPreviewUrl && (
            <audio controls className="w-full mt-2">
              <source
                src={audioPreviewUrl}
                type={uploadedFile.type || "audio/mpeg"}
              />
              브라우저가 audio 태그를 지원하지 않습니다.
            </audio>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
