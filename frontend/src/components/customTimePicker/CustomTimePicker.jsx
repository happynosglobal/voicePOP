import React from 'react'
import TimePicker from 'react-time-picker'

const CustomTimePicker = ({
  className,
  name,
  value,
  onChange,
}) => {

  return (
    <TimePicker
      className="w-full input flex items-center justify-center"
      onChange={(time) => onChange(time, name)}
      value={value}
      minTime="09:00"
      maxTime="22:00"
      disableClock={true} // 시계 UI 비활성화 (선택만 가능)
      format="HH:mm" // 24시간 형식
      clearIcon={null}
    />
  )
}

export default CustomTimePicker;