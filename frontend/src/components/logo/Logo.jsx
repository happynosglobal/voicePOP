import logo from "../../assets/logo.svg";

const Logo = () => {
  return (
    <span className="flex items-center gap-2 font-poppins font-semibold">
      <img src={logo} alt="logo" className="w-10 h-10" /> Voice POP
    </span>
  );
};

export default Logo;
