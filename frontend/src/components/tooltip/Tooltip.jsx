import { Tooltip as ReactTooltip } from "react-tooltip";

const CustomTooltip = ({ id, content }) => {
  return (
    <>
      <a
        data-tooltip-id={`tooltip-${id}`}
        data-tooltip-content={content}
        className="block w-full truncate"
      >
        {content}
      </a>
      <ReactTooltip
        id={`tooltip-${id}`}
        place="right"
        positionStrategy="fixed"
        className="custom-tooltip"
      />
    </>
  );
};

export default CustomTooltip;
