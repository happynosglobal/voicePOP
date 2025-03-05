import { Tooltip as ReactTooltip } from "react-tooltip";

const CustomTooltip = ({ id, content, place = "right" }) => {
  // content가 배열이면 쉼표(,)로 구분된 문자열로 변환
  const tooltipContent = Array.isArray(content) ? content.join(", ") : content;

  return (
    <>
      {/* 툴팁을 표시할 대상 */}
      <a
        data-tooltip-id={`tooltip-${id}`}
        data-tooltip-content={tooltipContent} // 변환된 문자열 전달
        className="block w-full truncate"
      >
        {tooltipContent}
      </a>

      {/* ReactTooltip 컴포넌트 */}
      <ReactTooltip
        id={`tooltip-${id}`}
        place={place}
        positionStrategy="fixed"
        className="custom-tooltip"
        clickable={true}
      />
    </>
  );
};

export default CustomTooltip;
