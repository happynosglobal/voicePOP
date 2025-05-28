import useCodes from "../../stores/codes";
import { useLoadingStore } from "../../stores/loading";

const LoadingSpinner = ({
  children,
  active = false,
  includeCodesLoading = false, // 점포 코드가 필요한지 여부
}) => {
  const isApiLoading = useLoadingStore((state) => state.isLoading); // 일반 api 통신 상태
  const isCodesLoading = useCodes((state) => state.isLoading); // 점포코드 로딩 상태

  const isLoading = includeCodesLoading
    ? isApiLoading || isCodesLoading
    : isApiLoading;

  return (
    <>
      {children}
      {isLoading && (
        <div
          className={`fixed ${
            active
              ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              : "top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(255,255,255,0.3)]"
          }`}
        >
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
