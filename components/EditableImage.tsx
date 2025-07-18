import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Image, 
  Upload, 
  Link as LinkIcon, 
  X, 
  Edit3,
  Download,
  ExternalLink
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditableImageProps {
  content: string;
  onChange: (newContent: string) => void;
  disabled?: boolean;
}

export default function EditableImage({
  content,
  onChange,
  disabled = false,
}: EditableImageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(content);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageUrl(result);
        onChange(result);
        setIsLoading(false);
        setIsEditing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    if (imageUrl.trim()) {
      onChange(imageUrl);
      setIsEditing(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    onChange("");
    setIsEditing(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  if (isEditing && !disabled) {
    return (
      <Card className="p-6 border-2 border-dashed border-blue-300 bg-blue-50/50">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Insertar Imagen</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Subir desde PC */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Upload className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-slate-700">Desde tu PC</span>
              </div>
              <Button
                onClick={openFileDialog}
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Procesando..." : "Seleccionar archivo"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <p className="text-xs text-slate-500">
                Formatos: JPG, PNG, GIF, WebP (máx. 5MB)
              </p>
            </div>

            {/* Insertar desde URL */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <LinkIcon className="h-5 w-5 text-green-600" />
                <span className="font-medium text-slate-700">Desde URL</span>
              </div>
              <div className="space-y-2">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button
                  onClick={handleUrlSubmit}
                  disabled={!imageUrl.trim()}
                  className="w-full"
                >
                  Insertar
                </Button>
              </div>
            </div>
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Descripción (opcional)
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Describe la imagen..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>
    );
  }

  if (!content) {
    return (
      <div className="text-center py-8 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 transition-colors">
        <Image className="h-12 w-12 mx-auto mb-4 text-slate-400" />
        <p className="text-slate-500 mb-4">No hay imagen seleccionada</p>
        {!disabled && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span>Agregar Imagen</span>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="relative">
        <img
          src={content}
          alt={caption || "Imagen del curso"}
          className="w-full h-auto rounded-lg shadow-md"
          onError={(e) => {
            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
          }}
        />
        
        {!disabled && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Editar imagen</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => window.open(content, '_blank')}
                      className="bg-white/90 hover:bg-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Abrir en nueva pestaña</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleRemoveImage}
                      className="bg-white/90 hover:bg-white text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Eliminar imagen</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
      </div>
      
      {caption && (
        <p className="text-sm text-slate-600 mt-2 text-center italic">
          {caption}
        </p>
      )}
    </div>
  );
} 