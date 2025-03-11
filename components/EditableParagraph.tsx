import React from "react";

interface EditableParagraphProps {
  content: string;
  onChange: (newContent: string) => void;
}

export default function EditableParagraph({
  content,
  onChange,
}: EditableParagraphProps) {
  return (
    <p
      contentEditable
      onBlur={(e) => onChange(e.target.innerText)}
      suppressContentEditableWarning={true}
      className="outline-none text-gray-700 mb-4 border border-border"
    >
      {content}
    </p>
  );
}