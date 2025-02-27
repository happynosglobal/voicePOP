import Joi from "joi";

// 영문 대/소문자와 특수문자, 숫자를 결합하여6자~10자 이내
export const passwordRegex = Joi.string()
    .min(6)
    .max(10)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/)
    .required()
    .messages({
        "string.empty": "비밀번호를 입력해주세요.",
        "string.min": "비밀번호는 최소 6자 이상이어야 합니다.",
        "string.max": "비밀번호는 최대 10자까지 가능합니다.",
        "string.pattern.base": "비밀번호는 영문 대/소문자, 숫자, 특수문자를 포함해야 합니다."
    });