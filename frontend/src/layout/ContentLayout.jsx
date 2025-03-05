const ContentLayout = ({ children }) => {
  return (
    <section className="wide:pl-[230px] pl-[180px] pr-5 wide:pt-[80px] pt-5 pb-5 flex w-full min-h-screen ">
      <div className="flex-1 px-7 py-10 bg-white rounded-[10px]">
        {children}
      </div>
    </section>
  );
};

export default ContentLayout;
