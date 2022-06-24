import React, { FC } from "react";
import { v4 as uuidv4 } from "uuid";

const CheckBox: FC<{
  className?: string;
  label: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}> = ({ className, label, checked = false, onChange }) => {
  const id = uuidv4();
  return (
    <div className={` ${className ? className : ""}`}>
      <label className="mr-2" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-3 h-3 rounded-sm appearance-none ring-offset-2 ring-light checked:bg-primary ring-1"
        type="checkbox"
        value={label}
        checked={checked}
        onChange={(v) => onChange(v.target.checked)}
        id={id}
      />
    </div>
  );
};

export default CheckBox;
