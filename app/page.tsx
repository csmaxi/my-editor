"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  BookOpen, 
  Users, 
  Star, 
  Clock, 
  Plus, 
  Search,
  TrendingUp,
  Zap,
  Heart,
  Globe
} from "lucide-react";
import Link from "next/link";

type Course = {
  id: string;
  title: string;
  description: string;
  content: any[];
  createdAt: string;
  author: string;
  estimatedTime: number;
  views: number;
};

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Cargar cursos del localStorage
    const savedCourses = localStorage.getItem("courses");
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    } else {
      // Si no hay cursos, agregar algunos de ejemplo
      const exampleCourses: Course[] = [
        {
          id: "javascript-intro-001",
          title: "Introducción a JavaScript",
          description: "Aprende los fundamentos de JavaScript desde cero. Variables, funciones, DOM y más.",
          content: [
            {
              id: "intro-title",
              type: "h1",
              content: "¿Qué es JavaScript?"
            },
            {
              id: "intro-para",
              type: "p",
              content: "JavaScript es un lenguaje de programación dinámico que se utiliza principalmente para crear páginas web interactivas. Es uno de los lenguajes más populares del mundo y es esencial para el desarrollo web moderno."
            },
            {
              id: "variables-title",
              type: "h2",
              content: "Variables y Tipos de Datos"
            },
            {
              id: "variables-code",
              type: "code",
              content: `// Declaración de variables
let nombre = "Juan";
const edad = 25;
var activo = true;

// Tipos de datos básicos
let numero = 42;
let texto = "Hola mundo";
let arreglo = [1, 2, 3, 4, 5];`
            }
          ],
          createdAt: new Date('2024-01-15').toISOString(),
          author: "María González",
          estimatedTime: 15,
          views: 234
        },
        {
          id: "react-basics-002",
          title: "React para Principiantes",
          description: "Descubre el poder de React. Componentes, props, estado y hooks explicados de forma simple.",
          content: [
            {
              id: "react-intro",
              type: "h1",
              content: "Introducción a React"
            },
            {
              id: "react-para",
              type: "p",
              content: "React es una biblioteca de JavaScript para construir interfaces de usuario. Desarrollada por Facebook, se ha convertido en una de las herramientas más populares para el desarrollo frontend."
            },
            {
              id: "component-title",
              type: "h2",
              content: "Tu Primer Componente"
            },
            {
              id: "component-code",
              type: "code",
              content: `function Saludo({ nombre }) {
  return <h1>¡Hola, {nombre}!</h1>;
}

function App() {
  return (
    <div>
      <Saludo nombre="Mundo" />
    </div>
  );
}`
            }
          ],
          createdAt: new Date('2024-01-20').toISOString(),
          author: "Carlos Ruiz",
          estimatedTime: 12,
          views: 189
        },
        {
          id: "css-flexbox-003",
          title: "CSS Flexbox Completo",
          description: "Domina Flexbox y crea layouts responsivos como un profesional. Ejemplos prácticos incluidos.",
          content: [
            {
              id: "flexbox-intro",
              type: "h1",
              content: "CSS Flexbox: La Guía Completa"
            },
            {
              id: "flexbox-para",
              type: "p",
              content: "Flexbox es un método de diseño CSS que facilita la creación de layouts flexibles y responsivos. Con flexbox puedes alinear, distribuir y organizar elementos de manera eficiente."
            },
            {
              id: "flex-container",
              type: "h2",
              content: "Contenedor Flex"
            },
            {
              id: "flex-code",
              type: "code",
              content: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.item {
  flex: 1;
  padding: 20px;
  margin: 10px;
}`
            }
          ],
          createdAt: new Date('2024-01-10').toISOString(),
          author: "Ana Martínez",
          estimatedTime: 8,
          views: 156
        }
      ];
      
      localStorage.setItem("courses", JSON.stringify(exampleCourses));
      setCourses(exampleCourses);
    }
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCourses = courses.length;
  const totalViews = courses.reduce((acc, course) => acc + course.views, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">CourseHub</h1>
            </div>
            
            <Link href="/editor">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Crear Curso
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6">
              Crea y Comparte
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Cursos Increíbles
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Plataforma gratuita para crear, publicar y descubrir cursos online. 
              Sin límites, sin restricciones, solo conocimiento compartido.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/editor">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3">
                  <Plus className="h-5 w-5 mr-2" />
                  Crear Mi Primer Curso
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-3">
                <BookOpen className="h-5 w-5 mr-2" />
                Explorar Cursos
              </Button>
            </div>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-2">{totalCourses}</h3>
            <p className="text-slate-600">Cursos Creados</p>
          </Card>
          
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-2">{totalViews}</h3>
            <p className="text-slate-600">Visualizaciones</p>
          </Card>
          
          <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-2">100%</h3>
            <p className="text-slate-600">Gratuito</p>
          </Card>
        </section>

        {/* Características */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            ¿Por qué elegir CourseHub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Súper Fácil</h3>
              <p className="text-slate-600">
                Editor intuitivo que te permite crear cursos profesionales en minutos, sin conocimientos técnicos.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Acceso Global</h3>
              <p className="text-slate-600">
                Tus cursos están disponibles para cualquier persona en el mundo, sin restricciones ni barreras.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Completamente Gratis</h3>
              <p className="text-slate-600">
                Sin costos ocultos, sin suscripciones, sin límites. Crea y comparte tanto como quieras.
              </p>
            </div>
          </div>
        </section>

        {/* Buscador y Lista de Cursos */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 md:mb-0">
              Cursos Disponibles
            </h2>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {courses.length === 0 ? "¡Sé el primero en crear un curso!" : "No se encontraron cursos"}
              </h3>
              <p className="text-slate-600 mb-6">
                {courses.length === 0 
                  ? "Aún no hay cursos publicados. Crea el primer curso y comparte tu conocimiento con el mundo."
                  : "Intenta con diferentes términos de búsqueda."
                }
              </p>
              {courses.length === 0 && (
                <Link href="/editor">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Primer Curso
                  </Button>
                </Link>
              )}
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-slate-500">
                      <Clock className="h-4 w-4" />
                      <span>{course.estimatedTime} min</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <span>Por {course.author}</span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>{course.views} vistas</span>
                    </div>
                  </div>
                  
                  <Link href={`/course/${course.id}`}>
                    <Button className="w-full">
                      Ver Curso
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">CourseHub</h3>
            </div>
            <p className="text-slate-400 mb-4">
              Democratizando la educación, un curso a la vez.
            </p>
            <p className="text-slate-500 text-sm">
              © 2024 CourseHub. Plataforma gratuita y de código abierto.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}