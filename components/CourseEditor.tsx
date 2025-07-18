"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Plus, 
  Trash2, 
  Type, 
  Copy, 
  Eye, 
  Save, 
  FileText, 
  Code, 
  Heading1, 
  Heading2,
  MoreVertical,
  Download,
  Settings,
  ArrowLeft,
  BookOpen,
  User,
  X
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EditableTitle from "./EditableTitle";
import EditableSubTitle from "./EditableSubTitle";
import EditableParagraph from "./EditableParagraph";
import EditableCode from "./EditableCode";

type ContentElement = {
  type: "h1" | "h2" | "p" | "code";
  content: string;
  id: string;
};

type Course = {
  id: string;
  title: string;
  description: string;
  content: ContentElement[];
  createdAt: string;
  author: string;
  estimatedTime: number;
  views: number;
};

export default function CourseEditor() {
  const router = useRouter();
  const [content, setContent] = useState<ContentElement[]>([]);
  const [courseName, setCourseName] = useState(""); 
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [tempAuthorName, setTempAuthorName] = useState("");

  useEffect(() => {
    // Cargar nombre del autor del localStorage
    const savedAuthor = localStorage.getItem("authorName");
    if (savedAuthor) {
      setAuthorName(savedAuthor);
    }
  }, []);

  // Generar ID único para elementos
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Agregar un nuevo elemento
  const addElement = (type: "h1" | "h2" | "p" | "code") => {
    setContent((prev) => [...prev, { type, content: "", id: generateId() }]);
  };

  // Actualizar el contenido de un elemento
  const updateElement = (id: string, newContent: string) => {
    setContent((prev) =>
      prev.map((el) => (el.id === id ? { ...el, content: newContent } : el))
    );
  };

  // Cambiar el tipo de un elemento
  const changeElementType = (
    id: string,
    newType: "h1" | "h2" | "p" | "code"
  ) => {
    setContent((prev) =>
      prev.map((el) => (el.id === id ? { ...el, type: newType } : el))
    );
  };

  // Eliminar un elemento
  const deleteElement = (id: string) => {
    setContent((prev) => prev.filter((el) => el.id !== id));
  };

  // Duplicar elemento
  const duplicateElement = (id: string) => {
    const element = content.find((el) => el.id === id);
    if (element) {
      setContent((prev) => [...prev, { ...element, id: generateId() }]);
    }
  };

  // Calcular tiempo estimado de lectura
  const calculateEstimatedTime = () => {
    const totalWords = content.reduce((acc, el) => {
      return acc + el.content.split(' ').filter(word => word.length > 0).length;
    }, 0);
    // Promedio de 200 palabras por minuto de lectura
    return Math.max(1, Math.ceil(totalWords / 200));
  };

  // Generar descripción automática
  const generateDescription = () => {
    const firstParagraph = content.find(el => el.type === "p" && el.content.trim());
    if (firstParagraph) {
      return firstParagraph.content.length > 150 
        ? firstParagraph.content.substring(0, 150) + "..."
        : firstParagraph.content;
    }
    return "Un curso increíble creado con CourseHub";
  };

  // Abrir modal de configuración de autor
  const openAuthorModal = () => {
    setTempAuthorName(authorName);
    setShowAuthorModal(true);
  };

  // Guardar nombre del autor
  const saveAuthorName = () => {
    if (tempAuthorName.trim()) {
      setAuthorName(tempAuthorName.trim());
      localStorage.setItem("authorName", tempAuthorName.trim());
      setShowAuthorModal(false);
    }
  };

  // Guardar curso
  const saveCourse = () => {
    if (!courseName.trim()) {
      alert("Por favor, agrega un nombre al curso antes de guardarlo.");
      return;
    }

    if (content.length === 0) {
      alert("Agrega al menos un elemento al curso antes de guardarlo.");
      return;
    }

    if (!authorName.trim()) {
      alert("Por favor, configura tu nombre de autor antes de publicar el curso.");
      openAuthorModal();
      return;
    }

    setIsSaving(true);

    const newCourse: Course = {
      id: generateId(),
      title: courseName,
      description: generateDescription(),
      content: content,
      createdAt: new Date().toISOString(),
      author: authorName,
      estimatedTime: calculateEstimatedTime(),
      views: 0
    };

    // Guardar en localStorage
    const existingCourses = localStorage.getItem("courses");
    const courses = existingCourses ? JSON.parse(existingCourses) : [];
    courses.push(newCourse);
    localStorage.setItem("courses", JSON.stringify(courses));

    setTimeout(() => {
      setIsSaving(false);
      alert("¡Curso guardado exitosamente! 🎉");
      // Redirigir a la página principal
      router.push("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Modal de configuración de autor */}
      {showAuthorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">Configurar Autor</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAuthorModal(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tu nombre completo
                </label>
                <input
                  type="text"
                  value={tempAuthorName}
                  onChange={(e) => setTempAuthorName(e.target.value)}
                  placeholder="Ej: María González"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && saveAuthorName()}
                />
              </div>
              
              <p className="text-sm text-slate-500">
                Este nombre aparecerá como autor en todos los cursos que publiques.
              </p>
              
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => setShowAuthorModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={saveAuthorName}
                  disabled={!tempAuthorName.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Guardar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Header Profesional */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-semibold text-slate-900">Course Editor</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Indicador de autor */}
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-slate-100 rounded-lg">
                <User className="h-4 w-4 text-slate-600" />
                <span className="text-sm text-slate-700">
                  {authorName || "Sin configurar"}
                </span>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isPreviewMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsPreviewMode(!isPreviewMode)}
                      className="flex items-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:block">
                        {isPreviewMode ? "Editar" : "Vista Previa"}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isPreviewMode ? "Modo de edición" : "Modo de vista previa"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={saveCourse}
                      disabled={isSaving}
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Save className="h-4 w-4" />
                      <span className="hidden sm:block">
                        {isSaving ? "Guardando..." : "Publicar Curso"}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Publicar curso en la plataforma</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={openAuthorModal}>
                    <User className="h-4 w-4 mr-2" />
                    Configurar Autor
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Configuración
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar con herramientas */}
          {!isPreviewMode && (
            <div className="lg:col-span-3">
              <Card className="p-6 sticky top-24 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Elementos</h2>
                <div className="space-y-3">
                  <Button
                    onClick={() => addElement("h1")}
                    variant="outline"
                    className="w-full justify-start hover:bg-blue-50 hover:border-blue-200"
                  >
                    <Heading1 className="h-4 w-4 mr-2" />
                    Título Principal
                  </Button>
                  <Button
                    onClick={() => addElement("h2")}
                    variant="outline"
                    className="w-full justify-start hover:bg-blue-50 hover:border-blue-200"
                  >
                    <Heading2 className="h-4 w-4 mr-2" />
                    Subtítulo
                  </Button>
                  <Button
                    onClick={() => addElement("p")}
                    variant="outline"
                    className="w-full justify-start hover:bg-blue-50 hover:border-blue-200"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Párrafo
                  </Button>
                  <Button
                    onClick={() => addElement("code")}
                    variant="outline"
                    className="w-full justify-start hover:bg-blue-50 hover:border-blue-200"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Bloque de Código
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Información del curso</h3>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex justify-between">
                      <span>Autor:</span>
                      <span className="font-medium text-right">
                        {authorName || (
                          <button 
                            onClick={openAuthorModal}
                            className="text-blue-600 hover:text-blue-700 underline"
                          >
                            Configurar
                          </button>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Elementos:</span>
                      <span className="font-medium">{content.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Palabras:</span>
                      <span className="font-medium">
                        {content.reduce((acc, el) => acc + el.content.split(' ').filter(w => w.length > 0).length, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tiempo aprox:</span>
                      <span className="font-medium">{calculateEstimatedTime()} min</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Área principal de contenido */}
          <div className={isPreviewMode ? "lg:col-span-12" : "lg:col-span-9"}>
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              {/* Título del curso */}
              <div className="mb-8">
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="text-3xl sm:text-4xl font-bold text-slate-900 w-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder-slate-400"
                  placeholder="Nombre del curso"
                  disabled={isPreviewMode}
                />
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mt-2"></div>
              </div>

              {/* Contenido del curso */}
              <div className="space-y-6">
                {content.length === 0 && !isPreviewMode && (
                  <div className="text-center py-12 text-slate-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                    <p className="text-lg">Comienza creando tu primer elemento</p>
                    <p className="text-sm">Usa la barra lateral para agregar títulos, párrafos o código</p>
                  </div>
                )}

                {content.map((element) => (
                  <div 
                    key={element.id} 
                    className={`group transition-all duration-200 ${
                      isPreviewMode ? '' : 'hover:bg-slate-50 rounded-lg p-4 -m-4'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Contenido del elemento */}
                      <div className="flex-1">
                        {element.type === "h1" && (
                          <EditableTitle
                            content={element.content}
                            onChange={(newContent) => updateElement(element.id, newContent)}
                            disabled={isPreviewMode}
                          />
                        )}
                        {element.type === "h2" && (
                          <EditableSubTitle
                            content={element.content}
                            onChange={(newContent) => updateElement(element.id, newContent)}
                            disabled={isPreviewMode}
                          />
                        )}
                        {element.type === "p" && (
                          <EditableParagraph
                            content={element.content}
                            onChange={(newContent) => updateElement(element.id, newContent)}
                            disabled={isPreviewMode}
                          />
                        )}
                        {element.type === "code" && (
                          <EditableCode
                            content={element.content}
                            onChange={(newContent) => updateElement(element.id, newContent)}
                            disabled={isPreviewMode}
                          />
                        )}
                      </div>

                      {/* Acciones del elemento */}
                      {!isPreviewMode && (
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <Type className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuItem
                                      onClick={() => changeElementType(element.id, "h1")}
                                    >
                                      <Heading1 className="h-4 w-4 mr-2" />
                                      Título Principal
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => changeElementType(element.id, "h2")}
                                    >
                                      <Heading2 className="h-4 w-4 mr-2" />
                                      Subtítulo
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => changeElementType(element.id, "p")}
                                    >
                                      <FileText className="h-4 w-4 mr-2" />
                                      Párrafo
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => changeElementType(element.id, "code")}
                                    >
                                      <Code className="h-4 w-4 mr-2" />
                                      Código
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Cambiar tipo</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => duplicateElement(element.id)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Duplicar</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteElement(element.id)}
                                  className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Eliminar</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Botón flotante para agregar elementos (solo en móvil) */}
      {!isPreviewMode && (
        <div className="fixed bottom-6 right-6 lg:hidden">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="rounded-full w-14 h-14 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Plus className="h-6 w-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => addElement("h1")}>
                      <Heading1 className="h-4 w-4 mr-2" />
                      Título
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addElement("h2")}>
                      <Heading2 className="h-4 w-4 mr-2" />
                      Subtítulo
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addElement("p")}>
                      <FileText className="h-4 w-4 mr-2" />
                      Párrafo
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addElement("code")}>
                      <Code className="h-4 w-4 mr-2" />
                      Código
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Agregar elemento</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}