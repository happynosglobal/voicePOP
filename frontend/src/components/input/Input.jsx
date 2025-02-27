import Joi from "joi";
import { useEffect, useState } from "react";
import { passwordRegex } from "../../utils/validation";


const Input = ({
    value,
    onChange,
    validation,
    ...rest
}) => {
    const [error, setError] = useState('');

    const validatValue = (value) => {
        const { error } = passwordRegex.validate(value);
        return error ? error.details[0].message : null;
    };
    useEffect(() => {
        if(validation && value) {
            setError(validatValue(value))
        }
    },[value])
    return (
        <>
            <input
                value={value}
                onChange={onChange}
                {...rest}
            />
            {error && <p className="mt-2 text-error text-sm">{error}</p>}
        </>
    )
}

export default Input;