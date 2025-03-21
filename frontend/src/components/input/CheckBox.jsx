import React from 'react'

const CheckBox = ({ name, className, label, value, checked, onChange, ...rest }) => {
  return (
    <>
      {label}
      <input
        type="checkbox"
        name={name}
        className={className}
        checked={checked}
        onChange={onChange}
        {...rest}
      />
    </>
  )
}

export default CheckBox;