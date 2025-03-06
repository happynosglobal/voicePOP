import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/user";
import { useEffect, useState } from "react";
import { userData } from "./dummy/data";

// 더미 브랜드 데이터
const dummyBrandData = [
  { id: "EM", name: "이마트(EM)" },
  { id: "ED", name: "에브리데이(ED)" },
  { id: "NB", name: "노브랜드(NB)" },
  { id: "TR", name: "트레이더스(TR)" },
];

const SelectBrand = () => {
  const { logout, login, selectBrand, user, isAuthenticated } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null);

  /* 로그인 된 상태일 경우 기본url로 라우팅*/
  useEffect(() => {
    if (isAuthenticated) {
      navigate(user.dashboard_url);
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const handleSelection = async () => {
    if (selectedBrand) {
      selectBrand(selectedBrand);
      navigate(user.dashboard_url)
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-96 bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">브랜드 선택</h2>

        {/* 브랜드 선택 버튼 (동적 생성) */}
        <div className="flex flex-col gap-3">
          {dummyBrandData.map((brand) => (
            <button
              key={brand.id}
              onClick={() => setSelectedBrand(brand.name)}
              className={`w-full py-4 rounded-lg text-lg font-medium transition border border-gray-250 ${selectedBrand === brand.name
                  ? "bg-[#FFCF02] border-[#FFCF02]"
                  : "text-gray-800 hover:bg-gray-100"
                }`}
            >
              {brand.name}
            </button>
          ))}
        </div>

        {/* 버튼 영역 */}
        <div className="flex mt-6 gap-2">
          <button className="btn btn flex-1" onClick={handleLogout}>
            로그아웃
          </button>
          <button className="btn btn-primary flex-1" onClick={handleSelection} disabled={!selectedBrand}>
            선택완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectBrand;
