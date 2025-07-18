import React from "react";

interface EditableTitleProps {
  content: string;
  onChange: (newContent: string) => void;
  disabled?: boolean;
}

export default function EditableTitle({ content, onChange, disabled = false }: EditableTitleProps) {
  return (
    <h1
      contentEditable={!disabled}
      onBlur={(e) => !disabled && onChange(e.target.innerText)}
      suppressContentEditableWarning={true}
      className={`outline-none text-3xl sm:text-4xl font-bold mb-6 transition-all duration-200 ${
        disabled 
          ? 'text-slate-900' 
          : 'text-slate-900 hover:bg-slate-50 focus:bg-blue-50 focus:ring-2 focus:ring-blue-200 rounded-lg px-3 py-2 -mx-3 -my-2'
      } ${content ? '' : 'text-slate-400'}`}
    >
      {content || (disabled ? '' : 'Haz clic para agregar un título')}
    </h1>
  );
}