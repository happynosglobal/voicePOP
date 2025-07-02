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
      formatOptionLabel={(e) => (
        <div
          title={e.label}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {e.label}
        </div>
      )}
      noOptionsMessage={() => "옵션이 없습니다"}
      placeholder={"..."}
      {...rest}
    />
  );
};
export default Dropdown;
