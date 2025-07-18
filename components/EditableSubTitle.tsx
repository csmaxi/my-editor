import React from "react";

interface EditableSubTitleProps {
  content: string;
  onChange: (newContent: string) => void;
  disabled?: boolean;
}

export default function EditableSubTitle({
  content,
  onChange,
  disabled = false,
}: EditableSubTitleProps) {
  return (
    <h2
      contentEditable={!disabled}
      onBlur={(e) => !disabled && onChange(e.target.innerText)}
      suppressContentEditableWarning={true}
      className={`outline-none text-2xl sm:text-3xl font-semibold mb-4 transition-all duration-200 ${
        disabled 
          ? 'text-slate-800' 
          : 'text-slate-800 hover:bg-slate-50 focus:bg-blue-50 focus:ring-2 focus:ring-blue-200 rounded-lg px-3 py-2 -mx-3 -my-2'
      } ${content ? '' : 'text-slate-400'}`}
    >
      {content || (disabled ? '' : 'Haz clic para agregar un subtítulo')}
    </h2>
  );
}