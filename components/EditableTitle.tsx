import React from "react";

interface EditableTitleProps {
  content: string;
  onChange: (newContent: string) => void;
}

export default function EditableTitle({ content, onChange }: EditableTitleProps) {
  return (
    <h1
      contentEditable
      onBlur={(e) => onChange(e.target.innerText)}
      suppressContentEditableWarning={true}
      className="outline-none text-3xl font-medium mb-4 border border-border"
    >
      {content}
    </h1>
  );
}