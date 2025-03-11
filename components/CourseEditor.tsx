"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Type, Copy } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EditableTitle from "./EditableTitle";
import EditableSubTitle from "./EditableSubTitle";
import EditableParagraph from "./EditableParagraph";
import EditableCode from "./EditableCode";

type ContentElement = {
  type: "h1" | "h2" | "p" | "code";
  content: string;
};

export default function CourseEditor() {
  const [content, setContent] = useState<ContentElement[]>([]);
  const [courseName, setCourseName] = useState(""); // Estado para el nombre del curso

  // Agregar un nuevo elemento
  const addElement = (type: "h1" | "h2" | "p" | "code") => {
    setContent((prev) => [...prev, { type, content: "" }]);
  };

  // Actualizar el contenido de un elemento
  const updateElement = (index: number, newContent: string) => {
    setContent((prev) =>
      prev.map((el, i) => (i === index ? { ...el, content: newContent } : el))
    );
  };

  // Cambiar el tipo de un elemento
  const changeElementType = (
    index: number,
    newType: "h1" | "h2" | "p" | "code"
  ) => {
    setContent((prev) =>
      prev.map((el, i) => (i === index ? { ...el, type: newType } : el))
    );
  };

  // Eliminar un elemento
  const deleteElement = (index: number) => {
    setContent((prev) => prev.filter((_, i) => i !== index));
  };

  // Duplicar el último elemento
  const duplicateLastElement = () => {
    if (content.length > 0) {
      const lastElement = content[content.length - 1];
      setContent((prev) => [...prev, { ...lastElement }]);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      {/* Input para el nombre del curso */}
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        className="text-2xl sm:text-4xl underline font-bold mb-8 text-center w-full bg-transparent border-none focus:outline-none focus:ring-0"
        placeholder="Nombre del curso"
      />

      {/* Botón flotante para agregar elementos */}
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 flex items-center justify-center shadow-lg">
                      <Plus className="h-4 w-4 sm:h-6 sm:w-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => addElement("h1")}>
                      Título
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addElement("h2")}>
                      Subtítulo
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addElement("p")}>
                      Párrafo
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addElement("code")}>
                      Código
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Agregar nuevo elemento</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Botón flotante para duplicar el último elemento */}
      <div className="fixed bottom-16 right-4 sm:bottom-24 sm:right-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0 flex items-center justify-center shadow-lg"
                onClick={duplicateLastElement}
              >
                <Copy className="h-4 w-4 sm:h-6 sm:w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Duplicar último elemento</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Renderizar el contenido */}
      <div className="space-y-4 mt-8">
        {content.map((element, index) => (
          <div key={index} className="group">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {/* Contenido del elemento */}
              <div className="flex-1 w-full max-w-[90%] sm:max-w-none">
                {element.type === "h1" && (
                  <EditableTitle
                    content={element.content}
                    onChange={(newContent) => updateElement(index, newContent)}
                  />
                )}
                {element.type === "h2" && (
                  <EditableSubTitle
                    content={element.content}
                    onChange={(newContent) => updateElement(index, newContent)}
                  />
                )}
                {element.type === "p" && (
                  <EditableParagraph
                    content={element.content}
                    onChange={(newContent) => updateElement(index, newContent)}
                  />
                )}
                {element.type === "code" && (
                  <EditableCode
                    content={element.content}
                    onChange={(newContent) => updateElement(index, newContent)}
                  />
                )}
              </div>

              {/* Acciones: Cambiar tipo y eliminar */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 w-full sm:w-auto">
                {/* Cambiar tipo */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-2">
                              <Type className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => changeElementType(index, "h1")}
                            >
                              Título
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => changeElementType(index, "h2")}
                            >
                              Subtítulo
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => changeElementType(index, "p")}
                            >
                              Párrafo
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => changeElementType(index, "code")}
                            >
                              Código
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cambiar tipo de elemento</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Eliminar */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteElement(index)}
                        className="text-red-500 hover:bg-red-50 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Eliminar elemento</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}