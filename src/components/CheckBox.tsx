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
    <div className={`${className ? className : ""}`}>
      <label className="mr-2 cursor-pointer" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-3 h-3 rounded-sm appearance-none cursor-pointer ring-offset-2 ring-primary checked:bg-primary ring-1 dark:checked:bg-white dark:ring-white ring-offset-white dark:ring-offset-primary"
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
