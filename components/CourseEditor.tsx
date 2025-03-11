"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Type } from "lucide-react";
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
  const changeElementType = (index: number, newType: "h1" | "h2" | "p" | "code") => {
    setContent((prev) =>
      prev.map((el, i) => (i === index ? { ...el, type: newType } : el))
    );
  };

  // Eliminar un elemento
  const deleteElement = (index: number) => {
    setContent((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Editor de Cursos</h1>

      {/* Botón flotante para agregar elementos */}
      <div className="fixed bottom-8 right-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full w-12 h-12 p-0 flex items-center justify-center shadow-lg">
              <Plus className="h-6 w-6" />
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

      {/* Renderizar el contenido */}
      <div className="space-y-4">
        {content.map((element, index) => (
          <div key={index} className="group">
            <div className="flex items-start gap-4">
              {/* Contenido del elemento */}
              <div className="flex-1">
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
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Cambiar tipo */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Type className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => changeElementType(index, "h1")}>
                      Título
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeElementType(index, "h2")}>
                      Subtítulo
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeElementType(index, "p")}>
                      Párrafo
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeElementType(index, "code")}>
                      Código
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

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