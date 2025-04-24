import { useState } from "react";
import Logo from "../../components/logo/Logo";

const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card max-w-md bg-white shadow-xl px-6 py-10 w-full">
        <h2 className="flex justify-center items-center text-3xl font-bold mb-6">
          <Logo />
        </h2>

        <div className="text-center border mb-4 bg-gray-50 p-4 break-all text-sm rounded-md text-gray-500 leading-6">
          비밀번호를 잊으셨나요?
          <br />
          입력하신 <b>이메일 주소</b>로 임시 비밀번호를 발송해드립니다.
          <br />
          이메일을 확인하신 후, 로그인해 주세요.
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
            />
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button className="btn btn-neutral flex-1">취소</button>
          <button
            className="btn btn-primary flex-1"
            onClick={() => alert("임시 비밀번호 발송!")}
          >
            임시 비밀번호 발송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
