import React from "react";

interface EditableSubTitleProps {
  content: string;
  onChange: (newContent: string) => void;
}

export default function EditableSubTitle({
  content,
  onChange,
}: EditableSubTitleProps) {
  return (
    <h2
      contentEditable
      onBlur={(e) => onChange(e.target.innerText)}
      suppressContentEditableWarning={true}
      className="outline-none text-xl font-medium mb-4 text-gray-800 border border-border"
    >
      {content}
    </h2>
  );
}