import React from 'react'

const Radio = ({ id, name, className, label, value, checked, onChange, ...rest }) => {
  return (
    <>
      <input
        id={id}
        type="radio"
        name={name}
        className={className}
        value={value}
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      {label}
    </>
  )
}

export default Radio