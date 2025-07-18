"use client";

import React from "react";

interface EditableCodeProps {
  content: string;
  onChange: (newContent: string) => void;
  disabled?: boolean;
}

export default function EditableCode({ content, onChange, disabled = false }: EditableCodeProps) {
  return (
    <div className="relative mb-4">
      <div className="bg-slate-900 rounded-lg overflow-hidden shadow-lg">
        {/* Header del bloque de código */}
        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-slate-400 text-sm ml-3 font-mono">código</span>
          </div>
        </div>
        
        {/* Contenido del código */}
        <pre
          contentEditable={!disabled}
          onBlur={(e) => !disabled && onChange(e.target.innerText)}
          suppressContentEditableWarning={true}
          className={`bg-slate-900 text-slate-100 p-4 min-h-[100px] outline-none text-sm font-mono leading-relaxed transition-all duration-200 ${
            disabled 
              ? '' 
              : 'hover:bg-slate-800 focus:bg-slate-800 focus:ring-2 focus:ring-blue-400'
          } ${content ? '' : 'text-slate-500'}`}
        >
          {content || (disabled ? '' : '// Escribe tu código aquí')}
        </pre>
      </div>
    </div>
  );
}