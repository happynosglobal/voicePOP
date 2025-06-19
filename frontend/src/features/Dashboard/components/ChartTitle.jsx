import { useNavigate } from "react-router-dom";

const ChartTitle = ({ label, iconSrc, size, bgColor = "#ffffff", url }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (url) navigate(url);
  };

  return (
    <div
      className={`
        ${size === "lg" ? "" : "mb-2.5"}
        flex items-center gap-1.5        
      `}
    >
      <div
        className={`${
          size === "lg" ? "w-12 h-12 rounded-[20px]" : "w-8 h-8 rounded-xl"
        } flex items-center justify-center`}
        style={{ backgroundColor: bgColor }}
      >
        <img src={iconSrc} alt="아이콘" />
      </div>
      <h2
        className={`
          ${size === "lg" ? "text-xl" : "text-lg"} 
          font-semibold 
          ${url ? "cursor-pointer hover:underline" : ""}`}
        onClick={handleClick}
      >
        {label}
      </h2>
    </div>
  );
};

export default ChartTitle;
