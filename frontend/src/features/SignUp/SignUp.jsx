import Joi from "joi";
import { useState } from "react";
import Input from "../../components/input/Input";

const SignUp = () => {
    const [formData, setFormData] = useState({
        user_name: '',
        user_id: '',
        password: '',
        company_id: '',
        brand_code: '',
        mart_code: '',
        email: ''
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };
    console.log(formData)
    return (
        <div className="flex items-center justify-center min-h-screen py-10 bg-gray-100">
            <div className="card w-full max-w-md bg-white shadow-xl p-6">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Voice PoP 사용자 등록 신청
                </h2>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">성명</span>
                    </label>
                    <input
                        type="text"
                        placeholder="성명을 입력하세요."
                        className="input input-bordered w-full"
                    />
                    {/* <!-- <p className="mt-2 text-error text-sm">필수 입력 사항입니다.</p> --> */}
                </div>

                <div className="form-control mt-4">
                    <label className="label flex justify-between">
                        <span className="label-text font-semibold">신청 ID</span>
                        <button className="btn btn-sm btn-black">ID 중복 확인</button>
                    </label>
                    <input
                        type="text"
                        placeholder="아이디를 입력하세요."
                        className="input input-bordered w-full"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                        * 사번 또는 영문 소문자와 숫자를 결합하여
                        <span className="text-primary font-semibold">6자~10자</span> 이내.
                    </p>
                </div>

                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text font-semibold">Password</span>
                    </label>
                    {/* <input
                        type="password"
                        placeholder="비밀번호 입력하세요."
                        className="input input-bordered w-full"
                        value={password}
                        onChange={handleChange}
                    />
                    {error && <p className="mt-2 text-error text-sm">{error}</p>} */}
                    <Input
                        type="password"
                        name="password"
                        placeholder="비밀번호 입력하세요."
                        className="input input-bordered w-full"
                        value={formData.password}
                        onChange={handleInput}
                        validation={true}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                        * 영문 대/소문자와 특수문자, 숫자를 결합하여
                        <span className="text-primary font-semibold">6자~10자</span> 이내.
                    </p>
                </div>

                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text font-semibold">Password 확인</span>
                    </label>
                    <input
                        type="password"
                        placeholder="비밀번호를 다시한번 입력해주세요."
                        className="input input-bordered w-full"
                    />
                    <p className="mt-2 text-error text-sm">
                        입력한 비밀번호가 일치하지 않습니다.
                    </p>
                </div>

                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text font-semibold">요청 권한</span>
                    </label>
                    <select className="select select-bordered w-full">
                        <option selected>권한 선택</option>
                        <option>브랜드 관리자</option>
                        <option>점포 관리자</option>
                        <option>광고 관리자</option>
                    </select>
                </div>

                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text font-semibold">관리 브랜드</span>
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer text-base">
                            <input type="radio" name="brand" className="radio" checked /> 이마트(EM)
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-base">
                            <input type="radio" name="brand" className="radio" /> 에브리데이(ED)
                        </label>
                    </div>
                </div>

                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text font-semibold">관리 점포</span>
                    </label>
                    <select className="select select-bordered w-full">
                        <option selected>점포 선택</option>
                        <option>점포 A</option>
                        <option>점포 B</option>
                        <option>점포 C</option>
                        <option>점포 D</option>
                        <option>점포 E</option>
                        <option>점포 F</option>
                    </select>
                </div>

                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text font-semibold">이메일</span>
                    </label>
                    <input
                        type="email"
                        placeholder="이메일 입력"
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="form-control mt-6">
                    <button className="btn btn-primary w-full">등록 신청</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;