import Select from "react-select";

const customStyles = {
  option: (provided) => ({
    ...provided,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
};

const Dropdown = ({
  name,
  options,
  className,
  value,
  onChange,
  isDisabled,
  isSearchable,
  isClearable,
  placeholder,
  ...rest
}) => {
  return (
    <Select
      name={name}
      options={options}
      className={className}
      value={value}
      onChange={onChange}
      isDisabled={isDisabled}
      styles={customStyles}
      getOptionLabel={(e) => e.label}
      noOptionsMessage={() => "옵션이 없습니다"}
      isSearchable={isSearchable}
      isClearable={isClearable}
      placeholder={placeholder}
      {...rest}
    />
  );
};
export default Dropdown;
