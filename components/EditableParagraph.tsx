import React from "react";

interface EditableParagraphProps {
  content: string;
  onChange: (newContent: string) => void;
  disabled?: boolean;
}

export default function EditableParagraph({
  content,
  onChange,
  disabled = false,
}: EditableParagraphProps) {
  return (
    <p
      contentEditable={!disabled}
      onBlur={(e) => !disabled && onChange(e.target.innerText)}
      suppressContentEditableWarning={true}
      className={`outline-none text-base leading-relaxed mb-4 transition-all duration-200 ${
        disabled 
          ? 'text-slate-700' 
          : 'text-slate-700 hover:bg-slate-50 focus:bg-blue-50 focus:ring-2 focus:ring-blue-200 rounded-lg px-3 py-2 -mx-3 -my-2'
      } ${content ? '' : 'text-slate-400'}`}
    >
      {content || (disabled ? '' : 'Haz clic para escribir un párrafo')}
    </p>
  );
}