"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Heading1,
  Heading2,
  FileText,
  Code,
  Image,
  Video,
  Plus,
  User,
  Clock,
  FileText as FileTextIcon,
  BarChart3,
  Settings,
} from "lucide-react";

interface EditorSidebarProps {
  onAddElement: (type: "h1" | "h2" | "p" | "code" | "image" | "video") => void;
  authorName: string;
  contentLength: number;
  wordCount: number;
  estimatedTime: number;
  onAuthorSettings: () => void;
  isMobile?: boolean;
}

export function EditorSidebar({
  onAddElement,
  authorName,
  contentLength,
  wordCount,
  estimatedTime,
  onAuthorSettings,
  isMobile = false,
}: EditorSidebarProps) {
  const elementTypes = [
    {
      type: "h1" as const,
      name: "Título Principal",
      icon: Heading1,
    },
    {
      type: "h2" as const,
      name: "Subtítulo",
      icon: Heading2,
    },
    {
      type: "p" as const,
      name: "Párrafo",
      icon: FileText,
    },
    {
      type: "code" as const,
      name: "Bloque de Código",
      icon: Code,
    },
    {
      type: "image" as const,
      name: "Imagen",
      icon: Image,
    },
    {
      type: "video" as const,
      name: "Video",
      icon: Video,
    },
  ];

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Sección de elementos */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Agregar Elementos
        </h2>
        <div className="space-y-3">
          {elementTypes.map((element) => (
            <Button
              key={element.type}
              onClick={() => onAddElement(element.type)}
              variant="outline"
              className="w-full justify-start hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 group"
            >
              <div className="flex-1 text-left">
                <div className="font-medium">{element.name}</div>
              </div>
              <element.icon className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Información del curso */}
      <div>
        <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Estadísticas del Curso
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-slate-600" />
              <span className="text-sm text-slate-700">Autor</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {authorName || (
                <button
                  onClick={onAuthorSettings}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Configurar
                </button>
              )}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2">
              <FileTextIcon className="h-4 w-4 text-slate-600" />
              <span className="text-sm text-slate-700">Elementos</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {contentLength}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-600" />
              <span className="text-sm text-slate-700">Palabras</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {wordCount}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-600" />
              <span className="text-sm text-slate-700">Tiempo aprox.</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {estimatedTime} min
            </Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* Acciones rápidas */}
      <div>
        <h3 className="text-sm font-medium text-slate-700 mb-3">Acciones Rápidas</h3>
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onAuthorSettings}
            className="w-full justify-start text-slate-600 hover:text-slate-900"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurar Autor
          </Button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="lg:hidden">
            <Plus className="h-4 w-4 mr-2" />
            Elementos
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Editor de Elementos</SheetTitle>
            <SheetDescription>
              Agrega contenido a tu curso usando los elementos disponibles.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Card className="p-6 sticky top-24 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
      <SidebarContent />
    </Card>
  );
} 