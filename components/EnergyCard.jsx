import React from "react";

export const EnergyCard = ({
  title,
  icon,
  value,
  description
}) => {
  return (
    <div className="bg-super-light-grey shadow-2 roundedMore py1 px2 flex flex-column" style={{ width: '100%' }}>
      <div className="flex items-center">
        <span className="h5 darkgray bold mr1">{title}</span>
        {icon}
      </div>

      <span className="h3 darkgray">{value}</span>

      <span className="h5 darkgray">{description}</span>
    </div>
  )
}