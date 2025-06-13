import { useLocation } from "react-router-dom";
import Title from "../components/title/Title";

const ContentLayout = ({ children }) => {
  const { state } = useLocation();
  const title = state?.title;

  return (
    <section className="wide:pl-[230px] pl-[180px] pr-5 wide:pt-[80px] pt-5 pb-5 flex w-full min-h-screen">
      <div className="flex-1 px-7 py-7 bg-white rounded-[10px] relative overflow-hidden">
        {title && title !== "대시보드" && <Title text={title} />}
        {children}
      </div>
    </section>
  );
};

export default ContentLayout;
