import { IoClose } from "react-icons/io5";

const AddUserModal = ({ modalRef }) => {
  return (
    <dialog id="my_modal_1" className="modal" ref={modalRef}>
      <div className="modal-box w-11/12 max-w-5xl relative">
        <h3 className="text-2xl font-bold text-center mb-4">
          사용자 수정/삭제
        </h3>

        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <th className="p-2 border border-gray-300 bg-gray-100">성명</th>
              <td className="p-2 border border-gray-300">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value="홍길동"
                />
              </td>
            </tr>
            <tr>
              <th className="p-2 border border-gray-300 bg-gray-100">ID</th>
              <td className="p-2 border border-gray-300">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value="12345"
                />
              </td>
            </tr>
            <tr>
              <th className="p-2 border border-gray-300 bg-gray-100">
                패스워드
              </th>
              <td className="p-2 border border-gray-300">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value="1234564"
                />
              </td>
            </tr>
            <tr>
              <th className="p-2 border border-gray-300 bg-gray-100">권한</th>
              <td className="p-2 border border-gray-300">
                <select className="select select-bordered w-full">
                  <option>점포관리자</option>
                  <option>일반 관리자</option>
                </select>
              </td>
            </tr>
            <tr>
              <th className="p-2 border border-gray-300 bg-gray-100">
                관리 브랜드
              </th>
              <td className="p-2 border border-gray-300">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-base">
                    <input
                      type="radio"
                      name="brand"
                      className="radio"
                      checked
                    />
                    이마트(EM)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-base">
                    <input type="radio" name="brand" className="radio" />
                    에브리데이(ED)
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th className="p-2 border border-gray-300 bg-gray-100">
                관리 점포
              </th>
              <td className="p-2 border border-gray-300">
                <select className="select select-bordered w-full">
                  <option selected>행당점</option>
                  <option>점포 B</option>
                  <option>점포 C</option>
                  <option>점포 D</option>
                  <option>점포 E</option>
                  <option>점포 F</option>
                </select>
              </td>
            </tr>
            <tr>
              <th className="p-2 border border-gray-300 bg-gray-100">이메일</th>
              <td className="p-2 border border-gray-300 text-blue-500 underline">
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value="abc@naver.com"
                />
              </td>
            </tr>
            <tr>
              <th className="p-2 border border-gray-300 bg-gray-100">상태</th>
              <td className="p-2 border border-gray-300">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-base">
                    <input type="radio" name="status" className="radio" />
                    미승인
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-base">
                    <input
                      type="radio"
                      name="status"
                      className="radio"
                      checked
                    />
                    승인
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between gap-2 mt-6">
          <button className="btn w-1/2">삭제</button>
          <button className="btn btn-primary w-1/2">수정</button>
        </div>

        <form method="dialog" className="absolute top-2 right-2">
          <button className="btn btn-circle">
            <IoClose size={24} />
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default AddUserModal;
