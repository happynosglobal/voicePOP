import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import Input from "../../components/input/Input";
import { levelOptions } from "../../utils/constant/options";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import useUserStore from "../../stores/user";
import PwChangeModal from "../../components/modal/PwChangeModal";
import { changePassword, patchUser } from "../../api/user/user";
import { toast } from "react-toastify";
import useCodes from "../../stores/codes";
import { getErrorMessage } from "../../utils/constant/messages";
import Dropdown from "../../components/dropdown/Dropdown";

const MyInfo = ({ modalRef, closeModal, isOpen, setIsOpen }) => {
  const { user, modifyUser } = useUserStore();
  const { storeByBrandCode, isLoading } = useCodes();
  const { brandOptions } = useCodes();

  const initialFormData = {
    user_id: user.user_id || "",
    user_name: user.user_name || "",
    company_id: user.company_id || "",
    level: user.level || "",
    brand_code: user.brandPermissions || [],
    password: "",
    store_code: user.store_code || null,
    email: user.email || "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const pwChangeModalRef = useRef(null);

  const handlePatchUserInfo = async () => {
    const body = {
      email: formData.email,
    };

    try {
      const response = await patchUser(user.id, body);
      const { status_code, data } = response.data;
      if (status_code === 200) {
        modifyUser(data.email);
        toast.success("사용자 수정에 성공했습니다.");
      }
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
    }
  };

  const handleSubmitChangePw = async (pw1, pw2) => {
    const body = {
      password1: pw1,
      password2: pw2,
    };
    try {
      const response = await changePassword(body);
      const { status, data } = response;
      if (status === 200) {
        toast.success(data.message);
        pwChangeModalRef.current.close();
      }
    } catch (err) {
      const errMsg = getErrorMessage(err?.response?.data?.message);
      toast.error(errMsg);
      console.error(err);
    }
  };

  /* 모달 여닫기 감지 */
  useEffect(() => {
    const modal = modalRef?.current;
    if (!modal) return;

    if (isOpen) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [isOpen, modalRef]);

  /* 모달창 닫을 때 수행 할 로직 */
  useEffect(() => {
    const modal = modalRef?.current;
    if (!modal) return;

    const handleClose = () => {
      // setFormData(initialFormData);
      setIsOpen(false);
    };

    modal.addEventListener("close", handleClose);

    return () => {
      modal.removeEventListener("close", handleClose);
    };
  }, [modalRef]);

  return (
    <>
      <dialog id="my_modal_1" className="modal" ref={modalRef}>
        <div className="modal-box bg-white max-w-xl">
          <h3 className="mb-6 pb-6 font-semibold text-lg border-b">My Info</h3>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <label className="font-semibold w-1/4 shrink-0">성명</label>
              <Input
                type="text"
                name="user_name"
                placeholder="성명을 입력하세요."
                className="input w-full"
                value={formData.user_name}
                onChange={() => {}}
                disabled
              />
            </div>
            <div className="flex justify-between">
              <label className="py-2 font-semibold w-1/4 shrink-0">
                아이디
              </label>
              <div className="w-full mr-3">
                <Input
                  type="text"
                  name="user_id"
                  placeholder="아이디를 입력하세요."
                  className="input w-full"
                  value={formData.user_id}
                  onChange={() => {}}
                  disabled
                />
              </div>
            </div>
            <div className="flex justify-between">
              <label className="py-2 font-semibold w-1/4 shrink-0">
                패스워드
              </label>
              <div className="w-full">
                <Input
                  type="password"
                  name="password"
                  placeholder="*****"
                  className="input w-full"
                  value={formData.password}
                  onChange={() => {}}
                  disabled
                />
              </div>
              <button
                type="button"
                className="btn btn-sm btn-accent ml-3"
                onClick={() => {
                  pwChangeModalRef.current.showModal();
                }}
              >
                비밀번호 변경
              </button>
            </div>

            <div className="flex justify-between">
              <label className="py-2 font-semibold w-1/4 shrink-0">
                회사명
              </label>
              <div className="w-full">
                <Input
                  type="text"
                  name="company_id"
                  placeholder="회사명을 입력해주세요."
                  className="input w-full"
                  value={formData.company_id}
                  onChange={() => {}}
                  disabled
                />
              </div>
            </div>
            <div className="flex justify-between">
              <label className="py-2 font-semibold w-1/4 shrink-0">권한</label>
              <Dropdown
                name="level"
                options={levelOptions}
                className="w-full"
                value={levelOptions.filter(
                  (option) => option.value === formData.level
                )}
                placeholder="권한을 선택하세요"
                isDisabled={true}
              />
            </div>
            <div className="flex justify-between">
              <label className="py-2 font-semibold w-1/4 shrink-0">
                관리브랜드
              </label>
              {formData.level !== "STORE" ? (
                <Dropdown
                  isMulti
                  name="brand_code"
                  options={brandOptions}
                  value={brandOptions.filter((option) =>
                    formData.brand_code?.includes(option.value)
                  )}
                  className="w-full"
                  classNamePrefix="select"
                  placeholder="브랜드를 선택하세요"
                  isDisabled={true}
                />
              ) : (
                <Dropdown
                  name="brand_code"
                  options={brandOptions}
                  value={brandOptions.filter(
                    (option) => option.value === formData.brand_code[0]
                  )}
                  className="w-full"
                  classNamePrefix="select"
                  placeholder="브랜드를 선택하세요"
                  isDisabled={true}
                />
              )}
            </div>

            <div className="flex justify-between">
              <label className="py-2 font-semibold w-1/4 shrink-0">
                관리점포
              </label>
              <Dropdown
                name="store_code"
                options={storeByBrandCode}
                value={storeByBrandCode.filter(
                  (option) => option.value === formData.store_code
                )}
                className="w-full"
                placeholder="관리점포를 선택하세요"
                isDisabled={true}
              />
            </div>
            <div className="flex justify-between">
              <label className="py-2 font-semibold w-1/4 shrink-0">
                이메일
              </label>
              <div className="w-full">
                <Input
                  type="email"
                  name="email"
                  placeholder="이메일을 입력하세요."
                  className="input w-full"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-2.5 mt-12">
            <button
              className="absolute right-3 top-4 w-10 h-10 text-2xl"
              onClick={closeModal}
            >
              ✕
            </button>
            <button className="btn min-w-24" onClick={closeModal}>
              취소
            </button>
            <button
              className="btn btn-primary min-w-24"
              onClick={handlePatchUserInfo}
            >
              수정
            </button>
          </div>
        </div>
        <LoadingSpinner includeCodesLoading={true} />
      </dialog>
      <PwChangeModal
        modalRef={pwChangeModalRef}
        handleSubmitChangePw={handleSubmitChangePw}
        hasResetButton={false}
      />
    </>
  );
};

export default MyInfo;
