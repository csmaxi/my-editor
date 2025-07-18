import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Video, 
  Upload, 
  Link as LinkIcon, 
  X, 
  Edit3,
  Play,
  ExternalLink,
  Youtube,
  FileVideo
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditableVideoProps {
  content: string;
  onChange: (newContent: string) => void;
  disabled?: boolean;
}

export default function EditableVideo({
  content,
  onChange,
  disabled = false,
}: EditableVideoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(content);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setVideoUrl(result);
        onChange(result);
        setIsLoading(false);
        setIsEditing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    if (videoUrl.trim()) {
      onChange(videoUrl);
      setIsEditing(false);
    }
  };

  const handleRemoveVideo = () => {
    setVideoUrl("");
    onChange("");
    setIsEditing(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // Función para detectar si es un video de YouTube
  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Función para convertir URL de YouTube a embed
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  if (isEditing && !disabled) {
    return (
      <Card className="p-6 border-2 border-dashed border-purple-300 bg-purple-50/50">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Insertar Video</h3>
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
                <Upload className="h-5 w-5 text-purple-600" />
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
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
              <p className="text-xs text-slate-500">
                Formatos: MP4, WebM, OGV (máx. 50MB)
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
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://ejemplo.com/video.mp4 o YouTube"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Button
                  onClick={handleUrlSubmit}
                  disabled={!videoUrl.trim()}
                  className="w-full"
                >
                  Insertar
                </Button>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <Youtube className="h-4 w-4" />
                <span>Soporta YouTube, Vimeo y otros</span>
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
              placeholder="Describe el video..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>
    );
  }

  if (!content) {
    return (
      <div className="text-center py-8 border-2 border-dashed border-slate-300 rounded-lg hover:border-purple-400 transition-colors">
        <Video className="h-12 w-12 mx-auto mb-4 text-slate-400" />
        <p className="text-slate-500 mb-4">No hay video seleccionado</p>
        {!disabled && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span>Agregar Video</span>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="relative">
        {isYouTubeUrl(content) ? (
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={getYouTubeEmbedUrl(content)}
              title={caption || "Video de YouTube"}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : content.startsWith('data:') ? (
          <video
            src={content}
            controls
            className="w-full h-auto rounded-lg shadow-md"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3EVideo%3C/text%3E%3C/svg%3E"
          >
            Tu navegador no soporta el elemento video.
          </video>
        ) : (
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={content}
              title={caption || "Video"}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )}
        
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
                    <p>Editar video</p>
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
                      onClick={handleRemoveVideo}
                      className="bg-white/90 hover:bg-white text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Eliminar video</p>
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