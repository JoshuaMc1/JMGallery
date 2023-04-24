import { useState } from "react";

const Switch = ({
  title = "default title",
  id = "default",
  name = "default",
  value = 0,
}) => {
  const [isChecked, setIsChecked] = useState(value === 1);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="relative inline-flex items-center mb-4 cursor-pointer">
      <input type="hidden" name={name} value={isChecked ? 1 : 0} />
      <input
        type="checkbox"
        checked={isChecked}
        className="sr-only peer"
        id={id}
        onChange={handleToggle}
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {title}
      </span>
    </label>
  );
};

export default Switch;
