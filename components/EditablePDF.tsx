"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Download, Eye, Trash2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface EditablePDFProps {
  content: string;
  onChange: (content: string) => void;
  disabled?: boolean;
}

export default function EditablePDF({ content, onChange, disabled = false }: EditablePDFProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState(content || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar que sea un PDF
    if (file.type !== "application/pdf") {
      toast.error("Archivo no válido", {
        description: "Por favor, selecciona un archivo PDF.",
      });
      return;
    }

    // Validar tamaño (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Archivo demasiado grande", {
        description: "El archivo debe ser menor a 10MB.",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Simular subida de archivo (en una app real, aquí subirías a un servidor)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const fileUrl = URL.createObjectURL(file);
      setFileName(file.name);
      onChange(fileUrl);
      
      toast.success("PDF subido exitosamente", {
        description: `El archivo "${file.name}" se ha agregado al curso.`,
      });
    } catch (error) {
      toast.error("Error al subir el archivo", {
        description: "Hubo un problema al procesar el PDF.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFileName("");
    onChange("");
    toast.success("PDF eliminado", {
      description: "El archivo se ha eliminado del curso.",
    });
  };

  const handleDownload = () => {
    if (content) {
      const link = document.createElement("a");
      link.href = content;
      link.download = fileName || "documento.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePreview = () => {
    if (content) {
      window.open(content, "_blank");
    }
  };

  if (disabled) {
    return (
      <div className="space-y-4">
        {content ? (
          <Card className="p-4 bg-slate-50 border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-900">{fileName || "Documento PDF"}</h4>
                <p className="text-sm text-slate-500">Documento PDF</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreview}
                  className="h-8 px-3"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="h-8 px-3"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Descargar
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-slate-300" />
            <p>No hay PDF cargado</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {content ? (
        <Card className="p-4 bg-slate-50 border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-slate-900">{fileName || "Documento PDF"}</h4>
              <p className="text-sm text-slate-500">Documento PDF</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreview}
                className="h-8 px-3"
              >
                <Eye className="h-4 w-4 mr-1" />
                Ver
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="h-8 px-3"
              >
                <Download className="h-4 w-4 mr-1" />
                Descargar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemoveFile}
                className="h-8 px-3 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Eliminar
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-6 border-2 border-dashed border-slate-300 hover:border-slate-400 transition-colors">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">Agregar Documento PDF</h3>
            <p className="text-slate-500 mb-4">
              Sube un archivo PDF para que los estudiantes puedan descargarlo
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-4">
              <AlertCircle className="h-4 w-4" />
              <span>Máximo 10MB</span>
            </div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? "Subiendo..." : "Seleccionar PDF"}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </Card>
      )}
    </div>
  );
} 