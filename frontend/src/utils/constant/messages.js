const commonSuccessMessage = "요청이 정상적으로 처리되었습니다.";
const commonErrorMessage = "요청 처리 중 문제가 발생했습니다.";

// 성공메시지
export const getSuccessMessage = (message) => {
  if (typeof message !== "string") {
    return commonErrorMessage;
  }

  return message.trim() !== "" ? message : commonSuccessMessage;
};
// 에러메시지
export const getErrorMessage = (message) => {
  if (typeof message !== "string") {
    return commonErrorMessage;
  }

  if (message.includes("Invalid request") || message.includes("Field validation")) {
    return "잘못된 요청입니다.";
  }

  return message.trim() !== "" ? message : commonErrorMessage;
};
