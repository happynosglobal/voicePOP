import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/user";
import { useEffect, useState } from "react";
import { userData } from "./dummy/data";

// 더미 브랜드 데이터
const dummyBrandData = [
  { id: "emart", name: "이마트(EM)" },
  { id: "everyday", name: "에브리데이(ED)" },
  { id: "noBrand", name: "노브랜드(NB)" },
  { id: "traders", name: "트레이더스(TR)" },
];

const SelectBrand = () => {
  const { logout, login, user, isAuthenticated } = useUserStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.dashboard_url);
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async () => {
    login(userData);
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
              className={`w-full py-4 rounded-lg text-lg font-medium transition border border-gray-250 ${
                selectedBrand === brand.name
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
          <button className="btn btn-primary flex-1" onClick={handleLogin}>
            선택완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectBrand;
