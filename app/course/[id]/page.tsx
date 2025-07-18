"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  BookOpen, 
  ArrowLeft, 
  Clock, 
  TrendingUp,
  User,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

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

export default function CoursePage() {
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const courseId = params.id as string;
    
    // Cargar curso del localStorage
    const savedCourses = localStorage.getItem("courses");
    if (savedCourses) {
      const courses: Course[] = JSON.parse(savedCourses);
      const foundCourse = courses.find(c => c.id === courseId);
      
      if (foundCourse) {
        // Incrementar vistas
        foundCourse.views += 1;
        localStorage.setItem("courses", JSON.stringify(courses));
        setCourse(foundCourse);
      }
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <p className="text-slate-600">Cargando curso...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </div>
        </header>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Curso no encontrado</h1>
          <p className="text-slate-600 mb-6">
            El curso que buscas no existe o ha sido eliminado.
          </p>
          <Link href="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al inicio
              </Button>
            </Link>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">CourseHub</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header del curso */}
        <Card className="p-8 mb-8 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              {course.title}
            </h1>
            <p className="text-xl text-slate-600 mb-6">
              {course.description}
            </p>
          </div>

          {/* Metadatos del curso */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Autor</p>
                <p className="font-medium text-slate-900">{course.author}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Duración</p>
                <p className="font-medium text-slate-900">{course.estimatedTime} min</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Vistas</p>
                <p className="font-medium text-slate-900">{course.views}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Publicado</p>
                <p className="font-medium text-slate-900">{formatDate(course.createdAt)}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Contenido del curso */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
          <div className="space-y-8">
            {course.content.map((element, index) => (
              <div key={element.id}>
                {element.type === "h1" && (
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                    {element.content}
                  </h1>
                )}
                {element.type === "h2" && (
                  <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-4">
                    {element.content}
                  </h2>
                )}
                {element.type === "p" && (
                  <p className="text-base leading-relaxed text-slate-700 mb-4">
                    {element.content}
                  </p>
                )}
                {element.type === "code" && (
                  <div className="relative mb-6">
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
                      <pre className="bg-slate-900 text-slate-100 p-4 text-sm font-mono leading-relaxed overflow-x-auto">
                        {element.content}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Footer del curso */}
        <div className="mt-12 text-center">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              ¡Has terminado el curso! 🎉
            </h3>
            <p className="text-slate-600 mb-4">
              Esperamos que hayas disfrutado de "{course.title}". 
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Explorar más cursos
                </Button>
              </Link>
              <Link href="/editor">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Crear mi propio curso
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
} 