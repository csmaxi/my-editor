"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  X,
  Image,
  Video,
  Sparkles,
  CheckCircle,
  AlertCircle
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
import { toast } from "sonner";
import EditableTitle from "./EditableTitle";
import EditableSubTitle from "./EditableSubTitle";
import EditableParagraph from "./EditableParagraph";
import EditableCode from "./EditableCode";
import EditableImage from "./EditableImage";
import EditableVideo from "./EditableVideo";
import { AuthorSettingsDialog } from "./AuthorSettingsDialog";
import { EditorSidebar } from "./EditorSidebar";

type ContentElement = {
  type: "h1" | "h2" | "p" | "code" | "image" | "video";
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
  const addElement = (type: "h1" | "h2" | "p" | "code" | "image" | "video") => {
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
    newType: "h1" | "h2" | "p" | "code" | "image" | "video"
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
    setShowAuthorModal(true);
  };

  // Guardar nombre del autor
  const saveAuthorName = (name: string) => {
    setAuthorName(name);
    localStorage.setItem("authorName", name);
    toast.success("Autor configurado exitosamente", {
      description: `Tu nombre de autor se ha guardado como "${name}"`,
    });
  };

  // Guardar curso
  const saveCourse = () => {
    if (!courseName.trim()) {
      toast.error("Nombre requerido", {
        description: "Por favor, agrega un nombre al curso antes de guardarlo.",
      });
      return;
    }

    if (content.length === 0) {
      toast.error("Contenido requerido", {
        description: "Agrega al menos un elemento al curso antes de guardarlo.",
      });
      return;
    }

    if (!authorName.trim()) {
      toast.error("Autor requerido", {
        description: "Por favor, configura tu nombre de autor antes de publicar el curso.",
      });
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
      toast.success("¡Curso guardado exitosamente! 🎉", {
        description: "Tu curso ha sido publicado en la plataforma.",
      });
      // Redirigir a la página principal
      router.push("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
      {/* Modal de configuración de autor moderno */}
      <AuthorSettingsDialog
        open={showAuthorModal}
        onOpenChange={setShowAuthorModal}
        authorName={authorName}
        onSave={saveAuthorName}
      />

      {/* Header Profesional Moderno */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="hover:bg-slate-100 transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-sm opacity-75"></div>
                  <div className="relative w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-slate-900">Course Editor</h1>
                  <p className="text-xs text-slate-500">Editor profesional de cursos</p>
                </div>
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
                      className="flex items-center space-x-2"
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
          {/* Sidebar moderno con herramientas */}
          {!isPreviewMode && (
            <div className="lg:col-span-3">
              <EditorSidebar
                onAddElement={addElement}
                authorName={authorName}
                contentLength={content.length}
                wordCount={content.reduce((acc, el) => acc + el.content.split(' ').filter(w => w.length > 0).length, 0)}
                estimatedTime={calculateEstimatedTime()}
                onAuthorSettings={openAuthorModal}
                isMobile={false}
              />
            </div>
          )}

          {/* Área principal de contenido */}
          <div className={isPreviewMode ? "lg:col-span-12" : "lg:col-span-9"}>
            <Card className="p-8 bg-white/90 backdrop-blur-xl border-slate-200/50 shadow-xl">
              {/* Título del curso */}
              <div className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="text-3xl sm:text-4xl font-bold text-slate-900 w-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder-slate-400 transition-all duration-200"
                    placeholder="Nombre del curso"
                    disabled={isPreviewMode}
                  />
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full transform scale-x-0 transition-transform duration-300 focus-within:scale-x-100"></div>
                </div>
              </div>

              {/* Contenido del curso */}
              <div className="space-y-6">
                {content.length === 0 && !isPreviewMode && (
                  <div className="text-center py-16 text-slate-500">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                      <div className="relative bg-white/80 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 border border-slate-200">
                        <FileText className="h-8 w-8 text-slate-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">Comienza tu curso</h3>
                    <p className="text-slate-500 mb-4">Agrega contenido usando la barra lateral</p>
                  </div>
                )}

                {content.map((element, index) => (
                  <div 
                    key={element.id} 
                    className={`group transition-all duration-300 ${
                      isPreviewMode ? '' : 'hover:bg-slate-50/80 rounded-xl p-4 -m-4 hover:shadow-sm'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
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
                        {element.type === "image" && (
                          <EditableImage
                            content={element.content}
                            onChange={(newContent) => updateElement(element.id, newContent)}
                            disabled={isPreviewMode}
                          />
                        )}
                        {element.type === "video" && (
                          <EditableVideo
                            content={element.content}
                            onChange={(newContent) => updateElement(element.id, newContent)}
                            disabled={isPreviewMode}
                          />
                        )}
                      </div>

                      {/* Acciones del elemento */}
                      {!isPreviewMode && (
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    >
                                      <Type className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="w-48">
                                    <DropdownMenuItem
                                      onClick={() => changeElementType(element.id, "h1")}
                                      className="flex items-center gap-2"
                                    >
                                      <Heading1 className="h-4 w-4" />
                                      Título Principal
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => changeElementType(element.id, "h2")}
                                      className="flex items-center gap-2"
                                    >
                                      <Heading2 className="h-4 w-4" />
                                      Subtítulo
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => changeElementType(element.id, "p")}
                                      className="flex items-center gap-2"
                                    >
                                      <FileText className="h-4 w-4" />
                                      Párrafo
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => changeElementType(element.id, "code")}
                                      className="flex items-center gap-2"
                                    >
                                      <Code className="h-4 w-4" />
                                      Código
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => changeElementType(element.id, "image")}
                                      className="flex items-center gap-2"
                                    >
                                      <Image className="h-4 w-4" />
                                      Imagen
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => changeElementType(element.id, "video")}
                                      className="flex items-center gap-2"
                                    >
                                      <Video className="h-4 w-4" />
                                      Video
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Cambiar tipo de elemento</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    duplicateElement(element.id);
                                    toast.success("Elemento duplicado", {
                                      description: "El elemento se ha duplicado exitosamente.",
                                    });
                                  }}
                                  className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600 transition-colors"
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Duplicar elemento</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    deleteElement(element.id);
                                    toast.success("Elemento eliminado", {
                                      description: "El elemento se ha eliminado del curso.",
                                    });
                                  }}
                                  className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
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
          <EditorSidebar
            onAddElement={addElement}
            authorName={authorName}
            contentLength={content.length}
            wordCount={content.reduce((acc, el) => acc + el.content.split(' ').filter(w => w.length > 0).length, 0)}
            estimatedTime={calculateEstimatedTime()}
            onAuthorSettings={openAuthorModal}
            isMobile={true}
          />
        </div>
      )}
    </div>
  </div>
  );
}