"use client";

import React from "react";

interface EditableCodeProps {
  content: string;
  onChange: (newContent: string) => void;
}

export default function EditableCode({ content, onChange }: EditableCodeProps) {
  return (
    <code
      contentEditable
      onBlur={(e) => onChange(e.target.innerText)}
      suppressContentEditableWarning={true}
      className="bg-gray-800 text-white p-4 rounded-md mb-4 min-h-14 outline-none text-sm block"
    >
      {content}
    </code>
  );
}