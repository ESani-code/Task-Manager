import { useState } from "react";

type Props = {
  value: string;
  onSave: (newValue: string) => void;
  textClassName?: string;
  inputClassName?: string;
  multiline?: boolean;
};

export const EditableField = ({
  value,
  onSave,
  textClassName = "",
  inputClassName = "",
  multiline = false,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleSave = () => {
    setIsEditing(false);
    if (currentValue.trim() !== value) {
      onSave(currentValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If it's a multiline textarea, let Enter create a new line.
    // Otherwise, Enter saves the input.
    if (e.key === "Enter" && !multiline) {
      handleSave();
    }
    if (e.key === "Escape") {
      setCurrentValue(value); // Revert to original
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return multiline ? (
      <textarea
        autoFocus
        className={`${inputClassName} bg-transparent border border-white/20 rounded outline-none text-white w-full resize-none overflow-hidden`}
        value={currentValue}
        onChange={(e) => {
          setCurrentValue(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        rows={Math.max(3, currentValue.split("\n").length)}
      />
    ) : (
      <input
        autoFocus
        className={`${inputClassName} bg-transparent border-b border-white/20 outline-none text-white w-full`}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
      />
    );
  }

  return (
    <div
      className={`${textClassName} cursor-pointer hover:bg-white/5 rounded px-1 -mx-1 transition-colors`}
      onClick={() => setIsEditing(true)}
    >
      {value}
    </div>
  );
};
