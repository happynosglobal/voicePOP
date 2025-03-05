import { useEffect, useState } from "react";

const Input = ({ value, onChange, validation, errorMessage, ...rest }) => {
    const [validationError, setValidationError] = useState("");
    useEffect(() => {
        if (validation && value) {
            const { error } = validation.validate(value);
            setValidationError(error ? error.details[0].message : "");
        }
    }, [value, validation]);
    return (
        <>
            <input
                value={value}
                onChange={onChange}
                {...rest}
            />
            {(errorMessage || validationError) && <p className="mt-2 text-error text-sm">{errorMessage || validationError}</p>}
        </>

    );
};

export default Input;
