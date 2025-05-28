import { useEffect, useState } from "react";

const Input = ({ name, value, onChange, validation, errorMessage, handleError, ...rest }) => {
  useEffect(() => {
    if (validation && value) {
      const { error } = validation.validate(value);
      const errorMsg = error ? error.details[0].message : "";

      if (handleError) {
        handleError(name, errorMsg);
      }
    }
  }, [value, validation, name]);
  return (
    <>
      <input
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {(errorMessage) && <p className="mt-2 text-error text-sm">{errorMessage}</p>}
    </>

  );
};

export default Input;
