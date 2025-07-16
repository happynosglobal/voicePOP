import { useNavigate } from "react-router-dom";
import icoAlert from "../../assets/ico_alert.svg";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-white">
      <div>
        <img src={icoAlert} alt="" />
      </div>
      <p className="text-4xl font-semibold leading-10">
        페이지를 찾을 수 없습니다.
      </p>
      <p className="m-10 mb-16 leading-snug text-lg text-[#949494]">
        요청하신 페이지가 존재하지 않거나,
        <br /> 주소가 잘못되었을 수 있습니다.
      </p>
      <button className="btn btn-accent btn-lg" onClick={() => navigate("/")}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default NotFoundPage;
