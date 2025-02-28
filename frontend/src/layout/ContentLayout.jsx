const ContentLayout = ({ children }) => {
  return (
    <section className="pl-[230px] pr-5 pt-[80px] pb-5 flex w-full min-h-screen ">
      <div className="flex-1 px-7 py-10 bg-white rounded-[10px]">
        {children}
      </div>
    </section>
  );
};

export default ContentLayout;
