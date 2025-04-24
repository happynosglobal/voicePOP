import { useState } from "react";
import Logo from "../../components/logo/Logo";

const ChangePassword = () => {
  const [step, setStep] = useState(1); //임시 스테이트
  const [userId, setUserId] = useState(""); //임시 스테이트

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card max-w-md bg-white shadow-xl px-6 py-10 w-full">
        <h2 className="flex justify-center items-center text-3xl font-bold mb-6">
          <Logo />
        </h2>

        <div className="text-center border mb-2 bg-gray-50 p-4 break-all text-sm rounded-md text-gray-500 leading-6">
          비밀번호 변경 후 사용 가능합니다.
          <br />
          Voice POP 계정의 <b>새 비밀번호를 설정</b>해 주세요.
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">User ID</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="아이디를 입력해주세요."
              className="input input-bordered w-full"
              value="heysunny612"
              disabled
            />
          </div>
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">성명</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="아이디를 입력해주세요."
              className="input input-bordered w-full"
              value="황수연"
              disabled
            />
          </div>
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">이메일</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="아이디를 입력해주세요."
              className="input input-bordered w-full"
              value="heysunny612@naver.com"
              disabled
            />
          </div>
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">새 비밀번호</span>
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="새로운 비밀번호를 입력해주세요."
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">새 비밀번호 확인</span>
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="새로운 비밀번호를 확인해주세요."
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button className="btn btn-neutral flex-1">취소</button>
          <button className="btn btn-primary flex-1">비밀번호 변경</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
